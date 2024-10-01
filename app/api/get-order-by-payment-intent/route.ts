
import { NextRequest } from 'next/server';
import { withErrorHandling } from '@/lib/utils/apiWrapper';
// Init stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const GET = withErrorHandling(async (req: NextRequest) => {
    // Retrieve session ID
    const { searchParams } = req.nextUrl;
    const payment_intent = searchParams.get('payment_intent');
    const response = await stripe.paymentIntents.retrieve(payment_intent, { expand: ['latest_charge']});
    // Define properties to return to client
    const body = JSON.stringify({
        status: response.status,
        orderId: "ORD-12345",
        name: response.latest_charge.billing_details.name,
        email: "session.customer_details.email",
        subTotal: response.amount,
        tax: 0,
        total: response.amount,
        lineItems: JSON.parse(response.metadata.cart),
        date: new Date().toLocaleDateString(),
    })
    
    console.log(body)

    // Return to client
    return new Response(body);
});