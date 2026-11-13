import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VidhiLens",
  description: "Semantic Retrieval of Indian Legal Precedents",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

