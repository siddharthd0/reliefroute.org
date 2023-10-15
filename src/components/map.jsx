import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const MapComponent = () => {
  const mapRef = useRef(null);
  const [locations, setLocations] = useState([]);
  const [filter, setFilter] = useState("");
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
 

  const handleTagChange = (event) => {
    setSelectedTag(event.target.value);
  };

  useEffect(() => {
    window.onload = () => {
      setMapsLoaded(true);
    };
  }, []);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("/api/safeHaven");
        const locationsData = response.data;
        setLocations(locationsData);
        setLoading(false); // Set loading to false when data is fetched
  
        // Extract all tags from each location
        const allTags = locationsData.flatMap(location => location.tags);
        // Create a Set to remove duplicates, then convert back to an Array
        const uniqueTags = Array.from(new Set(allTags));
        // Set the unique tags to state
        setTags(uniqueTags);
  
      } catch (error) {
        console.error("Error fetching locations:", error);
        setLoading(false); // Set loading to false if there's an error
      }
    };
  
    fetchLocations();
  }, []);
  

  const geocodeLocation = async (location) => {
    const address = encodeURIComponent(location.address);
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );
    if (response.data.results && response.data.results.length > 0) {
      const coords = response.data.results[0].geometry.location;
      return { ...location, lat: coords.lat, lng: coords.lng };
    } else {
      return null;
    }
  };

  useEffect(() => {
    const initMap = async () => {
      if (!window.google) return;

      const centerOfIsrael = {
        lat: 31.046051,
        lng: 34.851612,
      };

      const mapInstance = new window.google.maps.Map(mapRef.current, {
        zoom: 2,  // Set to a low zoom level to show the entire map
        center: { lat: 0, lng: 0 },  // Center on (0,0) so it's not focused on Israel
      });

      mapRef.current = mapInstance; // Store the map instance in the ref

      for (const location of locations) {
        const geocodedLocation = await geocodeLocation(location);
        if (geocodedLocation) {
          const marker = new window.google.maps.Marker({
            position: { lat: geocodedLocation.lat, lng: geocodedLocation.lng },
            map: mapInstance,
            title: geocodedLocation.businessName,
          });
          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="max-width: 300px; padding: 10px; border: 1px solid #ccc; border-radius: 8px; background-color: #f9f9f9;">
                <h1 style="font-weight: bold; margin-bottom: 10px;">${
                  geocodedLocation.businessName
                }</h1>
                <p style="margin-bottom: 5px;"><strong>Tags:</strong> ${
                  geocodedLocation.tags
                    ? geocodedLocation.tags
                        .map(
                          (tag) =>
                            `<span class="inline-block bg-blue-500 text-white rounded-full px-2 py-1 text-xs font-bold mr-3">${tag}</span>`
                        )
                        .join("")
                    : "N/A"
                }</p>
                <p style="margin-bottom: 5px;"><strong>Address:</strong> <a href="https://www.google.com/maps/search/?api=1&query=${
                  geocodedLocation.address
                }" target="_blank" rel="noopener noreferrer" style="color: blue;">${
              geocodedLocation.address
            }</a></p>
                <p style="margin-bottom: 5px;"><strong>Email:</strong> <a href="mailto:${
                  geocodedLocation.contactEmail
                }" style="color: blue;">${geocodedLocation.contactEmail}</a></p>
                <p style="margin-bottom: 5px;"><strong>Phone:</strong> <a href="tel:${
                  geocodedLocation.contactPhone
                }" style="color: blue;">${geocodedLocation.contactPhone}</a></p>
                <p style="margin-bottom: 5px;"><strong>Additional Information: </strong>${
                  geocodedLocation.additionalInfo
                }</p>
              </div>
            `,
          });

          marker.addListener("click", () => {
            infoWindow.open(mapInstance, marker);
          });
        }
      }
    };

    if (locations.length > 0) {
      initMap();
    }
    if (mapsLoaded) {
      initMap();
    }
  }, [locations]);

  const Tooltip = () => (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute top-0 right-0 bg-blue-500 text-white p-2 rounded"
    >
      Verified
    </motion.div>
  );

  const handleLocateOnMap = (lat, lng) => {
    if (mapRef.current) {
      const location = new window.google.maps.LatLng(lat, lng);
      mapRef.current.panTo(location);
      mapRef.current.setZoom(15); // Set zoom level to 15 (or any desired level)
    }
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Filter by name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mb-6 p-2 border border-gray-300 rounded focus:outline-none focus:border-black"
        />
           <div className="mb-6">
          <label htmlFor="tagFilter" className="block text-sm font-medium text-gray-700 mb-2">Filter by tag</label>
          <select
            id="tagFilter"
            value={selectedTag}
            onChange={handleTagChange}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">All</option>
            {tags.map((tag, index) => (
              <option key={index} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
        
        {loading ? (
          <div className="pt-4 text-2xl text-gray-700 font-bold text-center">Loading Resources & Map...</div>
        ) : (
          <div className="flex flex-wrap justify-center">

     
            {locations
               .filter((loc) =>
               (selectedTag === "" || loc.tags.includes(selectedTag)) &&
               loc.businessName.toLowerCase().includes(filter.toLowerCase())
             )
              .map((location) => (
                <div
                  key={location._id}
                  className="bg-white max-w-sm w-full p-6 m-4 rounded shadow-lg flex items-start relative"
                >
                  <div className="flex-grow">
                    <h2 className="text-xl font-bold mb-2">
                      {location.businessName}
                    </h2>
                    <p>
                   
                      {location.tags
                        ? location.tags.map((tag) => (
                            <span
                              className="inline-block bg-blue-500 mb-2 text-white rounded-full px-2 py-1 text-xs font-bold mr-3"
                              key={tag}
                            >
                              {tag}
                            </span>
                          ))
                        : "N/A"}
                    </p>
                    <p>
                      <span className="font-bold">Address: </span>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${location.address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600"
                      >
                        {location.address}
                      </a>
                    </p>
                    <p>
                      <span className="font-bold">Email: </span>
                      <a
                        href={`mailto:${location.contactEmail}`}
                        className="text-blue-600"
                      >
                        {location.contactEmail}
                      </a>
                    </p>
                    <p>
                      <span className="font-bold">Phone: </span>
                      <a
                        href={`tel:${location.contactPhone}`}
                        className="text-blue-600"
                      >
                        {location.contactPhone}
                      </a>
                    </p>
                    <p>
                      <span className="mb-4 font-bold">
                        Additional Information:{" "}
                      </span>
                      {location.additionalInfo}
                    </p>
                    <div className="mt-4">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${location.address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 font-medium bg-blue-500 text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
                      >
                        Locate on Google Maps
                      </a>
                    </div>
                  </div>
                  {location.isVerified === "True" && (
                    <div
                      onMouseEnter={() => setHovered(true)}
                      onMouseLeave={() => setHovered(false)}
                      className="relative pl-4"
                    >
                      <img
                        src="/check.png"
                        alt="Verified Icon"
                        className="w-18"
                      />
                      {hovered && <Tooltip />}
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>
      <div ref={mapRef} className="w-full min-h-screen mt-8" />

    </>
  );
};

export default MapComponent;
