import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Stripe Checkout",
  description: "Application that demos the differenc Stripe Checkout Flows",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-4 sm:p-8 md:p-20 gap-8 font-[family-name:var(--font-geist-sans)]">
          {children}
          <footer className="row-start-3 text-center py-4">
              <p><span className="bold">Stripe Checkout</span> by Zac Messinger</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
