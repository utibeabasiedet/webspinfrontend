import Link from "next/link";
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="font-[0.875rem] flex shadow-lg bg-gray-100 text-[#949597] text-center justify-center px-[1rem] py-[1.5rem]">
      <span>© {currentYear} <Link href={"/"} className="text-lg mb-2">
          <span className="text-blue-700">MPG</span>
          <span>Coin</span>
        </Link> Nigeria. All rights reserved.</span>
    </footer>
  );
};

export default Footer;
