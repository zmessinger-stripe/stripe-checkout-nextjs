export function formatStripeAmount(amount: number, currency: string = "usd"): string {
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