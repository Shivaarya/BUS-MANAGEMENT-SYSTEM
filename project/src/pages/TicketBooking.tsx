import React, { useState } from 'react';
import { useBusContext } from '../context/BusContext';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

const TicketBooking = () => {
  const { routes, buses, addBooking } = useBusContext();
  const [selectedRoute, setSelectedRoute] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [passengerName, setPassengerName] = useState('');
  const [seatNumber, setSeatNumber] = useState('');

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    
    const route = routes.find(r => r.id === selectedRoute);
    const bus = buses.find(b => b.assignedRoute === selectedRoute);
    
    if (!route || !bus) return;

    const booking = {
      id: crypto.randomUUID(),
      routeId: selectedRoute,
      busId: bus.id,
      seatNumber: parseInt(seatNumber),
      date: selectedDate,
      passengerName,
      fare: route.fare,
      status: 'confirmed' as const,
      timestamp: new Date().toISOString()
    };

    addBooking(booking);
    
    // Reset form
    setSelectedRoute('');
    setSelectedDate('');
    setPassengerName('');
    setSeatNumber('');

    alert('Booking confirmed!');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Book Your Ticket</h1>
      
      <form onSubmit={handleBooking} className="card space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="inline-block w-4 h-4 mr-2" />
            Select Route
          </label>
          <select 
            className="select"
            value={selectedRoute}
            onChange={(e) => setSelectedRoute(e.target.value)}
            required
          >
            <option value="">Select a route</option>
            {routes.map(route => (
              <option key={route.id} value={route.id}>
                {route.name} - {route.startPoint} to {route.endPoint}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="inline-block w-4 h-4 mr-2" />
            Travel Date
          </label>
          <input
            type="date"
            className="input"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Users className="inline-block w-4 h-4 mr-2" />
            Passenger Name
          </label>
          <input
            type="text"
            className="input"
            value={passengerName}
            onChange={(e) => setPassengerName(e.target.value)}
            placeholder="Enter passenger name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Clock className="inline-block w-4 h-4 mr-2" />
            Seat Number
          </label>
          <input
            type="number"
            className="input"
            value={seatNumber}
            onChange={(e) => setSeatNumber(e.target.value)}
            min="1"
            max="50"
            placeholder="Choose seat number (1-50)"
            required
          />
        </div>

        {selectedRoute && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Booking Summary</h3>
            <p className="text-sm text-gray-600">
              Route: {routes.find(r => r.id === selectedRoute)?.name}
            </p>
            <p className="text-sm text-gray-600">
              Fare: ${routes.find(r => r.id === selectedRoute)?.fare}
            </p>
          </div>
        )}

        <button type="submit" className="btn btn-primary w-full">
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default TicketBooking;