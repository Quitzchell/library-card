import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Library Card",
  description: "Library Card",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
