import services from './../../services/'
const { Stripe, Users, Domains, Heroku } = services
import { emails as demoEmails, amount } from './../../../config/demo.js'

const upgrade = async ({ stripe_token_id, user, email }) => {
    let token = stripe_token_id,
        { id } = user
    const stripeService = new Stripe()
    const users = new Users()

    const charge = await stripeService.chargeUser(
        token,
        amount,
        id,
        email
    )
    let updatedUser
    if(charge) {
        updatedUser = await users.activateAccount(id, charge.id)
    } else {
        updatedUser = user
    }
    return {
        user: updatedUser
    }
}

export default {
    upgrade
}
