import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const Stripe = ({ onToken }) => {
    return (
        <div className="center">
            <p className="bold mb2">Activate your account for life - $5</p>
            <StripeCheckout
                token={onToken}
                stripeKey={config.STRIPE_TOKEN}
                amount={500}
                currency="USD"
                name="Disconnect Today"
                description="Twitter digest emails without the distraction"
            >
            <button className="button primary px2 py1">Pay now</button>
            </StripeCheckout>
        </div>
    )
}

export default Stripe
