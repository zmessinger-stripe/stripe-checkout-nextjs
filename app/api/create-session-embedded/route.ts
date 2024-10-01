
import { NextRequest } from 'next/server';
import { withErrorHandling } from '@/lib/utils/apiWrapper';
// Init stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const POST = withErrorHandling(async(req: NextRequest) => {
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
})