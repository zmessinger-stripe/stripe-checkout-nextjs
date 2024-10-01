import Link from "next/link";
import { CartProps} from "@/app/types";

const ButtonWrapper = (option: string, action: string, cart: CartProps, children: React.ReactNode) => {
    switch (option.toLowerCase()) {
        case 'hosted':
            return (
                <form action={action} method="POST" className="w-1/2">
                    <input type="hidden" name="cart"  value={JSON.stringify(cart)} />
                    {children}
                </form>
            );
        case 'embedded':
            return (
                <Link href={action} className="w-1/2">
                    {children}
                </Link>
            );
        case 'custom':
            return (
                <Link href="/checkout-custom" className="w-1/2">
                    {children}
                </Link>
            )
        case 'deferred':
            return (
                <Link href="/checkout-custom/deferred" className="w-1/2">
                    {children}
                </Link>
            )
        default:
            return (
                <Link href="/checkout-custom" className="w-1/2">
                    {children}
                </Link>
            )
    }
};

export default ButtonWrapper;
