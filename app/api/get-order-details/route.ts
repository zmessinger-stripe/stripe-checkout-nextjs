
import { NextRequest } from 'next/server';
// Init stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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