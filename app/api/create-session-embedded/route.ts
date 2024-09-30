
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
            subTotal: session.amount_subtotal,
            tax: session.total_details.amount_tax,
            total: session.amount_total,
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