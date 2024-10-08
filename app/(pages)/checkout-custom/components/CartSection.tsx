import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"
import { CartSectionComponenetProps } from "@/app/types";
import { formatStripeAmount } from "@/lib/formatters";

export const CartSection = ({ cart, amount, surcharge, subtotal }: CartSectionComponenetProps) => {
    return (
        <div className="w-1/2 bg-black p-8 text-white">
            <Link href="/" className="absolute top-4 left-4">
                <Button className="text-white">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
            </Link>
            <div className="mt-16 p-12">
                <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
                <div className="space-y-4">
                    {cart.map((item, idx) => {
                        return (
                            <div key={idx} className="mb-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-semibold">{item.name}</h3>
                                        <p className="text-sm text-gray-500">{item.description}</p>
                                    </div>
                                    <span className="text-lg font-semibold">{formatStripeAmount(item.amount)}</span>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">Qty {item.quantity}</p>
                            </div>
                        )
                    })}
                    {surcharge && surcharge > 0 ? (
                        <>
                            <Separator className="bg-gray-600" />
                            <div className="flex justify-between font-bold">
                                <span>Credit Card Fee (10%)</span>
                                <span>{formatStripeAmount(surcharge)}</span>
                            </div>
                        </>
                    ) : null}
                    <Separator className="bg-gray-600" />
                    <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>{formatStripeAmount(subtotal)}</span>
                    </div>
                </div>
                
            </div>
        </div>
    )
}