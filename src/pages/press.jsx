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
          Crisis Compass: Real-time Aid in the Israel Conflict
        </h2>
        <p className="text-gray-600 mb-4">
          As conflicts escalate and challenges grow in Israel, Crisis Compass
          stands as a beacon of hope and resilience. With live updates every 30
          minutes on essential resources like shelter, food, and water, we aim
          to be the sanctuary for those seeking refuge.
        </p>

       
        <p className="text-gray-700 mb-4">
          The mission of Crisis Compass transcends just being an information
          portal. We believe in collaboration. Hence, we actively encourage
          organizations, volunteers, and government entities to share real-time
          data, enabling us to be the most trusted source of assistance during
          emergencies.
        </p>

        <p className="text-gray-700 mb-4 italic">
          About Crisis Compass: Spawned out of urgency, Crisis Compass is
          devoted to helping individuals in crisis situations. Amidst the chaos,
          allow Crisis Compass to be your guiding star.
        </p>
        <div className="flex  my-8">
          <div>
            <img src="sid.png" alt="Siddharth Duggal" className="w-40 h-40 rounded-xl shadow-md"/>
            <h3 className="text-center mt-2 text-lg font-medium">Siddharth Duggal</h3>
          </div>
          <div className="px-8">
            <img src="adi.jpeg" alt="Aditya Sahasranam" className="w-40 h-40 rounded-xl shadow-md"/>
            <h3 className="text-center mt-2 text-lg font-medium">Aditya Sahasranam</h3>
          </div>
        </div>
        <p className="text-gray-700 mb-4">
          Behind this initiative are two passionate teenagers, Siddharth Duggal
          and Aditya Sahasranam. Motivated by a deep desire to provide support
          and assistance during these testing times, they've built Crisis
          Compass to bridge the information gap, ensuring aid reaches its most
          needed destinations.
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
