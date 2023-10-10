import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import { AnimatePresence, motion } from "framer-motion"
import { FiCheckSquare, FiX} from "react-icons/fi"
 
function SafeHavenForm() {
  const [notifications, setNotifications] = useState([]);
  
  const removeNotification = (id) => {
    setNotifications((pv) => pv.filter((n) => n.id !== id));
  };

  const [formData, setFormData] = useState({
    businessName: "",
    type: "",
    address: "",
    contactEmail: "",
    contactPhone: "",
    additionalInfo: "",
    isVerified: "False",
  });

  const [scriptLoaded, setScriptLoaded] = useState(false);
  const addressInputRef = useRef(null);

  useEffect(() => {
    // Function to load the Google Maps API script
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setScriptLoaded(true);
      };
      document.body.appendChild(script);
    };

    // Load the script
    if (!window.google) {
      loadGoogleMapsScript();
    } else {
      setScriptLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (
      !scriptLoaded ||
      !window.google ||
      !window.google.maps ||
      !window.google.maps.places
    )
      return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      addressInputRef.current,
      {
        types: ["address"],
        componentRestrictions: { country: "il" },
      }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place && place.formatted_address) {
        setFormData((prevState) => ({
          ...prevState,
          address: place.formatted_address,
        }));
      }
    });
  }, [scriptLoaded]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Function to check if any fields are left blank
    const isFormValid = () => {
        for (const key in formData) {
            if (formData[key] === '') {
                setNotifications((pv) => [{ id: Math.random(), text: `${key} field is required.` }, ...pv]);
                return false;
            }
        }
        return true;
    };

    // Only submit the form if all fields are filled
    if (isFormValid()) {
        try {
            await axios.post("/api/safeHaven", formData);
            setNotifications((pv) => [{ id: Math.random(), text: 'Request to have your Safe Haven added.' }, ...pv]);
        } catch (error) {
            setNotifications((pv) => [{ id: Math.random(), text: 'Error submitting the request. Please email siddharth@techoptimum.org.' }, ...pv]);
        }
    }
};

  return (
    <>
      <Navigation />
      <SlideInNotifications notifications={notifications} setNotifications={setNotifications} />

      <form onSubmit={handleSubmit} className="py-8 px-4 md:px-36 space-y-8">
        <div className="space-y-6">
          <h2 className="text-4xl text-center font-semibold text-gray-900 py-2">
            Provide a Safe Haven
          </h2>
          <p className="text-sm leading-6 text-gray-600 text-center md:text-left">
            Thank you for offering your establishment as a safe place in this
            unfortunate war. Please provide the details below:
          </p>

          {/* Iterate over form fields to reduce redundancy */}
          {[
            { label: "Business Name", id: "businessName", type: "text" },
            { label: "Type of Establishment", id: "type", type: "text" },
            {
              label: "Address",
              id: "address",
              type: "text",
              ref: addressInputRef,
            },
            { label: "Contact Email", id: "contactEmail", type: "email" },
            { label: "Contact Phone", id: "contactPhone", type: "tel" },
          ].map(({ label, id, type, ref }) => (
            <div key={id}>
              <label
                htmlFor={id}
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {label}
              </label>
              <input
                type={type}
                id={id}
                name={id}
                ref={ref}
                value={formData[id]}
                onChange={handleChange}
                className="mt-4 mb-6 p-2 border border-gray-300 rounded focus:outline-none focus:border-black w-full"
              />
            </div>
          ))}

          <div>
            <label
              htmlFor="additionalInfo"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Additional Information
            </label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              rows={3}
              value={formData.additionalInfo}
              onChange={handleChange}
              className="mt-4 mb-6 p-2 border border-gray-300 rounded focus:outline-none focus:border-black w-full"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 font-medium bg-blue-500 text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
      <Footer />
    </>
  );
}
const SlideInNotifications = ({ notifications, setNotifications }) => {
  const removeNotif = (id) => {
    setNotifications((pv) => pv.filter((n) => n.id !== id));
  };

  return (
    <div className="flex flex-col gap-1 w-72 fixed top-2 right-2 z-50 pointer-events-none">
      <AnimatePresence>
        {notifications.map((n) => (
          <Notification removeNotif={removeNotif} {...n} key={n.id} />
        ))}
      </AnimatePresence>
    </div>
  );
};

const NOTIFICATION_TTL = 5000;

const Notification = ({ text, id, removeNotif }) => {
  useEffect(() => {
    const timeoutRef = setTimeout(() => {
      removeNotif(id);
    }, NOTIFICATION_TTL);

    return () => clearTimeout(timeoutRef);
  }, [id, removeNotif]);

  return (
    <motion.div
      layout
      initial={{ y: -15, scale: 0.95 }}
      animate={{ y: 0, scale: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="p-2 flex items-start rounded gap-2 text-xs font-medium shadow-lg text-white bg-indigo-500 pointer-events-auto"
    >
      <FiCheckSquare className=" mt-0.5" />
      <span>{text}</span>
      <button onClick={() => removeNotif(id)} className="ml-auto mt-0.5">
        <FiX />
      </button>
    </motion.div>
  );
};
export default SafeHavenForm;
