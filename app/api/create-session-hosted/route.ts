import { NextRequest } from 'next/server';
import { withErrorHandling } from '@/lib/utils/apiWrapper';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const POST = withErrorHandling(async(request: NextRequest) => {
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
		billing_address_collection: 'auto',
		automatic_tax: { enabled: true }, // Enables automatic tax calculations
	});

	return Response.redirect(session.url, 303);
})