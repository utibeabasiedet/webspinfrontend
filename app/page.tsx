import dynamic from "next/dynamic";
import pic2 from '../public/coin-2.png'
import pic3 from '../public/coin-4.png'
import Image from "next/image";


const Roulette = dynamic(() => import("./roulette"), { ssr: false });

export default function App() {
  return (
    <div className=" h-[80vh] bg-hero-pattern bg-[#280B70]  bg-cover bg-no-repeat  flex justify-center items-center flex-col     ">
      <Image src={pic2} alt='fre' className="absolute z-50 top-[40%] left-0 animate-moveLeftRight "  />
      <Image src={pic3} alt='fre' className="absolute z-50 top-[40%] right-0 animate-moveLeftRight"  />
      <Roulette />
    </div>
  );
}
