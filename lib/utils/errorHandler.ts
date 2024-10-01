export function handleApiError(err: any) {
	// Log the error for debugging
    console.error('API Error:', err); 
	// Set statusCode and erorr message
    const statusCode = err.statusCode || 500;
    const message = err.message || 'An unexpected error occurred';
	// Return response
    return new Response(JSON.stringify({ error: message }), {
		status: statusCode,
		headers: { 'Content-Type': 'application/json' },
    });
  }
  