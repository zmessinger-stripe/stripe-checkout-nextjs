"use client" // Marks as client component rather than server component

import { useEffect } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { loadStripe } from '@stripe/stripe-js';

// Load stripe outside the componenent to prevent reloads.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

// Static options for conditionally rendering the buttons
const options = [
  {
    title: "Hosted",
    description: "Explore a full, working code sample of an integration with Stripe Checkout where customers click a button on your site and get redirected to a payment page hosted by Stripe.",
    buttonText: "Select Hosted"
  },
  {
    title: "Embedded",
    description: "Explore a full, working code sample of an integration with Stripe Checkout that lets your customers pay through an embedded form on your website.",
    buttonText: "Select Embedded"
  },
  {
    title: "Custom",
    description: "Explore a a checkout form with Stripe’s Web or Mobile elements to accept payments.",
    buttonText: "Select Custom"
  }
]

export default function Home() {
  
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-4 sm:p-8 md:p-20 gap-8 font-[family-name:var(--font-geist-sans)]">
      <main className="row-start-2 flex flex-col items-center">
        {/* <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        /> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
          {options.map(function(option, idx) {
            return (
              <Card key={idx} className="flex flex-col h-full">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-center">{option.title} Checkout</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-gray-600">{option.description}</p>
              </CardContent>
              <CardFooter className="mt-auto">
                <form action="/api/checkout_sessions_hosted" method="POST" className="w-full">
                  <Button className="w-full bg-black hover:bg-gray-800 text-white" type="submit" role="link">
                    {option.buttonText}
                  </Button>
                </form>
              </CardFooter>
            </Card>
          )
          })}
        </div>
      </main>
      <footer className="row-start-3 text-center py-4">
        <p><span className="bold">Stripe Checkout</span> by Zac Messinger</p>
      </footer>
    </div>
  );
}
