"use client"

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./components/CheckoutForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { loadCartFromSession } from "@/lib/security";
import { UpdatedCartItemProps } from "@/app/types";
import { CartSection } from "./components/CartSection";
import { CartSectionSkeleton } from "./components/CartSectionSkeleton";
import { Appearance, StripeElementsOptions } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function CheckoutPage() {
    const [clientSecret, setClientSecret] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [subTotal, setSubtotal] = useState<number>(0);
    const [cart, setCart] = useState<UpdatedCartItemProps[]>([])
    const [confirmed, setConfirmed] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setConfirmed(!!new URLSearchParams(window.location.search).get("payment_intent_client_secret"));
    }, []);

    useEffect(() => {
        async function fetchClientSecret(){
            try {
                setIsLoading(true);
                let cart = loadCartFromSession()
                let cart_id = sessionStorage.getItem('cart_id');
                const response = await axios.post("/api/create-payment-intent", { cart, cart_id });
                // Update componenet state
                setClientSecret(response.data.clientSecret)
                setCart(response.data.cart)
                setAmount(response.data.amount)
                setSubtotal(response.data.amount)
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false)
            }
        }

        fetchClientSecret()
    }, []);

    const appearance: Appearance = { theme: 'stripe' };
    const options: StripeElementsOptions = { clientSecret, appearance };

    return (
        <div className="flex min-h-screen">
            {/* Left side - Cart Summary */}
            {isLoading ? <CartSectionSkeleton /> : <CartSection cart={cart} amount={amount} subtotal={subTotal}/>}

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
                        ) : clientSecret ? (
                                <Elements options={options} stripe={stripePromise}>
                                     <CheckoutForm deferredIntent={false} />
                                </Elements>
                            ) : (
                                <div className="text-center text-red-500">Failed to load checkout. Please try again.</div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
