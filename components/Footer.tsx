import Link from "next/link";
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    
       <section className="flex bg-[#021E35] justify-between items-center w-full text-white h-[10vh]">
        <div className="bg-[#021E35] border border-1 w-[25%] h-full flex justify-center items-center">Presale </div>
        <div className="w-[25%] bg-[#F8B214] border border-1 h-full flex justify-center items-center">Referals</div>
        <div className="w-[25%] bg-[#02B68F]  border border-1 h-full flex justify-center items-center">Task</div>
        <div className="w-[25%] bg-white text-blue-700 h-full flex justify-center items-center">
          <a href="/mypoint">Withdraw</a>
           </div>
      </section>
    
  );
};

export default Footer;
