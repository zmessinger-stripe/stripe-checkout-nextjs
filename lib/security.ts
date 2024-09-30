import { Cart } from "@/app/types";
import { v4 as uuidv4 } from 'uuid';

// Import Encryption Key
const ENCRYPTION_KEY = "SECRET_KEY_1234"

// Function to encrypt the cart
export function encryptCart(cart: Cart): string {
    const cartString = JSON.stringify(cart);
    let encrypted = '';

    for (let i = 0; i < cartString.length; i++) {
        const charCode = cartString.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length);
        encrypted += String.fromCharCode(charCode);
    }

    return btoa(encrypted);
}

// Function to decrypt the cart
export function decryptCart(encryptedCart: string): Cart {
    const decoded = atob(encryptedCart); // Convert from base64
    let decrypted = '';

    for (let i = 0; i < decoded.length; i++) {
        const charCode = decoded.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length);
        decrypted += String.fromCharCode(charCode);
    }

    return JSON.parse(decrypted);
}

// Function to save the cart to sessionStorage
export function saveCartToSession(cart: Cart): void {
    const encryptedCart = encryptCart(cart);
    sessionStorage.setItem('cart', encryptedCart);
}

// Function to load the cart from sessionStorage
export function loadCartFromSession(): Cart | null {
    const encryptedCart = sessionStorage.getItem('cart');
    return encryptedCart ? decryptCart(encryptedCart) : null;
}