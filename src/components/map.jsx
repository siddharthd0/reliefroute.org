import { useEffect, useRef } from 'react';
import Script from 'next/script';

// Make the initMap function global
if (typeof window !== "undefined") {
  window.initMap = function() {
    const mapRef = document.getElementById("gmp-map");
    const gazaStripLatLng = {
      lat: 32.5,
      lng: 34.4667
    };

    const map = new window.google.maps.Map(mapRef, {
      zoom: 11,
      center: gazaStripLatLng,
      fullscreenControl: false,
      zoomControl: true,
      streetViewControl: false
    });

    const locations = [
      {
        position: { lat: 31.503, lng: 34.466 },
        title: 'Restaurant A',
        description: 'A popular restaurant in Gaza offering delicious meals.'
      },
      {
        position: { lat: 31.507, lng: 34.465 },
        title: 'Hotel B',
        description: 'A comfortable hotel with scenic views of the city.'
      },
      // ... add more locations as needed
    ];

    let activeInfoWindow;

    locations.forEach(location => {
      const marker = new window.google.maps.Marker({
        position: location.position,
        map,
        title: location.title
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="max-width: 200px">
            <h2>${location.title}</h2>
            <p>${location.description}</p>
          </div>
        `
      });

      marker.addListener('click', () => {
        if (activeInfoWindow) activeInfoWindow.close();
        infoWindow.open(map, marker);
        activeInfoWindow = infoWindow;
      });
    });
  };
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
