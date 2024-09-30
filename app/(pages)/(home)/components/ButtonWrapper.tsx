import Link from "next/link";
import { Cart } from "@/app/types";

const ButtonWrapper = (option: string, cart: Cart, children: React.ReactNode) => {
    switch (option.toLowerCase()) {
        case 'hosted':
            return (
                <form action="/api/checkout_sessions_hosted" method="POST" className="w-full">
                    <input type="hidden" name="cart"  value={JSON.stringify(cart)} />
                    {children}
                </form>
            );
        case 'embedded':
            return (
                <Link href="/checkout-embedded" className="w-full">
                    {children}
                </Link>
            );
        case 'custom':
            return (
                <Link href="/checkout-custom" className="w-full">
                    {children}
                </Link>
            )
        default:
            return children;
    }
};

export default ButtonWrapper;
