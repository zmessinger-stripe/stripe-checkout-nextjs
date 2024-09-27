"use client"

import React, { useState, useEffect} from 'react';
import Link from "next/link";
import axios from 'axios';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";

  // Mock order data - replace with actual data from your order processing
  const orderDetails = {
    orderId: "ORD-12345",
    date: new Date().toLocaleDateString(),
    total: "$99.99",
    items: [
      { name: "Product 1", price: "$49.99" },
      { name: "Product 2", price: "$50.00" },
    ],
    customer: {
      name: "John Doe",
      email: "john@example.com",
      address: "123 Main St, Anytown, AN 12345"
    }
  };


const OrderConfirmationPage = () => {
    const [orderDetails, setOrderDetails] = useState({})

    useEffect(() => {
        async function fetchSessionData() {
            try {
                // Retrieve sessinoID
                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                const sessionId = urlParams.get('session_id');
                // Fetch current Stripe session state
                const response = await axios.get(`/api/checkout_sessions_embedded?session_id=${sessionId}`);
                const data = setOrderDetails(response.data);
            } catch (error) {
                console.error('Error fetching session data:', error);
            }
        }
    
        fetchSessionData();
      }, []);

      return (
        <div className="container mx-auto p-4 max-w-2xl">
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
                  {/* {orderDetails.items.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{item.name}</span>
                      <span>{item.price}</span>
                    </div>
                  ))} */}
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  {/* <span>{orderDetails.total}</span> */}
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold">Customer Information</h3>
                  <p>{orderDetails.customer.name}</p>
                  <p>{orderDetails.customer.email}</p>
                  <p>{orderDetails.customer.address}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
                <Link href="/">
                <Button>
                    Continue Shopping
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      );
    };
    
export default OrderConfirmationPage;