import AuthProvider from "@/context/AuthProvider";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "NextAuth Tutorial- By NextjsDev",
    description: "User Authentication in Next.js 13 App using NextAuth",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthProvider>
                    <Navbar />
                    <main className="flex justify-center items-start p-6 h-[calc(100vh_-_80px)] bg-gray-900">
                        {children}
                    </main>
                </AuthProvider>
            </body>
        </html>
    );
}
