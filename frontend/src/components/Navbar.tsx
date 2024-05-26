import Link from "next/link";
import React from "react";

function Navbar() {
    return (
        <nav className="container flex items-center justify-between">
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/api/auth/signin">Sign In</Link>
                </li>
                <li>
                    <Link href="/api/auth/signout">Sign Out</Link>
                </li>
                <li>
                    <Link href="/server">Server</Link>
                </li>
                <li>
                    <Link href="/client">Client</Link>
                </li>
                <li>
                    <Link href="/extra">Extra</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
