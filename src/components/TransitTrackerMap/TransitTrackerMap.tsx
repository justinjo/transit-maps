import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { Vehicle, Agency } from '../types';

interface TransitTrackerMapProps {
  mapContainer: React.RefObject<HTMLDivElement>;
  vehicles: Vehicle[];
  transitAgencies: Agency[];
  map: React.RefObject<mapboxgl.Map | null>;
  markers: React.RefObject<Record<string, mapboxgl.Marker>>;
}

const TransitTrackerMap: React.FC<TransitTrackerMapProps> = ({ mapContainer, vehicles, transitAgencies, map, markers }) => {
  useEffect(() => {
    if (!map.current || !map.current.loaded()) return;

    // Remove stale markers
    Object.keys(markers.current).forEach(id => {
      if (!vehicles.find(v => v.id === id)) {
        markers.current[id].remove();
        delete markers.current[id];
      }
    });

    // Add or update markers
    vehicles.forEach(vehicle => {
      const agency = transitAgencies.find(a => a.id === vehicle.agency);
      const color = agency?.color || '#999';

      if (markers.current[vehicle.id]) {
        markers.current[vehicle.id].setLngLat([vehicle.lng, vehicle.lat]);
      } else {
        const el = document.createElement('div');
        el.className = 'vehicle-marker';
        el.style.backgroundColor = color;
        el.classList.add(`vehicle-${vehicle.type}`);

        const marker = new mapboxgl.Marker({ element: el, rotation: vehicle.heading })
          .setLngLat([vehicle.lng, vehicle.lat])
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <h3>${agency?.name} ${vehicle.route}</h3>
            <p>Vehicle ID: ${vehicle.id}</p>
            <p>Type: ${vehicle.type}</p>
          `))
          .addTo(map.current!);

        markers.current[vehicle.id] = marker;
      }
    });
  }, [vehicles, transitAgencies, map, markers]);

  return (
    <div ref={mapContainer} className="map">
      {/* Map will be rendered here */}
    </div>
  );
};

export default TransitTrackerMap;