const stripe = require('stripe')(process.env.STRIPE_API_KEY)
import moment from 'moment'

import { logger } from './../../etc/logger'
import ApiError from './../../etc/error'

class Stripe {
    async chargeUser(token, amount, userId, email) {
        let charge
        try {
            logger.info('Creating Stripe charge for user', userId, amount)
            charge = await stripe.charges.create({
                amount,
                currency: 'usd',
                source: token,
                description: `Charge for activating Disconnect Today. Your unique user ID: ${ userId }.`,
                metadata: {
                    userId
                },
                receipt_email: email
            })
        } catch (e) {
            throw new ApiError(502, e)
        }
        logger.info('Created Stripe charge on user', charge, userId, amount)
        return charge
    }
}

export default Stripe
