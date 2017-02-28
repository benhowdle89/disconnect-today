import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const Stripe = ({ onToken }) => {
    return (
        <div className="center">
            <p className="bold mb2">Pay $5 and activate your account for life</p>
            <StripeCheckout token={onToken} stripeKey={config.STRIPE_TOKEN}>
            <button className="button">Activate account</button>
            </StripeCheckout>
        </div>
    )
}

export default Stripe
