import Link from "next/link";
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    
       <section className="flex bg-[#00003E] justify-between items-center w-full text-blue-700 h-[10vh]">
        <div className="bg-[#00003E] border border-1 w-[25%] h-full flex justify-center items-center">Presale </div>
        <div className="w-[25%] bg-[#00003E] border border-1 h-full flex justify-center items-center">Referals</div>
        <div className="w-[25%] bg-[#00003E] border border-1 h-full flex justify-center items-center">Task</div>
        <div className="w-[25%] bg-white h-full flex justify-center items-center">Withdraw</div>
      </section>
    
  );
};

export default Footer;
