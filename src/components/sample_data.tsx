import { Agency, Vehicle, VehicleType } from './types';

// Transit agencies data with colors
export const agencies: Agency[] = [
  { id: 'muni', name: 'MUNI', color: '#f03b20', checked: true },
  { id: 'bart', name: 'BART', color: '#3182bd', checked: true },
  { id: 'caltrain', name: 'Caltrain', color: '#756bb1', checked: true },
  { id: 'golden-gate', name: 'Golden Gate Transit', color: '#31a354', checked: true }
];

// Transit vehicle types
export const vehicleTypes: VehicleType[] = [
  { id: 'bus', name: 'Buses', checked: true },
  { id: 'train', name: 'Trains', checked: true },
  { id: 'tram', name: 'Trams/Light Rail', checked: true },
  { id: 'ferry', name: 'Ferries', checked: true }
];

// Sample transit vehicle data (in a real app, this would come from APIs)
export const sampleVehicles: Vehicle[] = [
  { id: 'muni-1234', agency: 'muni', type: 'bus', lat: 37.7749, lng: -122.4194, heading: 90, route: '38R' },
  { id: 'muni-5678', agency: 'muni', type: 'tram', lat: 37.7695, lng: -122.4289, heading: 0, route: 'N' },
  { id: 'bart-3456', agency: 'bart', type: 'train', lat: 37.7903, lng: -122.4008, heading: 180, route: 'Richmond' },
  { id: 'caltrain-7890', agency: 'caltrain', type: 'train', lat: 37.7764, lng: -122.3942, heading: 135, route: 'SB Local' },
  { id: 'golden-gate-2345', agency: 'golden-gate', type: 'ferry', lat: 37.8060, lng: -122.4449, heading: 315, route: 'Sausalito' }
];