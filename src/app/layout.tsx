import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import StorefrontWrapper from "@/components/StorefrontWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NexusRetail | Modern Commerce Solutions",
  description:
    "Experience the perfect fusion of cutting-edge technology and minimalist aesthetic. Shop the latest arrivals in high-performance retail gear.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geist.variable} scroll-smooth`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface text-on-surface font-sans antialiased min-h-screen flex flex-col">
        <StorefrontWrapper>
          {children}
        </StorefrontWrapper>
      </body>
    </html>
  );
}