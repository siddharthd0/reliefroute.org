import { useEffect, useRef, useState } from "react";
import axios from "axios";

const MapComponent = () => {
  const mapRef = useRef(null);
  const [locations, setLocations] = useState([]);
  const [filter, setFilter] = useState("");
  const [mapsLoaded, setMapsLoaded] = useState(false);

  useEffect(() => {
    window.onload = () => {
      setMapsLoaded(true);
    };
  }, []);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("/api/safeHaven");
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
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

    const initMap = async () => {
      if (!window.google) return;

      const centerOfIsrael = {
        lat: 31.046051,
        lng: 34.851612,
      };

      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 7,
        center: centerOfIsrael,
      });

      for (const location of locations) {
        const geocodedLocation = await geocodeLocation(location);
        if (geocodedLocation) {
          const marker = new window.google.maps.Marker({
            position: { lat: geocodedLocation.lat, lng: geocodedLocation.lng },
            map,
            title: geocodedLocation.businessName,
          });
          const infoWindow = new window.google.maps.InfoWindow({
            content: `
                <div style="max-width: 300px; padding: 10px; border: 1px solid #ccc; border-radius: 8px; background-color: #f9f9f9;">
                    <h1 style="font-weight: bold; margin-bottom: 10px;">${geocodedLocation.businessName}</h1>
                    <p style="margin-bottom: 5px;"><strong>Type:</strong> ${geocodedLocation.type}</p>
                    <p style="margin-bottom: 5px;"><strong>Address:</strong> <a href="https://www.google.com/maps/search/?api=1&query=${geocodedLocation.address}" target="_blank" rel="noopener noreferrer" style="color: blue;">jasdfjasndkjfn</a></p>
                    <p style="margin-bottom: 5px;"><strong>Email:</strong> <a href="mailto:${geocodedLocation.contactEmail}" style="color: blue;">${geocodedLocation.contactEmail}</a></p>
                    <p style="margin-bottom: 5px;"><strong>Phone:</strong> <a href="tel:${geocodedLocation.contactPhone}" style="color: blue;">${geocodedLocation.contactPhone}</a></p>
                    <p style="margin-bottom: 5px;"><strong>Additional Information: </strong>${geocodedLocation.additionalInfo}</p>
                </div>
            `,
        });
        

          marker.addListener("click", () => {
            infoWindow.open(map, marker);
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

  return (
    <>
      <div className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Filter by name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mt-4 mb-6 p-2 border border-gray-300 rounded focus:outline-none focus:border-black"
        />
        {locations
          .filter((loc) =>
            loc.businessName.toLowerCase().includes(filter.toLowerCase())
          )
          .map((location) => (
            <div
              key={location._id}
              className="bg-white max-w-sm w-full p-6 m-4 rounded shadow-lg"
            >
              <h2 className="text-xl font-bold mb-2">
                {location.businessName}
              </h2>
              <p>
                <span className="font-bold">Type:</span> {location.type}
              </p>
              <p>
                <span className="font-bold">Address:</span>{" "}
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
                <span className="font-bold">Email:</span>{" "}
                <a
                  href={`mailto:${location.contactEmail}`}
                  className="text-blue-600"
                >
                  {location.contactEmail}
                </a>
              </p>
              <p>
                <span className="font-bold">Phone:</span>{" "}
                <a
                  href={`tel:${location.contactPhone}`}
                  className="text-blue-600"
                >
                  {location.contactPhone}
                </a>
              </p>
              <p>
                <span className="font-bold">Additional Information: </span>
                {location.additionalInfo}
              </p>
            </div>
          ))}
      </div>
      <div ref={mapRef} className="w-full h-96 mt-8" />
    </>
  );
};

export default MapComponent;
