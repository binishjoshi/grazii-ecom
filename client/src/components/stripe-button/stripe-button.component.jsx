import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_kXvet59wJyT1RTkvddLSjStX00QYXdIBJ3';

    const onToken = token => {
        console.log(token);
        alert('Payment Succesful');
    };

    return (
        <StripeCheckout
            label='Pay Now'
            name='Grazii'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;