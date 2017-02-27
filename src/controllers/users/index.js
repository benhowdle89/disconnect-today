import get from './get'
import signUp from './sign-up'
import login from './login'
import stripe from './stripe'
import update from './update'
import cancel from './cancel'

export default {
    '/api/users/sign-up': signUp,
    '/api/users/login': login,
    '/api/users/upgrade': stripe.upgrade,
    '/api/users/cancel': cancel,
    '/api/users/twitter-connect': update.twitter
}
