import React, { useEffect } from 'react';
import { useBusContext } from '../context/BusContext';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

// Fix for default marker icon
const icon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const LiveTracking = () => {
  const { buses, routes } = useBusContext();
  const center = { lat: 40.7128, lng: -74.0060 }; // NYC coordinates

  useEffect(() => {
    // Add Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Live Bus Tracking</h1>

      <div className="card" style={{ height: '600px' }}>
        <MapContainer
          center={[center.lat, center.lng]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {buses.map(bus => {
            const route = routes.find(r => r.id === bus.assignedRoute);
            return (
              <Marker
                key={bus.id}
                position={[bus.currentLocation.lat, bus.currentLocation.lng]}
                icon={icon}
              >
                <Popup>
                  <div className="text-sm">
                    <p className="font-bold mb-1">{bus.number}</p>
                    <p>Route: {route?.name}</p>
                    <p>Capacity: {bus.capacity} seats</p>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {buses.map(bus => {
          const route = routes.find(r => r.id === bus.assignedRoute);
          return (
            <div key={bus.id} className="card">
              <h3 className="font-semibold mb-2">{bus.number}</h3>
              <p className="text-sm text-gray-600">Route: {route?.name}</p>
              <p className="text-sm text-gray-600">
                Location: ({bus.currentLocation.lat.toFixed(4)}, {bus.currentLocation.lng.toFixed(4)})
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LiveTracking;