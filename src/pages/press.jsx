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
      <main className="container mx-auto mt-10 p-6 sm:px-8 md:px-20 bg-white rounded-md">

        <h2 className="text-xl font-semibold mb-4">
          Crisis Compass: Real-time Aid in the Israel Conflict
        </h2>
        <p className="text-gray-600 mb-4">
          As conflicts escalate and challenges grow in Israel, No Crisis 
          stands as a beacon of hope and resilience. With live updates every 30
          minutes on essential resources like shelter, food, and water, we aim
          to be the sanctuary for those seeking refuge.
        </p>

       
        <p className="text-gray-700 mb-4">
          The mission of Crisis Compass transcends just being an information
          portal. We need help from locals in Israel to help crowdsource our database to provide more resources
          for impacted citizens.

        </p>

        <p className="text-gray-700 mb-4 italic">
          About: Spawned out of urgency, we made this website to help the people impacted by the war find proper resources, like food, water, and shelter, basic essentials.
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
          Behind this initiative are two passionate teenagers, Siddharth Duggal (17)
          and Aditya Sahasranam (15). Motivated by a deep desire to provide support
          and assistance during these times.
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
