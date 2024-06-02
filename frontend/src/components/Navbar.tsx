"use client";

import Link from "next/link";
import Image from "next/image";
import ThemeSwitcher from "./ThemeSwitcher";

function Navbar() {
    return (
        <nav className="container flex items-center justify-between mx-auto p-4">
            {/* here display the site icon, for now use the next.svg */}
            <div className="flex  space-x-6 align-baseline">
                <Image src="/next.svg" alt="Next.js Logo" width={50} height={50} className="" />
                <ul className="flex space-x-6">
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/tree">Tree</Link>
                    </li>
                    <li>
                        <Link href="/api/auth/signin?callbackUrl=/tree">Sign In</Link>
                    </li>
                    <li>
                        <Link href="/api/auth/signout">Sign Out</Link>
                    </li>
                </ul>
            </div>
            <ThemeSwitcher />
        </nav>
    );
}

export default Navbar;
