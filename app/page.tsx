'use client';

import dynamic from 'next/dynamic';


// Dynamic import for the Roulette component
const Roulette = dynamic(() => import('./roulette'), { ssr: false });



export default function App() {
 
  return (
    <div className="relative bg-black h-[77vh] bg-cover bg-center bg-no-repeat flex justify-center items-center flex-col">
     
      {/* Roulette component */}
      <Roulette />
    </div>
  );
}
