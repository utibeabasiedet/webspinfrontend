import dynamic from "next/dynamic";
import pic2 from "../public/coin-2.png";
import pic3 from "../public/coin-4.png";
import pic4 from "../public/banner-left-obj.png";
import pic5 from "../public/banner-right-obj.png";
import Image from "next/image";

const Roulette = dynamic(() => import("./roulette"), { ssr: false });

export default function App() {
  return (
    <div className=" h-[77vh] bg-hero-patter  bg-cover bg-center bg-no-repeat  flex justify-center  items-center flex-col   ">
      <Roulette /> 
    </div>
  );
}
