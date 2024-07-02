import Link from "next/link";
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="font-[0.875rem] flex shadow-lg bg-gray-100 text-[#949597] text-center justify-center ">
      {/* <span>© {currentYear} <Link href={"/"} className="text-lg mb-2">
          <span className="text-blue-700">MPG</span>
          <span>Token</span>
        </Link>  All rights reserved.</span> */}
        {/* const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState(""); */}
       <section className="flex bg-[#00003E] justify-between items-center w-full text-blue-700 h-[10vh]">
        <div className="bg-[#00003E] w-[25%] h-full flex justify-center items-center">Presale Link</div>
        <div className="w-[25%] bg-red-500 h-full flex justify-center items-center">Referals</div>
        <div className="w-[25%] bg-yellow-500 h-full flex justify-center items-center">Task</div>
        <div className="w-[25%] bg-white h-full flex justify-center items-center">Withdraw</div>
      </section>
    </footer>
  );
};

export default Footer;
