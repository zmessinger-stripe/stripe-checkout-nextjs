import Link from "next/link";

const ButtonWrapper = (option: string, children: React.ReactNode) => {
    switch (option.toLowerCase()) {
        case 'hosted':
            return (
                <form action="/api/checkout_sessions_hosted" method="POST" className="w-full">
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
