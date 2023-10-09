import Image from "next/image";
import { Inter } from "next/font/google";
import Landing from "../components/landing";
import Navigation from "../components/navigation";
import Head from "next/head";
import Map from "../components/map";

export default function Home() {
  return (
    <>
  <Head>
        <title>Map of Israel</title>
        <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
        <script 
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`} 
          defer
        ></script>
      </Head>
      <Navigation />
      <h1 className="text-4xl py-28 flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        Locate Shelter outside of War Zones
      </h1>
      <div className="h-screen">
      <Map />
        </div>
    </>
  );
}
