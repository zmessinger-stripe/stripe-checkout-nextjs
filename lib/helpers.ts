import { CartProps, FetchCartResponse, UpdatedCartItemProps } from "@/app/types";
import { v4 as uuidv4 } from 'uuid';
// Import the Stripe library if not already imported
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/**
 * Calculates the total order amount from the provided items
 *
 * @param {Cart} cart - The amount returned from the Stripe API
 * @returns {object} Returns the formatted string
 *
 * @example
 * // returns '$10.00'
 * calculateOrderAmount({ });
 */


export async function fetchCart(cart: CartProps): Promise<FetchCartResponse> {
    let totalAmount = 0;
    let currency: string | null = null;
    let updatedCart: UpdatedCartItemProps[] = [];
    // Fetch all prices concurrently
    const pricePromises = cart.map((item) => stripe.prices.retrieve(item.price, { expand: ['product'] }));
    const prices = await Promise.all(pricePromises);
    
    cart.forEach((item, idx) => {
        const price = prices[idx]

        if (!price || !price.unit_amount || !price.currency) throw new Error(`Invalid price ID: ${item.price}`);
        if (currency && price.currency !== currency) throw new Error('Mixed currency orders are not supported.');
        // Update currency
        currency = price.currency;
        const amount = price.unit_amount * item.quantity;
        // Update total amount
        totalAmount += amount;
        // Push item to updated cart
        updatedCart.push({ 
            ...item, 
            amount, 
            name: price.product.name, 
            description: price.product.description })
    })

    return { totalAmount, currency, updatedCart };
}


/**
 * Randomly generates a cart for checkout
 *
 * @param {null}
 * @returns {Array} Returns the formatted string
 *
 * @example
 * // returns [{ price_id: 'price_XXX', quantity: 1 }, { price_id: 'price_XXX', quantity: 2 }]
 * createCart();
*/

export const createCart = () => {
    const prices = ["price_1Q3ojSBFIW304bYi5KqP7yKT", "price_1Q3NdpBFIW304bYiRQbdephu"];
    let cart: CartProps = []
    
    // Randomly generate a quantity betweeen 0 and 3 for each item
    prices.forEach(price => {
        let quantity = Math.floor(Math.random() * 4) + 1;
        cart.push({ price, quantity })
    })
    
    // Generate 'cart_id' and store in session storage.
    createCartId()
    // Return cart
    return cart
}


/**
 * Generates a unique cart identifier to store in sessionStorage. Carts will 
 *
 * @param {null}
 * @returns {void}
 *
 * @example
 * // returns 'cart_12345'
 * // generateCartId({ });
 */

export function createCartId(): void {
    const cartId =  `cart_${uuidv4()}`;
    sessionStorage.setItem('cart_id', cartId)
}

/**
 * Generates a order number to be attached to the cart 
 *
 * @param {null}
 * @returns {string} Returns the generated order number
 *
 * @example
 * // returns 'order_12345'
 * // createOrderNumber();
 */

export function createOrderNumber(): string {
    return `order_${uuidv4()}`
}