"use client"

import { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { createCart } from "@/lib/helpers";
import { saveCartToSession } from "@/lib/security";
import { Loader2 } from "lucide-react";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    // Stripe.js hasn't yet loaded & disable form submission until Stripe.js has loaded.
    e.preventDefault();
    try {
        if (!stripe || !elements) return;
        // Enable loading state
        setIsLoading(true);
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: { return_url: "http://localhost:3000/checkout-custom" },
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        let message = error.type === "card_error" || error.type === "validation_error" ? error.message : "An unexpected error occurred.";
        setMessage(message)
        setIsLoading(false);
    } finally {
        const cart = createCart();
		saveCartToSession(cart)
    }
  };

  const paymentElementOptions = { layout: "tabs" };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="w-full">
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        {/* Show any error or success messages */}
        {message && <div id="payment-message" className="mt-4 text-sm text-red-600">{message}</div>}
        <Button disabled={isLoading} className="w-full mt-6 bg-black hover:bg-gray-800 text-white rounded text-lg">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Pay"}
        </Button>
    </form>
  );
}