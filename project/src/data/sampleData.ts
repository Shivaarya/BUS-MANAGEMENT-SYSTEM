export const routes: Route[] = [
  {
    id: "1",
    name: "Downtown Express",
    startPoint: "Central Station",
    endPoint: "Business District",
    stops: ["Central Station", "Market Square", "Tech Hub", "Business District"],
    schedule: [
      {
        departureTime: "07:00",
        arrivalTime: "07:45",
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
      },
      {
        departureTime: "08:00",
        arrivalTime: "08:45",
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
      }
    ],
    fare: 25
  },
  {
    id: "2",
    name: "Airport Shuttle",
    startPoint: "City Center",
    endPoint: "International Airport",
    stops: ["City Center", "Hotel Zone", "Terminal 1", "Terminal 2"],
    schedule: [
      {
        departureTime: "06:00",
        arrivalTime: "07:00",
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
      },
      {
        departureTime: "14:00",
        arrivalTime: "15:00",
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
      }
    ],
    fare: 35
  }
];

export const buses: Bus[] = [
  {
    id: "1",
    number: "BUS-001",
    capacity: 45,
    currentLocation: {
      lat: 40.7128,
      lng: -74.0060
    },
    assignedRoute: "1"
  },
  {
    id: "2",
    number: "BUS-002",
    capacity: 50,
    currentLocation: {
      lat: 40.7589,
      lng: -73.9851
    },
    assignedRoute: "2"
  }
];

export const initialBookings: Booking[] = [
  {
    id: "1",
    routeId: "1",
    busId: "1",
    seatNumber: 12,
    date: "2024-03-15",
    passengerName: "John Doe",
    fare: 25,
    status: "confirmed",
    timestamp: "2024-03-14T10:30:00Z"
  }
];