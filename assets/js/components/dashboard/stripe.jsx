import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const Stripe = ({ onToken }) => {
    return (
        <div>
            <p>Pay $5 and activate your account for life</p>
            <StripeCheckout token={onToken} stripeKey={config.STRIPE_TOKEN}>
                <p>
            		<button>Activate account</button>
            	</p>
            </StripeCheckout>
        </div>
    )
}

export default Stripe
