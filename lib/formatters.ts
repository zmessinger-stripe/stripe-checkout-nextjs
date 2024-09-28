/**
 * Converts a Stripe amount to a formatted string to display in the UI
 *
 * @param {number} amount - The amount returned from the Stripe API
 * @param {string} currency - The currency that the provided amount should be formatted to
 * @returns {string} Returns the formatted string
 *
 * @example
 * // returns '$10.00'
 * formatStripeAmount(1000, "usd");
 */

export const formatStripeAmount = (amount: number, currency: string = "usd"): string =>  {
    if (!Number.isFinite(amount) || amount < 0) {
        throw new Error('Invalid amount. Must be a non-negative number.');
    }
  
    const numericAmount: number = amount / 100;
  
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(numericAmount);
}