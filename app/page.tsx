import dynamic from "next/dynamic";

const Roulette = dynamic(() => import("./roulette"), { ssr: false });

export default function App() {
  return (
    <div className=" h-[80vh]  bg-cover bg-no-repeat  flex justify-center items-center flex-col     ">
      <Roulette />
    </div>
  );
}
