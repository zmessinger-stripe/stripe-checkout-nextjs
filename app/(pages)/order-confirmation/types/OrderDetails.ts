export interface OrderDetails {
    orderId: string;
    date: string;
    name: string;
    email: string;
    subTotal: number;
    tax: number;
    total: number;
    lineItems: Array<{ description: string; amount_total: number }>;
}