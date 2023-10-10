import { useEffect } from "react";
import Script from "next/script";

function initMap() {
  const mapRef = document.getElementById("gmp-map");
  const gazaStripLatLng = {
    lat: 32.5,
    lng: 34.4667,
  };

  const map = new window.google.maps.Map(mapRef, {
    zoom: 11,
    center: gazaStripLatLng,
    fullscreenControl: false,
    zoomControl: true,
    streetViewControl: false,
  });

  const locations = [
    {
      position: { lat: 31.503, lng: 24.466 },
      title: "Restaurant",
      description: "test",
    },
  ];

  let activeInfoWindow;

  locations.forEach((location) => {
    const marker = new window.google.maps.Marker({
      position: location.position,
      map,
      title: location.title,
    });

    const infoWindow = new window.google.maps.InfoWindow({
      content: `
                <div style="max-width: 200px">
                    <h2>${location.title}</h2>
                    <p>${location.description}</p>
                </div>
            `,
    });

    marker.addListener("click", () => {
      if (activeInfoWindow) activeInfoWindow.close();
      infoWindow.open(map, marker);
      activeInfoWindow = infoWindow;
    });
  });
}
if (typeof window !== "undefined") {
  window.initMap = initMap;
}

const MapComponent = () => {
  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`}
        strategy="beforeInteractive"
      />
      <div id="gmp-map" className="w-full h-full" />
    </>
  );
};

export default MapComponent;
