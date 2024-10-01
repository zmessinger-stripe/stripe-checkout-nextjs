"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { OrderDetailsSkeletonCard } from './components/OrderDetailsSkeletonCard';
import { OrderDetailsCard } from './components/OrderDetailsCard';
import { OrderDetailsProps } from "@/app/types";

const OrderConfirmationPage = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [orderDetails, setOrderDetails] = useState<OrderDetailsProps | null>(null);
	const router = useRouter();

	const retrieveQueryParameters = () => {
		// Retrieves query parameters for fetching orders from server
		const urlParams = new URLSearchParams(window.location.search);
		return {
			sessionId: urlParams.get('session_id'),
			piClientSecret: urlParams.get('payment_intent_client_secret')
		};
	  };

	useEffect(() => {
		async function fetchOrderData(parameter: string) {
			try {
				const response = await axios.get(`/api/get-order-details?${parameter}`);
				// If session state is open, redirect root path.
				if (response.data.status === 'open') {
					router.push('/');
					return;
				}
				setOrderDetails(response.data);
			} catch (error) {
				console.error('Error fetching session data:', error);
			} finally {
				setIsLoading(false);
			}
		}
		
		// Retrieve query parameters
		const { sessionId, piClientSecret } = retrieveQueryParameters()
		// Determine which query paramter to attach to the API endpoint.
		if (sessionId) {
			fetchOrderData(`session_id=${sessionId}`);
		} else if (piClientSecret) {
			fetchOrderData(`payment_intent_client_secret=${piClientSecret}`);
		} else {
			router.push("/");
		}

	}, [router]);

	// If data is loading, return skeleton placeholder.
  	if (isLoading) {
		return (
			<div className="container mx-auto p-4 max-w-2xl">
				<OrderDetailsSkeletonCard />
			</div>
		);
	}

	// orderDetails are undefined, return nothing.
  	if (!orderDetails) return null;

	// If 'orderDetails' are successfully fetched, render 'OrderDetailsCard'
	return (
		<div className="container mx-auto p-4 max-w-2xl">
			<OrderDetailsCard orderDetails={orderDetails} />
		</div>
	);
};

export default OrderConfirmationPage;
