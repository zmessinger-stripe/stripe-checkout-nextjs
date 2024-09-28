import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatStripeAmount } from "@/lib/formatters";
import Link from "next/link";
import { OrderDetails } from "../types/OrderDetails";

const OrderDetailsCard = ({ orderDetails }: { orderDetails: OrderDetails }) => (
    <Card className="w-full">
        <CardHeader className="text-center">
            <div className="mx-auto bg-green-100 rounded-full p-3 mb-4">
                <Check className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Order Confirmed!</CardTitle>
            <CardDescription>
                Thank you for your purchase. Your order has been received and is being processed.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                <div>
                    <h3 className="font-semibold">Order Details</h3>
                    <p>Order Number: {orderDetails.orderId}</p>
                    <p>Date: {orderDetails.date}</p>
                </div>
                <Separator />
                <div>
                    <h3 className="font-semibold">Items</h3>
                    {orderDetails.lineItems.map((item, index) => (
                    <div key={index} className="flex justify-between">
                        <span>{item.description}</span>
                        <span>{formatStripeAmount(item.amount_total)}</span>
                    </div>
                    ))}
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatStripeAmount(orderDetails.total)}</span>
                </div>
                <Separator />
                <div>
                    <h3 className="font-semibold">Customer Information</h3>
                    <p>{orderDetails.name}</p>
                    <p>{orderDetails.email}</p>
                </div>
            </div>
        </CardContent>
        <CardFooter className="flex justify-center">
            <Link href="/">
                <Button>Continue Shopping</Button>
            </Link>
        </CardFooter>
    </Card>
);

export default OrderDetailsCard