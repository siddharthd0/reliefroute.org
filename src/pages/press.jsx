import Head from "next/head";
import Navigation from "../components/navigation";
import Footer from "../components/footer";

export default function PressRelease() {
  return (
    <div>
      <Head>
        <title>Press Release - Crisis Compass</title>
        <meta name="description" content="Press Release for Crisis Compass" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <main className="container mx-auto mt-10 px-20 p-4 bg-white rounded-md">
        <h2 className="text-xl font-semibold mb-4">
          Crisis Compass: Find resources in real-time in the Israel war
        </h2>
        <p className="text-gray-600 mb-4">
           In the face of escalating conflicts and the challenges
          arising from areas affected by the ongoing situation in Israel, Crisis
          Compass emerges as a beacon of hope. We aim to provide live updates
          every 30 minutes on crucial resources such as shelter, food, and water
          for individuals seeking refuge.
        </p>

        <p className="text-gray-700 mb-4">
          Crisis Compass recognizes the pressing need for reliable information
          during tumultuous times. Our platform is designed to offer real-time
          insights to those in desperate need, guiding them toward safety and
          essential resources.
        </p>

        <p className="text-gray-700 mb-4">
          Collaboration is key. We encourage organizations, volunteers, and
          governmental bodies to share up-to-date data with us. This collective
          effort ensures that Crisis Compass remains the most trusted source for
          assistance during emergencies.
        </p>

        <p className="text-gray-700 mb-4 italic">
          About Crisis Compass: Born out of necessity, Crisis Compass dedicates
          itself to assisting individuals during crises. Our real-time updates
          bridge the information gap, ensuring that aid reaches where it's most
          needed. In the midst of chaos, let Crisis Compass be your guiding
          star.
        </p>

        <footer className="mt-6">
          <p className="text-gray-600">Press Contact:</p>
          <p className="text-gray-700">Siddharth Duggal</p>
          <p>
            <a
              href="mailto:siddharthduggal2013@gmail.com"
              className="text-blue-500 hover:underline"
            >
              siddharthduggal2013@gmail.com
            </a>
          </p>
          <p className="text-gray-700">Phone: (208) 810-8585</p>
          <p className="text-gray-700">
            Address: 1350 S Five Mile Road, Unit #1906767
          </p>
        </footer>
      </main>

      <Footer />
    </div>
  );
}
