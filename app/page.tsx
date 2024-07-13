'use client';

import dynamic from 'next/dynamic';

// Dynamic import for the Roulette component
const Roulette = dynamic(() => import('./roulette'), { ssr: false });

export default function App() {
  return (
    <div className="relative bg-trial h-[87vh] md:h-[100vh] py-11 bg-cover bg-center bg-no-repeat flex flex-col justify-between items-center">
      {/* Main content */}
      <div className="flex-grow   flex justify-center items-center">
        <Roulette />
      </div>
      
      {/* Bottom section */}
      <section className="flex bg-[#021E35] justify-between items-center w-full absolute bottom-0 text-white h-[10vh] flex-shrink-0">
        <div className="bg-[#021E35] border border-1 w-[25%] h-full flex justify-center items-center">
          <a href="https://www.pinksale.finance/launchpad/bsc/0x52C317C68C7a89236c4F8652Fe8c5019608556f2" target='_blank'>Presale</a> </div>
        <div className="w-[25%] bg-[#F8B214] border border-1 h-full flex justify-center items-center">
          <a href="/mypoint">Referral</a>
          </div>
        <div className="w-[25%] bg-[#02B68F] border border-1 h-full flex justify-center items-center">
          <a href="/mytask">Task</a>
          </div>
        <div className="w-[25%] bg-white text-blue-700 h-full flex justify-center items-center">
          <a href="/mypoint">Withdraw</a>
        </div>
      </section>
    </div>
  );
}
