export interface Bus {
  id: string;
  number: string;
  capacity: number;
  currentLocation: {
    lat: number;
    lng: number;
  };
  assignedRoute: string;
}

export interface Route {
  id: string;
  name: string;
  startPoint: string;
  endPoint: string;
  stops: string[];
  schedule: {
    departureTime: string;
    arrivalTime: string;
    days: string[];
  }[];
  fare: number;
}

export interface Booking {
  id: string;
  routeId: string;
  busId: string;
  seatNumber: number;
  date: string;
  passengerName: string;
  fare: number;
  status: 'confirmed' | 'cancelled';
  timestamp: string;
}