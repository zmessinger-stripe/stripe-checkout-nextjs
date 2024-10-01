"use client"

import { useState, useEffect } from 'react';
import { createCart} from "@/lib/helpers"
import { CartProps } from '@/app/types';
import Header from "./components/Header"
import CartCard from './components/CartCard';
import CheckoutCard from './components/CheckoutCard';
import { saveCartToSession,  loadCartFromSession } from '@/lib/security';
// Static options for conditionally rendering the buttons
const options = [
  {
    title: "Hosted",
    description: "Explore a full, working code sample of an integration with Stripe Checkout where customers click a button on your site and get redirected to a payment page hosted by Stripe.",
    buttonText: "Select Option",
	action: "/api/create-session-hosted",
    link: "https://docs.stripe.com/checkout/quickstart"
  },
  {
    title: "Embedded",
    description: "Explore a full, working code sample of an integration with Stripe Checkout that lets your customers pay through an embedded form on your website.",
    buttonText: "Select Option",
	action: "/checkout-embedded",
    link: "https://docs.stripe.com/checkout/embedded/quickstart"
  },
  {
    title: "Custom",
    description: "Explore a a checkout form with Stripe's Web or Mobile elements to accept payments. This option covers creating the payment intent upon render of the payment element.",
    buttonText: "Select Option",
	action: "/checkout-custom",
    link: "https://docs.stripe.com/payments/quickstart"
  },
  {
    title: "Deferred",
    description: "Explore a a checkout form with Stripe's Web or Mobile elements to accept payments. This option covers creating the payment intent submition payment element.",
    buttonText: "Select Option",
	action: "/checkout-custom/deferred",
    link: "https://docs.stripe.com/payments/accept-a-payment-deferred?platform=web&type=payment#web-fulfillment"
  },
]

export default function Home() {
	const [cart, setCart] = useState<CartProps>([])

	useEffect(() => {
		if (!sessionStorage.getItem('cart')) {
			// Set cartId and cart
			const cart = createCart();
			saveCartToSession(cart)
			setCart(cart)
		} else {
			let cart = loadCartFromSession()
			setCart(cart ?? [])
		}
	}, [])

	const refreshCart = () => { 
		const cart = createCart();
		saveCartToSession(cart)
		setCart(cart)
	}

	return (
		<div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-4 sm:p-8 md:px-20 gap-8 font-[family-name:var(--font-geist-sans)]">
			<main className="row-start-2 flex flex-col items-center">
				{/* Stripe Logo */}
				<Header />
				{/* Cart Display */}
				<CartCard cart={cart} refreshCart={refreshCart}/>
				{/* Checkout Cards */}
				<div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl">
					{options.map(function(option, idx) {
						return <CheckoutCard key={idx} option={option} idx={idx} cart={cart}/>
					})}
				</div>
			</main>
			<footer className="row-start-3 text-center py-4">
				<p><span className="bold">Stripe Checkout</span> by Zac Messinger</p>
			</footer>
		</div>
  	);
}
