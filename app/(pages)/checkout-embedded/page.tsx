"use client"

import React, { useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import axios from 'axios'
import { loadCartFromSession } from '@/lib/security';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function Embedded() {
  	// Fetch client secret from Stripe in order to render the embedded form.
  	const fetchClientSecret = useCallback(async () => {
		try {
			let cart = loadCartFromSession()
			const response = await axios.post("/api/create-session-embedded", { cart });
			return response.data.clientSecret;
		} catch (error) {
			console.error("Error fetching client secret:", error);
			throw error;
		}
	}, []);

	const options = { fetchClientSecret };

	return (
		<div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
			<div className="w-full max-w-[1000px] bg-white rounded-lg shadow-lg overflow-hidden">
				<EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
					<EmbeddedCheckout className="w-full" />
				</EmbeddedCheckoutProvider>
			</div>
		</div>
	)
}