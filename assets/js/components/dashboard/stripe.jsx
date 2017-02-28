import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const Stripe = ({ onToken }) => {
    return (
        <div className="center">
            <p className="bold mb2">Pay $5 and activate your account for life</p>
            <ul className="mb2 left-align max-width-1 mx-auto">
                <li><span>{`\u2014`}</span>No hidden fees</li>
                <li><span>{`\u2014`}</span>One-off payment</li>
                <li><span>{`\u2014`}</span>Lists are better in 3's</li>
            </ul>
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
