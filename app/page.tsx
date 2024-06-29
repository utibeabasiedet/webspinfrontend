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
      {/* <Image src={pic2} alt='fre' className=" hidden md:absolute z-50 top-[20%] left-0 animate-bounce"  />
      <Image src={pic3} alt='fre' className="hidden md:absoluteabsolute z-50 top-[20%] right-0 animate-bounce"  /> */}
      {/* <Image src={pic4} alt='fre' className="absolute z-50 top-[50%] left-0 animate-pulse"  />
      <Image src={pic5} alt='fre' className="absolute z-50 top-[50%] right-0 animate-pulse"  /> */}
      <Roulette />
    </div>
  );
}
