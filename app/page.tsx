
// import Roulette from "./roulette";
import dynamic from 'next/dynamic';

const Roulette = dynamic(() => import('./roulette'), { ssr: false });

export default function App() {
  return (
    <div className=" h-[80vh]  md:min-h-screen  flex justify-center items-center shadow-xl shadow-sky-700  ">

      <Roulette />
    </div>
  );
}
