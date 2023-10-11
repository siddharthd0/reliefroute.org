import Image from "next/image";
import { Inter } from "next/font/google";
import Navigation from "../components/navigation";
import HelpCard from "../components/help-card";
import Footer from "../components/footer";

export default function StepOne() {
  return (
    <>
      <Navigation />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center">
          <h1 className="pt-8 text-4xl font-bold">Select what you need</h1>
          <HelpCard />
        </main>
      </div>
      <Footer />
    </>
  );
}
