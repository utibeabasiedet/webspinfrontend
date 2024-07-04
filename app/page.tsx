'use client';

import dynamic from 'next/dynamic';

// Dynamic import for the Roulette component
const Roulette = dynamic(() => import('./roulette'), { ssr: false });

export default function App() {
  return (
    <div className="relative bg-real-g h-[100vh] bg-cover bg-center bg-no-repeat flex flex-col justify-between items-center">
      {/* Main content */}
      <div className="flex-grow flex justify-center items-center">
        <Roulette />
      </div>
      
      {/* Bottom section */}
      <section className="flex bg-[#021E35] justify-between items-center w-full text-white h-[10vh] flex-shrink-0">
        <div className="bg-[#021E35] border border-1 w-[25%] h-full flex justify-center items-center">Presale</div>
        <div className="w-[25%] bg-[#F8B214] border border-1 h-full flex justify-center items-center">Referral</div>
        <div className="w-[25%] bg-[#02B68F] border border-1 h-full flex justify-center items-center">Task</div>
        <div className="w-[25%] bg-white text-blue-700 h-full flex justify-center items-center">
          <a href="/mypoint">Withdraw</a>
        </div>
      </section>
    </div>
  );
}
