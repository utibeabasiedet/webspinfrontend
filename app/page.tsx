import dynamic from "next/dynamic";
import pic2 from '../public/coin-2.png'
import pic3 from '../public/coin-4.png'
import pic4 from '../public/banner-left-obj.png'
import pic5 from '../public/banner-right-obj.png'
import Image from "next/image";


const Roulette = dynamic(() => import("./roulette"), { ssr: false });

export default function App() {
  return (
    <div className=" h-[80vh] bg-hero-pattern bg-[#280B70]  bg-cover bg-center bg-no-repeat  flex justify-center items-center flex-col   ">
   
      <Roulette />
      <section className="flex bg-[#00003E] justify-between items-center w-full text-blue-700 h-[10vh]">
        <div className="bg-[#00003E] w-[25%] h-full flex justify-center items-center">Presale Link</div>
        <div className="w-[25%] bg-red-500 h-full flex justify-center items-center">Referals</div>
        <div className="w-[25%] bg-yellow-500 h-full flex justify-center items-center">Task</div>
        <div className="w-[25%] bg-white h-full flex justify-center items-center">Withdraw</div>
      </section>
    </div>
  );
}
