import Image from "next/image";
import { Inter } from "next/font/google";
import Landing from "../components/landing";
import Navigation from "../components/navigation";
import Map from "../components/map";

export default function Home() {
  return (
    <>
      <Navigation />
      <h1 className="text-4xl py-28 flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        Locate Food outside of War Zones
      </h1>
        <Map /> 
    </>
  );
}
