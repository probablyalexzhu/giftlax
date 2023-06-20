import { Inter } from "next/font/google";
import { NextAuthProvider } from "./providers";
import React from "react";
import Header from "./components/Header";

// shared between pages; causes preload error
const inter = Inter({
    subsets: ["latin"],
});

export const metadata = {
    title: "Giftlax",
    description: "Never miss a gift-giving opportunity again",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <NextAuthProvider>
                    <Header />
                    {children}
                </NextAuthProvider>
            </body>
        </html>
    );
}
