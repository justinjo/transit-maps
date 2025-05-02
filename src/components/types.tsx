export interface Agency {
  id: string;
  name: string;
  color: string;
  checked: boolean;
}

export interface VehicleType {
  id: string;
  name: string;
  checked: boolean;
}

export interface Vehicle {
  id: string;
  agency: string;
  type: string;
  lat: number;
  lng: number;
  heading: number;
  route: string;
}