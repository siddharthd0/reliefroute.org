import Image from "next/image";
import Landing from "../components/landing";
import Navigation from "../components/navigation";
import Head from "next/head";
import dynamic from "next/dynamic";
import ErrorBoundary from "../components/ErrorBoundary";
import Map from "../components/map";
import Footer from "../components/footer";
export default function Shelter() {
  return (
    <>
      <Head>
        <title>Map of Israel</title>
        <script
          async
          defer
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
        ></script>
      </Head>

      <Navigation />
      <h1 className="text-4xl mt-14 mb-6 flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        Locate Shelter outside of War Zones
      </h1>
      <div className="mb-22 h-screen">
        <ErrorBoundary>
          <Map />
        </ErrorBoundary>
      </div>
      <div className="mt-28"></div>
    </>
  );
}
