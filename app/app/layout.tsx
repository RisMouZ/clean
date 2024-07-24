import AppWalletProvider from "./components/AppWalletProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AnchorClientProvider } from "./components/AnchorClientProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppWalletProvider>
          <AnchorClientProvider>{children}</AnchorClientProvider>
        </AppWalletProvider>
      </body>
    </html>
  );
}
