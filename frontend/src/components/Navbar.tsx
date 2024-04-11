import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <header>
      <nav className="flex items-center w-full bg-gray-700 h-[80px]">
        <ul className="flex justify-evenly text-xl font-semibold text-white w-full">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/api/auth/signin">Sign In</Link>
          </li>
          <li>
            <Link href="/api/auth/signout">Sign Out</Link>
          </li>
        </ul>
      </nav>
      <div className="mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          href="/"
          className="flex title-font font-medium items-left mb-4 md:mb-0"
        >
          <span className="ml-3 text-xl">RelaTree</span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-xl justify-center">
          <Link href="/"> Home </Link>
          <Link href="/newUser">New User</Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
