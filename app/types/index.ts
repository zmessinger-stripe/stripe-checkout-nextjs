// Cart types for storing session storage
export interface CartItem {
    price: string;
    quantity: number;
}
  
export type Cart = CartItem[]

// Cart types for rendering full cart in checkout
export interface UpdatedCartItem {
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
    updatedCart: UpdatedCartItem[]
}