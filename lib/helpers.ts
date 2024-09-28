import { Cart } from "@/app/types/cart";

/**
 * Calculates the total order amount from the provided items
 *
 * @param {number} items - The amount returned from the Stripe API
 * @returns {string} Returns the formatted string
 *
 * @example
 * // returns '$10.00'
 * calculateOrderAmount({ });
 */

export const calculateOrderAmount = (items: any) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
};

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
    let prices = ["price_1Q3ojSBFIW304bYi5KqP7yKT", "price_1Q3NdpBFIW304bYiRQbdephu"];
    let cart: Cart = []

    // Randomly generate a quantity betweeen 0 and 3 for each item
    prices.forEach(price => {
        let quantity = Math.floor(Math.random() * 4) + 1;
        cart.push({ price, quantity })
    })

    return cart
}