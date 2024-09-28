export interface CartItem {
    price_id: string;
    quantity: number;
}
  
export interface Cart {
    items: CartItem[];
}