import Provider from "@/context/Provider";
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
                <Provider>
                    <header className="py-6">
                        <Navbar />
                    </header>

                    <main>{children}</main>

                    <footer></footer>
                </Provider>
            </body>
        </html>
    );
}
