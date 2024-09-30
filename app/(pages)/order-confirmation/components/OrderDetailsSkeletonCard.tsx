import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const OrderDetailsSkeletonCard = () => { 
    return (
        <Card className="w-full">
            <CardHeader className="text-center">
                <Skeleton className="h-12 w-12 rounded-full mx-auto" />
                <Skeleton className="h-6 w-3/4 mx-auto mt-4" />
                <Skeleton className="h-4 w-1/2 mx-auto mt-2" />
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                {[...Array(5)].map((_, index) => (
                    <Skeleton key={index} className="h-4 w-full" />
                ))}
                </div>
            </CardContent>
            <CardFooter className="flex justify-center">
                <Skeleton className="h-10 w-40" />
            </CardFooter>
        </Card>
    )
}