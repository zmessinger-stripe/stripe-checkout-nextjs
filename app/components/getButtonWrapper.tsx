import Link from "next/link";

const getButtonWrapper = (option: string, children: React.ReactNode) => {
    switch (option.toLowerCase()) {
        case 'hosted':
            return (
                <form action="/api/checkout_sessions_hosted" method="POST" className="w-full">
                    {children}
                </form>
            );
        case 'embedded':
            return (
                <Link href="/embedded_checkout" className="w-full">
                    {children}
                </Link>
            );
        case 'custom':
            return children;
        default:
            return children;
    }
};

export default getButtonWrapper
