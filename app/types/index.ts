import { StripePaymentElementChangeEvent, StripeElements, Stripe } from '@stripe/stripe-js';

/**
|--------------------------------------------------
| Normal Props
|--------------------------------------------------
*/

// Type definitions for individual cart items for storing session storage
export interface CartItemProps {
    price: string;
    quantity: number;
}

// Type defitions for aggregate cart for storing in session storage
export type CartProps = CartItemProps[]



// Cart types for rendering full cart in checkout
export interface UpdatedCartItemProps {
    price: string;
    amount: number;
    name: string;
    description: string
    quantity: number
}

// Define the return type for the calculateOrderAmount function
export interface FetchCartResponse {
    totalAmount: number;
    currency: string | null;
    updatedCart: UpdatedCartItemProps[]
}

export interface CheckoutOptionProps {
    title: string;
    description: string;
    buttonText: string;
    action: string;
    link: string;
}

export interface OrderDetailsProps {
    orderId: string;
    date: string;
    name: string;
    email: string;
    subTotal: number;
    tax: number;
    total: number;
    lineItems: Array<{ description: string; amount: number }>;
}

/**
|--------------------------------------------------
| React Component Props
|--------------------------------------------------
*/

export interface CheckoutCardComponentProps {
	option: CheckoutOptionProps;
    cart: CartProps;
    idx: number
}

export interface CartCardComponentProps {
	cart: CartProps;
	refreshCart: () => void;
}

export interface CheckoutFormComponentProps {
    deferredIntent: boolean;
    handleChange?: (event: StripePaymentElementChangeEvent, elements: StripeElements | null, stripe: Stripe | null) => Promise<void>;
}

export interface CartSectionComponenetProps {
    cart: UpdatedCartItemProps[]; 
    amount: number;
    surcharge?: number;
    subtotal: number
}