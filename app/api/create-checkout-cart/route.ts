import { NextRequest } from 'next/server';
import { fetchCart } from "@/lib/helpers"

export async function POST(req: NextRequest) {
    try {
        // Parse the JSON body from the request
        const { cart } = await req.json();
        if (!cart || !Array.isArray(cart) || cart.length === 0) throw new Error("Invalid or Empty Cart")
        // Calculate order amount and retrieve currency
        const { totalAmount, currency, updatedCart } = await fetchCart(cart);
        // Return response
        return new Response(JSON.stringify({ amount: totalAmount, currency, cart: updatedCart }));
    } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: err.statusCode || 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}