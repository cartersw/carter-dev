import type { Metadata } from "next";
import type { ReactNode } from "react";
import { NAME } from "./constants/site";
import "./globals.css";

export const metadata: Metadata = {
  title: NAME,
  description: "portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
