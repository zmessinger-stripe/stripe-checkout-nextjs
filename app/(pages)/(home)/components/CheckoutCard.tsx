import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link";
import ButtonWrapper from "./ButtonWrapper";
import { Cart } from "@/app/types";

interface CheckoutOption {
    title: string;
    description: string;
    buttonText: string;
    link: string;
}

interface CartCardProps {
	option: CheckoutOption;
    cart: Cart;
    idx: number
}

const CheckoutCard: React.FC<CartCardProps> = ({ option, idx, cart }) => {
    return (
        <Card key={idx} className="flex flex-col h-full">
            <CardHeader>
                <CardTitle className="text-xl font-bold text-center">{option.title} Checkout</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-sm text-gray-600">{option.description}</p>
            </CardContent>
            <CardFooter className="mt-auto flex gap-2">
            <Link href={option.link} className="w-full"  target="_blank">
                <Button className="w-full bg-purple-800 hover:bg-purple-600 text-white" type="button">
                    View Docs
                </Button>
                </Link>
                {ButtonWrapper(option.title, cart,
                    <Button className="w-full bg-black hover:bg-gray-600 text-white" type="submit" role="link">
                        {option.buttonText}
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}

export default CheckoutCard;