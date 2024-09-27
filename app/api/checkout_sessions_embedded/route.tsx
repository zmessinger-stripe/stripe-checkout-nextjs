
import { NextRequest } from 'next/server';

// Init stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Dummy product
const product = { price: 'price_1Q3NdpBFIW304bYiRQbdephu', quantity: 1 };

export async function POST(req: NextRequest) {
    try {
        // Create Checkout Sessions
        const session = await stripe.checkout.sessions.create({
            ui_mode: 'embedded',
            line_items: [product],
            mode: 'payment',
            return_url: `${req.headers.get('origin')}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
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

export async function GET(req: NextRequest) {
    try {
        // Retrieve session ID
        const { searchParams } = req.nextUrl;
        const sessionId = searchParams.get('session_id');
        // Retrieve state of current session & return to client. Expand to include what was purchased
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);

        // Define properties to return to client
        const body = JSON.stringify({
            status: session.status,
            orderId: "ORD-12345",
            name: session.customer_details.name,
            email: session.customer_details.email,
            total: session.amount_subtotal,
            lineItems: lineItems.data,
            date: new Date().toLocaleDateString(),
        })
        // Return to client
        return new Response(body);
    } catch (err: any) {
        // Set status code and header options
        let options = { status: err.statusCode || 500, headers: { 'Content-Type': 'application/json' } }
        let body = JSON.stringify({ error: err.message })
        // return response
        return new Response(body, options);
    }
}