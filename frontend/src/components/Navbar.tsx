import Link from "next/link";
import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";

function Navbar() {
    return (
        <nav className="container flex items-center justify-between">
            <ul>
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
            <ThemeSwitcher />
        </nav>
    );
}

export default Navbar;
