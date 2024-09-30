"use client"

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./components/CheckoutForm";
import CompletePage from "./components/CompletePage";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { loadCartFromSession } from "@/lib/security";
import { UpdatedCartItem } from "@/app/types";
import { CartSection } from "./components/CartSection";
import { CartSectionSkeleton } from "./components/CartSectionSkeleton";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function CheckoutPage() {
    const [clientSecret, setClientSecret] = useState("");
    const [dpmCheckerLink, setDpmCheckerLink] = useState("");
    const [amount, setAmount] = useState(0)
    const [cart, setCart] = useState<UpdatedCartItem[]>([])
    const [confirmed, setConfirmed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setConfirmed(!!new URLSearchParams(window.location.search).get("payment_intent_client_secret"));
    }, []);

    useEffect(() => {
        async function fetchClientSecret(){
            try {
                setIsLoading(true);
                let cart = loadCartFromSession()
                const response = await axios.post("/api/create-payment-intent", { cart });
                setClientSecret(response.data.clientSecret)
                setDpmCheckerLink(response.data.dpmCheckerLink);
                setCart(response.data.cart)
                setAmount(response.data.amount)
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false)
            }
        }

        fetchClientSecret()
    }, []);

    const appearance = { theme: 'stripe' };
    const options = { clientSecret, appearance };

    return (
        <div className="flex min-h-screen">
            {/* Left side - Cart Summary */}
            {isLoading ? <CartSectionSkeleton /> : <CartSection cart={cart} amount={amount}/>}

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
                        {confirmed ? <CompletePage /> : <CheckoutForm dpmCheckerLink={dpmCheckerLink} />}
                    </Elements>
                    ) : (
                    <div className="text-center text-red-500">Failed to load checkout. Please try again.</div>
                    )}
                </CardContent>
                <Separator />
                <CardFooter className="flex justify-between mt-4">
                    <Button disabled={isLoading || !clientSecret}>Pay</Button>
                </CardFooter>
                </Card>
            </div>
        </div>
    );
}
