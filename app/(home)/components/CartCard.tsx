import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card"
import { Cart, CartItem } from "@/lib/helpers";
import { Loader2 } from "lucide-react"

interface CartCardProps {
	cart: Cart;
	refreshCart: () => void;
}

const CartCard: React.FC<CartCardProps> = ({ cart, refreshCart }) => {
    return (
        <div className="w-full max-w-4xl mb-8">
				<Card className="w-full">
					<CardContent className="p-4 flex items-center justify-between">
						<div className="flex items-center space-x-4 overflow-x-auto flex-grow">
						<span className="font-semibold whitespace-nowrap">Current Cart:</span>
						{cart.length === 0 ? (
							<div className="flex justify-center items-center">
                                <Loader2 className="h-4 w-4 animate-spin" />
                            </div>
						) : (
							cart.map((item: CartItem, id: number) => (
                                <Badge key={id} variant="secondary" className="whitespace-nowrap">
                                    {item.price_id} x {item.quantity}
                                </Badge>
							))
						)}
						</div>
						<Button onClick={refreshCart} variant="outline" size="icon" className="ml-4 flex-shrink-0">
						    <RefreshCw className="h-4 w-4" />
						</Button>
					</CardContent>
				</Card>
			</div>
    )
}

export default CartCard;