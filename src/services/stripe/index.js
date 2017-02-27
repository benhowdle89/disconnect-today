const stripe = require('stripe')(process.env.STRIPE_API_KEY)
import moment from 'moment'

import { logger } from './../../etc/logger'
import ApiError from './../../etc/error'

class Stripe {
    constructor(db) {
        this.db = db || StripeCustomerId
    }
    async createCustomer({ id, email }, token, plan) {
        let customer
        try {
            logger.info('Creating Stripe customer on plan', email, plan)
            customer = await stripe.customers.create({
                source: token,
                plan,
                email
            })
        } catch (e) {
            throw new ApiError(502, e)
        }
        logger.info('Created Stripe customer', customer)
        let { subscriptions, sources } = customer
        let subscription = subscriptions.data && subscriptions.data.length ? subscriptions.data[0] : null
        let planId = subscription ? subscription.plan.id : null,
            subscriptionId = subscription.id,
            activeUntil = moment.utc(subscription.current_period_end, 'X').format('YYYY-MM-DD')
        let card = sources.data && sources.data.length ? sources.data[0] : null
        let last4 = card ? card.last4 : null
        let brand = card ? card.brand : null
        const existing = await this.getByUserId(id)
        if(existing){
            const updatedCustomer = await this.db.update({
                customerId: customer.id,
                plan: planId,
                subscriptionId,
                activeUntil,
                last4,
                brand
            }, {
                where: {
                    UserId: id
                }
            })
            return await this.getByUserId(id)
        }
        const customerId = await this.db.create({
            customerId: customer.id,
            UserId: id,
            plan: planId,
            subscriptionId,
            activeUntil,
            last4,
            brand
        })
        return customerId
    }
    async subscribeCustomerToPlan(customerId, plan) {
        let subscribedCustomer
        logger.info('Subscribing customer to plan', customerId, plan)
        try {
            subscribedCustomer = await stripe.subscriptions.create({
                customer: customerId,
                plan
            })
        } catch (e) {
            throw new ApiError(502, e)
        }
        logger.info('Subscribed customer to plan', subscribedCustomer)
        let subscriptionId = subscribedCustomer.id,
            activeUntil = moment.utc(subscribedCustomer.current_period_end, 'X').format('YYYY-MM-DD')
        const updatedCustomer = await this.db.update({
            customerId,
            plan,
            subscriptionId,
            activeUntil
        }, {
            where: {
                customerId
            }
        })
        return await this.getByCustomerId(customerId)
    }
    async extendSubscription(periodEnd, customerId) {
        let activeUntil = moment.utc(periodEnd, 'X').format('YYYY-MM-DD')
        const updatedCustomer = await this.db.update({
            activeUntil
        }, {
            where: {
                customerId
            }
        })
        logger.info('Extended customer subscription', updatedCustomer)
        return updatedCustomer
    }
    async updateCustomerCard(customerId, token, { last4, brand }) {
        let customer
        try {
            logger.info('Updating Stripe customer', customerId)
            customer = await stripe.customers.update(customerId, {
                source: token
            })
        } catch (e) {
            throw new ApiError(502, e)
        }
        logger.info('Updated Stripe customer', customerId)
        const updatedCustomer = await this.db.update({
            last4,
            brand
        }, {
            where: {
                customerId
            }
        })
    }
    async deleteCustomer(userId) {
        const customerId = await this.db.findOne({
            where: {
                UserId: userId
            }
        })
        if(!customerId) {
            return {}
        }
        const customer = customerId.get({
            plain: true
        })
        logger.info('Deleting customer from Stripe', userId)
        let deleted
        try {
            deleted = await stripe.customers.del(customer.customerId)
        } catch (e) {
            logger.error(e)
        }
        logger.info('Deleted customer from Stripe', userId, deleted)
        await customerId.destroy({
            force: true
        })
        return {}
    }
    async getByUserId(id) {
        const customerId = await this.db.findOne({
            where: {
                UserId: id
            }
        })
        return customerId ? customerId.get({
            plain: true
        }) : null
    }
    async getByCustomerId(customerId) {
        const customer = await this.db.findOne({
            where: {
                customerId
            }
        })
        return customer ? customer.get({
            plain: true
        }) : null
    }
    async addChargeToCustomer(customerId, domainCost) {
        let convertedDomainCost = await getConvertedDomainCost(domainCost)
        const amount = parseInt(convertedDomainCost.amount * 100, 10)
        let charge
        try {
            logger.info('Creating Stripe charge for customer', customerId, amount)
            charge = await stripe.charges.create({
                customer: customerId,
                amount,
                currency: 'gbp'
            })
        } catch (e) {
            throw new ApiError(502, e)
        }
        logger.info('Created Stripe charge on customer', charge, customerId, amount)
        return charge
    }
}

export default Stripe
