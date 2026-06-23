import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { FloatingProvider } from "@/context/FloatingContext";
import AIChatWidget from "@/components/ui/AIChatWidget";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Faiz Ahmad Khan — Portfolio",
  description: "Full-Stack Developer Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <FloatingProvider>
        {children}
        <AIChatWidget />
      </FloatingProvider>
      </body>
    </html>
  );
}