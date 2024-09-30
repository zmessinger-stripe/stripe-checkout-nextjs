import { NextRequest } from 'next/server';
import { fetchCart } from "@/lib/helpers"

// Import and init Stripe with secret
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
    try {
        // Parse the JSON body from the request
        const { cart } = await req.json();
        if (!cart || !Array.isArray(cart) || cart.length === 0) throw new Error("Invalid or Empty Cart")
        // Calculate order amount and retrieve currency
        const { totalAmount, currency, updatedCart } = await fetchCart(cart);
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount,
            currency,
            automatic_payment_methods: { enabled: true }, // specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            metadata: { 
                cart: JSON.stringify(updatedCart) // Store cart in metadata
            } 
        });
        return new Response(JSON.stringify({
            clientSecret: paymentIntent.client_secret,
            cart: updatedCart,
            amount: paymentIntent.amount,
            // [DEV]: For demo purposes only, you should avoid exposing the PaymentIntent ID in the client-side code.
            dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
          }));
        
        } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: err.statusCode || 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}