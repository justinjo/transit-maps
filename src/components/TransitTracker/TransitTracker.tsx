import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './TransitTracker.css';
import TransitTrackerHeader from '../TransitTrackerHeader/TransitTrackerHeader';
import TransitTrackerSidebar from '../TransitTrackerSidebar/TransitTrackerSidebar';
import MapLegend from '../MapLegend/MapLegend';
import TransitTrackerMap from '../TransitTrackerMap/TransitTrackerMap';
import { Agency, Vehicle, VehicleType } from '../types';
import { agencies, vehicleTypes, sampleVehicles } from '../sample_data';

const TransitTracker: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [transitAgencies, setTransitAgencies] = useState<Agency[]>(agencies);
  const [vehicleFilters, setVehicleFilters] = useState<VehicleType[]>(vehicleTypes);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<Record<string, mapboxgl.Marker>>({});

  // Toggle sidebar
  const toggleSidebar = (): void => {
    setSidebarOpen(!sidebarOpen);
  };

  // Toggle agency selection
  const toggleAgency = (id: string): void => {
    setTransitAgencies(
      transitAgencies.map(agency => 
        agency.id === id ? { ...agency, checked: !agency.checked } : agency
      )
    );
  };

  // Toggle vehicle type
  const toggleVehicleType = (id: string): void => {
    setVehicleFilters(
      vehicleFilters.map(type => 
        type.id === id ? { ...type, checked: !type.checked } : type
      )
    );
  };

  // Initialize map when component mounts
  useEffect(() => {
    // if (map.current) return; // Map already initialized
    if (!mapContainer.current) return; // Map container not found
    
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-122.4194, 37.7749], // San Francisco coordinates
      zoom: 12
    });

    // Add navigation control
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Clean up on unmount
    return () => map.current?.remove();
  }, []);

  // Fetch transit data (simulated)
  const fetchTransitData = (): void => {
    // In a real app, we would fetch from transit APIs here
    // For the prototype, we'll use sample data
    
    // Filter vehicles based on selected agencies and vehicle types
    const selectedAgencies = transitAgencies
      .filter(agency => agency.checked)
      .map(agency => agency.id);
      
    const selectedTypes = vehicleFilters
      .filter(type => type.checked)
      .map(type => type.id);
      
    const filteredVehicles = sampleVehicles.filter(vehicle => 
      selectedAgencies.includes(vehicle.agency) && 
      selectedTypes.includes(vehicle.type)
    );
    
    setVehicles(filteredVehicles);
  };

  // Update map markers when vehicles or filters change
  useEffect(() => {
    if (!map.current) return;
    
    // Fetch data when filters change
    fetchTransitData();
    
    // Set up a polling interval (every 15 seconds in a real app)
    const interval = setInterval(fetchTransitData, 100);
    
    return () => clearInterval(interval);
  }, [transitAgencies, vehicleFilters]);

  // Update markers when vehicles change
  useEffect(() => {
    if (!map.current || !map.current.loaded()) return;

    // Remove markers that are no longer present
    Object.keys(markers.current).forEach(id => {
      if (!vehicles.find(v => v.id === id)) {
        markers.current[id].remove();
        delete markers.current[id];
      }
    });

    // Update existing and add new markers
    vehicles.forEach(vehicle => {
      // Get agency color
      const agency = transitAgencies.find(a => a.id === vehicle.agency);
      const color = agency ? agency.color : '#999';
      
      if (markers.current[vehicle.id]) {
        // Update existing marker position
        markers.current[vehicle.id].setLngLat([vehicle.lng, vehicle.lat]);
      } else if (map.current) {
        // Create marker element
        const el = document.createElement('div');
        el.className = 'vehicle-marker';
        el.style.backgroundColor = color;
        
        // Add vehicle type icon class
        el.classList.add(`vehicle-${vehicle.type}`);
        
        // Create and store the marker
        const marker = new mapboxgl.Marker({
          element: el,
          rotation: vehicle.heading
        })
        .setLngLat([vehicle.lng, vehicle.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <h3>${agency?.name} ${vehicle.route}</h3>
              <p>Vehicle ID: ${vehicle.id}</p>
              <p>Type: ${vehicle.type}</p>
            `)
        )
        .addTo(map.current);
        
        markers.current[vehicle.id] = marker;
      }
    });
  }, [vehicles, transitAgencies]);

  return (
    <div className="transit-tracker">
      <TransitTrackerHeader sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="main-container">
        {sidebarOpen && 
          <TransitTrackerSidebar
            transitAgencies={transitAgencies}
            vehicleFilters={vehicleFilters}
            toggleAgency={toggleAgency}
            toggleVehicleType={toggleVehicleType}
          />
        }
        
        <main className="map-container">
          <TransitTrackerMap
            mapContainer={mapContainer}
            vehicles={vehicles}
            transitAgencies={transitAgencies}
            map={map}
            markers={markers}
          />
          
          <MapLegend transitAgencies={transitAgencies} />
        </main>
      </div>
    </div>
  );
};

export default TransitTracker;