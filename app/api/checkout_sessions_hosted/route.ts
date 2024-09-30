import { NextRequest } from 'next/server';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
	try {
		// Parse the form data
		const formData = await request.formData();
		const cartJson = formData.get('cart');
		if (!cartJson || typeof cartJson !== 'string') throw new Error('Cart data is missing or invalid');
		// Parse the JSON string to get the cart array
		const cart = JSON.parse(cartJson);
		// Create Checkout Sessions
		const session = await stripe.checkout.sessions.create({
			line_items: cart,
			mode: 'payment',
			success_url: `${request.headers.get('origin')}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${request.headers.get('origin')}/?canceled=true`,
			automatic_tax: { enabled: true }, // Enables automatic tax calculations
			billing_address_collection: "required"
		});

		return Response.redirect(session.url, 303);
  	} catch (err: any) {
		return new Response(JSON.stringify({ error: err.message }), {
			status: err.statusCode || 500,
			headers: { 'Content-Type': 'application/json' },
		});
  	}
}