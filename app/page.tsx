"use client"

import Image from "next/image";
import Link from "next/link";
import getButtonWrapper from "./components/getButtonWrapper";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";

// Static options for conditionally rendering the buttons
const options = [
  {
    title: "Hosted",
    description: "Explore a full, working code sample of an integration with Stripe Checkout where customers click a button on your site and get redirected to a payment page hosted by Stripe.",
    buttonText: "Select Hosted",
    link: "https://docs.stripe.com/checkout/quickstart"
  },
  {
    title: "Embedded",
    description: "Explore a full, working code sample of an integration with Stripe Checkout that lets your customers pay through an embedded form on your website.",
    buttonText: "Select Embedded",
    link: "https://docs.stripe.com/checkout/embedded/quickstart"
  },
  {
    title: "Custom",
    description: "Explore a a checkout form with Stripe's Web or Mobile elements to accept payments.",
    buttonText: "Select Custom",
    link: "https://docs.stripe.com/payments/quickstart"
  }
]

export default function Home() {

  return (
    <main className="row-start-2 flex flex-col items-center">
        <section className="mb-20">
          <Image
            className="dark:invert"
            src="/images/logos/stripe-logo.png"
            alt="Stripe Logo"
            width={180}
            height={38}
            priority
          />
        </section>

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
                <CardFooter className="mt-auto flex gap-2">
                <Link href={option.link} className="w-full"  target="_blank">
                    <Button className="w-full bg-purple-800 hover:bg-purple-600 text-white" type="button">
                      View Docs
                    </Button>
                  </Link>
                  {getButtonWrapper(option.title, 
                    <Button className="w-full bg-black hover:bg-gray-600 text-white" type="submit" role="link">
                      {option.buttonText}
                    </Button>
                  )}
                </CardFooter>
              </Card>
          )
          })}
        </div>
      </main>
  );
}
