import Image from "next/image";
import Landing from "../components/landing";
import Navigation from "../components/navigation";
import Head from "next/head";
import dynamic from 'next/dynamic';
import ErrorBoundary from '../components/ErrorBoundary';
import Map  from '../components/map';
export default function Shelter() {
  return (
    <>
     <Head>
  <title>Map of Israel</title>
  <script async defer src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}></script>
</Head>


      <Navigation />
      <h1 className="text-4xl py-28 flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        Locate Shelter outside of War Zones
      </h1>
      <div className="h-screen">
      <ErrorBoundary>
        <Map />
      </ErrorBoundary>
      <h1>test</h1>
    </div>
    </>
  );
}
