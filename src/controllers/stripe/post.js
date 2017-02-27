import moment from 'moment'
import services from './../../services/'
const { Stripe, Users } = services
import mail from './../../etc/mail'

const post = async ({ type, data }) => {
    if(type == 'invoice.payment_succeeded'){
        const stripe = new Stripe()
        const users = new Users()
        const { object } = data
        const { customer, lines, total, date } = object
        const lineData = lines.data[0]
        const { period } = lineData
        const period_end = period.end
        const extended = await stripe.extendSubscription(period_end, customer)
        const ekkoCustomer = await stripe.getByCustomerId(customer)
        const user = await users.getById(ekkoCustomer.UserId)
        mail.send({
            to: user.email,
            type: 'stripeInvoice',
            data: {
                total: total / 100,
                date: moment.unix(date).format('Do MMM Y'),
                plan: ekkoCustomer.plan
            }
        })
    }
    return { }
}

export default post
