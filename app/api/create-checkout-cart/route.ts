import { NextRequest } from 'next/server';
import { fetchCart } from "@/lib/helpers"
import { withErrorHandling } from '@/lib/utils/apiWrapper';

export const POST = withErrorHandling(async (req: NextRequest) => {
    // Parse the JSON body from the request
    const { cart } = await req.json();
    if (!cart || !Array.isArray(cart) || cart.length === 0) throw new Error("Invalid or Empty Cart")
    // Calculate order amount and retrieve currency
    const { totalAmount, currency, updatedCart } = await fetchCart(cart);
    // Return response
    return new Response(JSON.stringify({ amount: totalAmount, currency, cart: updatedCart }));
});