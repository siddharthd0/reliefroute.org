import Image from "next/image";
import Landing from "../components/landing";
import Navigation from "../components/navigation";
import Head from "next/head";
import Map from "../components/map";

export default function Shelter() {
  return (
    <>
      <Head>
        <title>Map of Israel</title>
      </Head>

      <Navigation />
      <h1 className="text-4xl py-28 flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        Locate Shelter outside of War Zones
      </h1>
      <div className="h-screen">
        <Map />
        <h1>test</h1>
      </div>
    </>
  );
}
