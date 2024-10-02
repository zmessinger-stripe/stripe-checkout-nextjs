# Stripe Checkout Flow Tester

This Next.js application is designed to test and demonstrate various Stripe checkout flows. It provides a simulated e-commerce experience with multiple checkout options, allowing SA's to explore and compare different Stripe integration methods.

## Features

- Multiple Stripe checkout options:
  - Stripe Hosted Checkout
  - Stripe Embedded Checkout
  - Stripe Custom Checkout with Elements
  - Stripe Custom Checkout (Deferred Intent)
- Simulated cart with randomly generated products
- Cart persistence using encrypted sessionStorage
- Order confirmation page upon successful conversion

## Flow

1. Users start on a "cart" page where they can select a checkout option.
2. The application randomly generates a cart with two different preset Stripe products.
3. A unique cart identifier is created to serve as an idempotency key.
4. Cart data is encrypted and stored in sessionStorage for page persistence.
5. Upon successful payment, users are redirected to an order confirmation page.

## Technologies Used

| Technology              | Description                                                                   |
| ----------------------- | ----------------------------------------------------------------------------- |
| Next.js                 | React framework for building server-side rendered and static web applications |
| React                   | JavaScript library for building user interfaces                               |
| Stripe                  | Payment processing platform                                                   |
| @stripe/react-stripe-js | React components for Stripe Elements                                          |
| @stripe/stripe-js       | Stripe.js library for secure payment processing                               |
| Tailwind CSS            | Utility-first CSS framework                                                   |
| Radix UI                | Unstyled, accessible UI component library                                     |
| Axios                   | Promise-based HTTP client for making API requests                             |
| UUID                    | Library for generating unique identifiers                                     |

## Setup and Installation

1. Clone the repository:

`git clone https://github.com/your-username/stripe-checkout-tester.git`

2. Install dependencies:

`cd stripe-checkout-tester npm install`

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your Stripe API keys:

4. Run the development server:

`npm run dev`

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
