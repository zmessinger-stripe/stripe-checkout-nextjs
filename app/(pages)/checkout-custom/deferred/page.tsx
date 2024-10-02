"use client"

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { loadCartFromSession } from "@/lib/security";
import { UpdatedCartItemProps } from "@/app/types";
import { CartSection } from "../components/CartSection";
import { CartSectionSkeleton } from "../components/CartSectionSkeleton";
import { Appearance, StripeElementsOptions, Stripe, StripePaymentElementChangeEvent, StripeElements } from '@stripe/stripe-js';

// Import and init Stripe with secret
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function CheckoutPage() {
    const [currency, setCurrency] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [subTotal, setSubtotal] = useState<number>(0);
    const [updatedCart, setUpdatedCart] = useState<UpdatedCartItemProps[]>([]);
    const [confirmed, setConfirmed] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    // This state object is determining whether to use surcharges in a deferred paymentIntent scenario.
    const [isCreditCard, setIsCreditCard] = useState<boolean>(false);
    const [surcharageAmount, setSurchargeAmount] = useState<number>(0);

    useEffect(() => {
        async function generatePaymentElementOptions(){
            try {
                setIsLoading(true);
                let cart = loadCartFromSession();
                const response = await axios.post("/api/create-checkout-cart", { cart });
                // Update componenet state
                setCurrency(response.data.currency)
                setAmount(response.data.amount)
                setSubtotal(response.data.amount)
                setUpdatedCart(response.data.cart)
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false)
            }
        }

        generatePaymentElementOptions()
    }, []);

    const determineSurchargeFee = (amount: number): number => {
        // Determining how much to surcharge. For now, the value is hard-coded in at 10% of the amount.
        // Option #1 - Use a third party API (recommended), such as Interpayments (https://www.interpayments.com/) (reach out to Caitlin Checkett to help partner with them)
        // Option #2 - Use this matrix from FIS [0] and a surcharging Formula: https://docs.google.com/document/d/1zoQJYL7V4YekaDxa_ZXFyzSSQHbY6iFDYqUTIdk0Gy0/edit
        return Math.floor(amount * 0.1)
    }

    // Used to update surcharge amount
    useEffect(() => {
        let fee = isCreditCard ? determineSurchargeFee(amount) : 0;
        setSurchargeAmount(fee);
        setSubtotal(amount + fee)
       }, [isCreditCard, subTotal])

    // Determines if surcharge should be applied to payment amound depending on payment method selection
    const handlePaymentElementChange = async (event: StripePaymentElementChangeEvent, elements: StripeElements | null, stripe: Stripe | null) => {
        if (!stripe || !elements) console.error('Stripe.js has not loaded yet.');
        event.value.type == "card" ? setIsCreditCard(true) : setIsCreditCard(false);
        // TODO: Determine if card is credit or debit. Debit cards cannot incur a surcharge fee.
      }
     

    // Set configuration settings for Payment element
    const appearance: Appearance = { theme: 'stripe' };
    const options: StripeElementsOptions = { 
        mode: "payment", 
        currency, 
        amount, 
        appearance 
    };

    return (
        <div className="flex min-h-screen">
            {/* Left side - Cart Summary */}
            {isLoading ? <CartSectionSkeleton /> : <CartSection cart={updatedCart} amount={amount} surcharge={surcharageAmount} subtotal={subTotal}/>}

            {/* Right side - Checkout Form */}
            <div className="w-1/2 p-16">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Checkout</CardTitle>
                        <CardDescription>Complete your purchase</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div className="flex justify-center items-center h-40">
                                <Loader2 className="h-8 w-8 animate-spin" />
                            </div>
                        ) : 
                        (<Elements options={options} stripe={stripePromise}>
                            <CheckoutForm deferredIntent={true} handleChange={handlePaymentElementChange}/>
                        </Elements>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
