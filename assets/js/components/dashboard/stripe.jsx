import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const Stripe = ({ onToken }) => {
    return (
        <div className="center">
            <p className="bold mb2">Pay $5 and activate your account for life</p>
            <StripeCheckout
                token={onToken}
                stripeKey={config.STRIPE_TOKEN}
                amount={500}
                currency="USD"
                name="Disconnect Today"
                description="Twitter digest emails without the distraction"
            >
            <button className="button">Activate account</button>
            </StripeCheckout>
        </div>
    )
}

export default Stripe
