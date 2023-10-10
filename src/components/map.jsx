import { useEffect, useRef } from "react";

const MapComponent = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const initMap = () => {
      const centerOfIsrael = {
        lat: 31.046051,
        lng: 34.851612,
      };

      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 7,
        center: centerOfIsrael,
      });

      const restaurants = [
        { lat: 31.046051, lng: 34.851612, name: "Restaurant A" },
        { lat: 32.109333, lng: 34.855499, name: "Shelter" },
        { lat: 32.794044, lng: 34.989571, name: "Restaurant C" },
        // Add more coordinates as required
      ];

      restaurants.forEach((restaurant) => {
        const marker = new window.google.maps.Marker({
          position: restaurant,
          map,
          title: restaurant.name,
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div style="max-width: 200px">
                      <h2>${restaurant.name}</h2>
                      <p>Click to view more!</p>
                    </div>`,
        });

        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });
      });
    };

    if (!window.google) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
      script.onload = () => {
        initMap();
      };
      document.body.appendChild(script);
    } else {
      initMap();
    }

  }, []);

  return <div ref={mapRef} className="w-full h-full" />;
};

export default MapComponent;
