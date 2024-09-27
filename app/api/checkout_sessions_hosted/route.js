const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Static product
const product = { price: 'price_1Q3NdpBFIW304bYiRQbdephu', quantity: 1 };

export async function POST(request) {
  try {
    // Create Checkout Sessions
    const session = await stripe.checkout.sessions.create({
      line_items: [product],
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/?success=true`,
      cancel_url: `${request.headers.get('origin')}/?canceled=true`,
    });

    // Redirect to Stripe Checkout
    return Response.redirect(session.url, 303);
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: err.statusCode || 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}