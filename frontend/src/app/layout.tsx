import AuthProvider from "@/context/AuthProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RelaTree",
  description: "A family tree for the modern age.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main className="flex justify-center items-start p-6 h-[calc(100vh_-_80px)] bg-gray-900 text-white">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
