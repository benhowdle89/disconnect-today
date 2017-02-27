import services from './../../services/'
const { Stripe, Users, Domains, Heroku } = services
import { emails as demoEmails, freeStripePlanId } from './../../../config/demo.js'
import mail from './../../etc/mail'

const upgrade = async ({ stripe_token_id, plan_id = 'pro', user }) => {
    let token = stripe_token_id,
        planId = plan_id,
        { id, email } = user
    const stripeService = new Stripe()
    const users = new Users()

    planId = (demoEmails.indexOf(user.email) > -1) ? freeStripePlanId : planId

    // Stripe customer creation
    const customer = await stripeService.createCustomer(user, token, planId)

    // Set user to upgraded
    const updatedUser = await users.upgradeUser(id)

    Slack.newUserUpgrade({
        userId: id,
        plan: planId,
        email
    })

    mail.send({
        to: email,
        type: 'userUpgrade'
    })

    return {
        user: updatedUser
    }
}

const cardUpdate = async ({ stripe_token_id, card, user }) => {
    let token = stripe_token_id
    const stripeService = new Stripe()
    const users = new Users()
    const stripeCustomer = await stripeService.getByUserId(user.id)
    await stripeService.updateCustomerCard(stripeCustomer.customerId, token, card)
    const updatedUser = await users.getById(user.id)
    return {
        user: updatedUser
    }
}

export default {
    upgrade,
    cardUpdate
}
