import Image from "next/image";

import Logo from "@/public/favicon.png";

function Navbar() {
  return (
    <nav>
      <Image src={Logo} alt="Logo" width={30} height={30} placeholder="blur" />
      <h1>RelaTree</h1>
    </nav>
  );
}

export default Navbar;
