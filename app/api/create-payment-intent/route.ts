import { NextRequest } from 'next/server';
import { fetchCart } from "@/lib/helpers"
import { withErrorHandling } from '@/lib/utils/apiWrapper';
// Import and init Stripe with secret
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const POST = withErrorHandling(async (req: NextRequest) => {
    // Parse the JSON body from the request
    const { cart, cart_id } = await req.json();
    if (!cart || !Array.isArray(cart) || cart.length === 0) throw new Error("Invalid or Empty Cart")
    // Calculate order amount and retrieve currency
    const { totalAmount, currency, updatedCart } = await fetchCart(cart);
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: totalAmount,
        currency,
        automatic_payment_methods: { enabled: true }, // specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        metadata: {  cart: JSON.stringify(updatedCart) } // Store full cart in metadata for an itemized reference of what is getting purchased.
    }, { idempotencyKey: cart_id });

    // The 'idempotencyKey' parameteter aligns a paymentIntent with a given cartId. This make sure if that if the user
    // exits the cart & returns (e.g updates the cart), a new paymentIntent is not created.
    return new Response(JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        cart: updatedCart,
        amount: paymentIntent.amount,
      }));
})