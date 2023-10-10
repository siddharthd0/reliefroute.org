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
    