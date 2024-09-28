"use client"

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./components/CheckoutForm";
import CompletePage from "./components/CompletePage";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loader2, ChevronLeft } from "lucide-react";
import Link from "next/link";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState("");
  const [dpmCheckerLink, setDpmCheckerLink] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setConfirmed(!!new URLSearchParams(window.location.search).get("payment_intent_client_secret"));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        setDpmCheckerLink(data.dpmCheckerLink);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const appearance = { theme: 'stripe' };
  const options = { clientSecret, appearance };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Cart Summary */}
      <div className="w-1/2 bg-black p-8 text-white">
        <Link href="/" className="absolute top-4 left-4">
          <Button className="text-white">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
        <div className="mt-16 p-12">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            <div className="space-y-4">
            <div className="flex justify-between">
                <span>XL T-Shirt</span>
                <span>$20.00</span>
            </div>
            <Separator className="bg-gray-600" />
            <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>$20.00</span>
            </div>
            </div>
        </div>
      </div>

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
