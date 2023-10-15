import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import { AnimatePresence, motion } from "framer-motion"
import { FiCheckSquare, FiX} from "react-icons/fi"
import {useRouter} from "next/router";
 
function SafeHavenForm() {
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);
  
  const removeNotification = (id) => {
    setNotifications((pv) => pv.filter((n) => n.id !== id));
  };

  const [formData, setFormData] = useState({
    businessName: "",
    tags: [],
    address: "",
    contactEmail: "",
    contactPhone: "",
    additionalInfo: "",
    isVerified: "False",
  });

  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [tagInput, setTagInput] = useState('');
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
            setNotifications((pv) => [{ id: Math.random(), text: `You're safe place has been added to the 'Find Help' page.` }, ...pv]);
            router.push('/shelter');
        } catch (error) {
            setNotifications((pv) => [{ id: Math.random(), text: 'Error submitting the request. Please email siddharth@techoptimum.org.' }, ...pv]);
        }
    }
};
const handleAddTag = () => {
  if (tagInput && !formData.tags.includes(tagInput)) {
    setFormData(prevState => ({
      ...prevState,
      tags: [...prevState.tags, tagInput],
    }));
    setTagInput('');  // Clear the input
  }
};

const handleRemoveTag = (tag) => {
  setFormData(prevState => ({
    ...prevState,
    tags: prevState.tags.filter(t => t !== tag),
  }));
};

const handleTagInputKeyPress = (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();  // Prevent form submission
    handleAddTag();
  }
};

  return (
    <>
      <Navigation />
      <SlideInNotifications notifications={notifications} setNotifications={setNotifications} />

      <form onSubmit={handleSubmit} className="py-8 bg-gray-100 px-4 md:px-36 space-y-8">
        <div className="space-y-2">
          <h2 className="text-4xl text-center font-semibold text-gray-900 py-4">
            Provide a Safe Haven
          </h2>
          <p className="text-sm text-gray-600 text-center md:text-left">
            Thank you for helping people impacted by the war.
          </p>

          {/* Iterate over form fields to reduce redundancy */}
          {[
            { label: "Business Name", id: "businessName", type: "text" , placeholder:"Enter your business name"},
            
            {
              label: "Address",
              id: "address",
              type: "text",
              ref: addressInputRef,
              placeholder:"Enter your address"
            },
            { label: "Contact Email", id: "contactEmail", type: "email", placeholder:"Enter your email" },
            { label: "Contact Phone", id: "contactPhone", type: "tel", placeholder:"Enter your phone number" },
          ].map(({ label, id, type, ref, placeholder }) => (
            <div  key={id}>
              <label
                htmlFor={id}
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {label}
              </label>
              <input
              placeholder={placeholder}
                type={type}
                id={id}
                name={id}
                ref={ref}
                value={formData[id]}
                onChange={handleChange}
                className="transition duration-300 mt-4 mb-6 p-2 border border-gray-100 rounded focus:outline-none focus:border-black w-full"
              />
            </div>
          ))}
            <div className="mb-6">
            <label htmlFor="tags" className="block text-sm font-medium leading-6 text-gray-900">
              Tags
            </label>
            <div className="flex mt-2">
              <input
                type="text"
                id="tagInput"
                placeholder="Input tags like 'Food', 'Shelter', 'Medical', etc."
                name="tagInput"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleTagInputKeyPress}
                className="transition duration-300 p-2 border border-gray-100 rounded focus:outline-none focus:border-black flex-grow"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="ml-2 px-4 py-2 font-medium bg-blue-500 text-white rounded"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap mt-2">
              {formData.tags.map(tag => (
                <div key={tag} className="tag-item mr-2 mb-2 bg-blue-500 text-white rounded px-2 py-1 flex items-center">
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-sm text-red-500"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="additionalInfo"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Additional Information
            </label>
            <textarea
            placeholder="Enter any additional information you would like to provide to people who you would like to help."
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
      className="p-2 flex items-start rounded gap-2 text-lg font-medium shadow-lg text-white bg-indigo-500 pointer-events-auto"
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
