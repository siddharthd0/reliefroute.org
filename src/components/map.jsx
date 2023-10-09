import { useEffect } from 'react';

const MapComponent = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && window.google) {
      initMap();
    }
  }, []);

  const initMap = () => {
    const gazaStripLatLng = {
      lat: 31.5,
      lng: 34.4667
    };
    const map = new window.google.maps.Map(document.getElementById("gmp-map"), {
      zoom: 11,  // Adjusted zoom level for a better view of the Gaza Strip
      center: gazaStripLatLng,
      fullscreenControl: false,
      zoomControl: true,
      streetViewControl: false
    });
    new window.google.maps.Marker({
      position: gazaStripLatLng,
      map,
      title: "Gaza Strip"
    });
  };

  return (
    <div id="gmp-map" className="w-500 h-full" />
  );
};

export default MapComponent;
