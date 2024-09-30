import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft } from "lucide-react";

export const CartSectionSkeleton = () => (
        <div className="w-1/2 bg-black p-8 text-white">
        <Link href="/" className="absolute top-4 left-4">
            <Button className="text-white">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
            </Button>
        </Link>
        <div className="mt-16 p-12">
            <Skeleton className="h-8 w-48 bg-gray-700 mb-4" /> {/* Cart title */}
            <div className="space-y-4">
            {/* Cart item */}
            <div className="flex justify-between">
                <Skeleton className="h-4 w-24 bg-gray-700" />
                <Skeleton className="h-4 w-16 bg-gray-700" />
            </div>
            {/* Another cart item */}
            <div className="flex justify-between">
                <Skeleton className="h-4 w-32 bg-gray-700" />
                <Skeleton className="h-4 w-16 bg-gray-700" />
            </div>
            <Separator className="bg-gray-600" />
            {/* Total */}
            <div className="flex justify-between font-bold">
                <Skeleton className="h-6 w-16 bg-gray-700" />
                <Skeleton className="h-6 w-20 bg-gray-700" />
            </div>
            </div>
        </div>
    </div>
);
