import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const MapComponent = () => {
  const mapRef = useRef(null);
  const [locations, setLocations] = useState([]);
  const [filter, setFilter] = useState(''); // For filtering locations by name

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('/api/safeHaven');
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

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

      locations.forEach((location) => {
        const marker = new window.google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map,
          title: location.businessName,
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div style="max-width: 200px">
                      <h2>${location.businessName}</h2>
                      <p>Type: ${location.type}</p>
                      <p>Email: ${location.contactEmail}</p>
                      <p>Phone: ${location.contactPhone}</p>
                      <p>${location.additionalInfo}</p>
                    </div>`,
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      });
    };

    if (locations.length > 0 && window.google) {
      initMap();
    } else if (!window.google) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
      script.onload = initMap;
      document.body.appendChild(script);
    }
  }, [locations]);

  return (
    <>
      <div>
        <input 
          type="text" 
          placeholder="Filter by name" 
          value={filter} 
          onChange={e => setFilter(e.target.value)} 
          style={{margin: '10px 0'}}
        />
        {locations.filter(loc => loc.businessName.toLowerCase().includes(filter.toLowerCase())).map((location) => (
          <div key={location._id} style={{ maxWidth: '200px', margin: '10px 0', border: '1px solid #ccc', padding: '10px' }}>
            <h2>{location.businessName}</h2>
            <p>Type: {location.type}</p>
            <p>Email: {location.contactEmail}</p>
            <p>Phone: {location.contactPhone}</p>
            <p>{location.additionalInfo}</p>
          </div>
        ))}
      </div>
      <div ref={mapRef} style={{ width: '100%', height: '500px' }} />
    </>
  );
};

export default MapComponent;
