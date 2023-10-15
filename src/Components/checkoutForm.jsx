import React, { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import useFetchCredits from './useFetchCredits';

const backendUrl = "https://pure-stream-14786.herokuapp.com";

export default function CheckoutForm({ clientSecret, credits, amount,onSuccess }) {
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleError = (error) => {
        setMessage(error.message);
        setIsLoading(false);
    };

   const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
        return;
    }

    const paymentElement = elements.getElement(PaymentElement);

    if (!paymentElement) {
        return; // PaymentElement has not yet loaded.
    }

    setIsLoading(true);

       const { error, paymentIntent } = await stripe.confirmPayment({
           elements,
           confirmParams: {
     
               return_url: 'https://poesis.app',
               
    },redirect: 'if_required'
              
    });

    if (error) {
        setMessage(error.message);
        setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {

        setMessage("Vos crédits on été ajoutés!");
        onSuccess();
        setIsLoading(false);
    }
};


    return (
        <form onSubmit={handleSubmit} className="formPay">
            <PaymentElement clientSecret={clientSecret } />
            <button disabled={isLoading || !stripe || !elements} className="payButton">
                Acheter {credits} crédits pour {amount/100}€
            </button>
            {message && <div>{message}</div>}
        </form>
    );
}
