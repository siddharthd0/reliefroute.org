import Image from "next/image";
import Landing from "../components/landing";
import Navigation from "../components/navigation";
import Head from "next/head";
import dynamic from 'next/dynamic';
const DynamicMapComponent = dynamic(() => import('../components/map'), {
  ssr: false, 
  loading: () => <p>Loading...</p> 
});

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
        <DynamicMapComponent />
        <h1>test</h1>
      </div>
    </>
  );
}
