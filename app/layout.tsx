import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ThemeModeScript } from "flowbite-react";
import { ConvexClientProvider } from "@/context/ConvexClientProvider";
import "./globals.css";

const roboto = Roboto({
  display: "swap",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "GrowList - Grocery List Tracker",
  description:
    "Real-time grocery list tracking application with AI assistance.",
  keywords: [
    "grocery list",
    "real-time tracking",
    "AI assistance",
    "shopping list",
    "GrowList",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeModeScript />
      </head>
      <body
        className={`${roboto.className} antialiased dark:bg-gray-700 bg-white`}
      >
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
