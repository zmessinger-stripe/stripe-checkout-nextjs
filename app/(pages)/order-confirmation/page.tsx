"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { OrderDetailsSkeletonCard } from './components/OrderDetailsSkeletonCard';
import { OrderDetailsCard } from './components/OrderDetailsCard';
import { OrderDetailsProps } from "@/app/types";

const OrderConfirmationPage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [orderDetails, setOrderDetails] = useState<OrderDetailsProps | null>(null);
	const router = useRouter();

	useEffect(() => {
		async function fetchSessionData() {
			try {
				const queryString = window.location.search;
				const urlParams = new URLSearchParams(queryString);
				const sessionId = urlParams.get('session_id');
				// If sessionId doesn't exist as a query parameter, redirect root path..
				if (!sessionId) {
					router.push("/");
					return;
				}
				const response = await axios.get(`/api/checkout_sessions_embedded?session_id=${sessionId}`);
				console.log(response)
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

		fetchSessionData();
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
