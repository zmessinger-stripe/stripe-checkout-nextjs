export interface OrderDetails {
    orderId: string;
    date: string;
    name: string;
    email: string;
    total: number;
    lineItems: Array<{ description: string; amount_total: number }>;
}