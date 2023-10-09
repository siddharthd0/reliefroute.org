import { useEffect } from 'react';

const MapComponent = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && window.google) {
      initMap();
    }
  }, []);

  const initMap = () => {
    const myLatLng = {
      lat: 40.12150192260742,
      lng: -100.45039367675781
    };
    const map = new window.google.maps.Map(document.getElementById("gmp-map"), {
      zoom: 4,
      center: myLatLng,
      fullscreenControl: false,
      zoomControl: true,
      streetViewControl: false
    });
    new window.google.maps.Marker({
      position: myLatLng,
      map,
      title: "My location"
    });
  };

  return (
    <div id="gmp-map" className="w-full h-full" />
  );
};

export default MapComponent;
