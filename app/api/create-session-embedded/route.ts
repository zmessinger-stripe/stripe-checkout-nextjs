
import { NextRequest } from 'next/server';

// Init stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
    try {
        // Parse the JSON body from the request
        const body = await req.json();
        const { cart } = body;
        if (!cart || !Array.isArray(cart) || cart.length === 0) throw new Error("Invalid or Empty Cart")
            
        // Create Checkout Sessions
        const session = await stripe.checkout.sessions.create({
            ui_mode: 'embedded',
            line_items: cart,
            mode: 'payment',
            return_url: `${req.headers.get('origin')}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
            billing_address_collection: 'auto',
            automatic_tax: { enabled: true }, // Enables automatic tax calculations
          });

        // Return to Stripe client secret in order mount checkout component
        return new Response(JSON.stringify({ clientSecret: session.client_secret }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err: any) {
        // Set status code and header options
        return new Response(JSON.stringify({ error: err.message }), {
            status: err.statusCode || 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}