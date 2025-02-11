import React, { createContext, useContext, useEffect, useState } from 'react';
import { Bus, Route, Booking } from '../types';
import { routes as sampleRoutes, buses as sampleBuses, initialBookings } from '../data/sampleData';

interface BusContextType {
  buses: Bus[];
  routes: Route[];
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  cancelBooking: (bookingId: string) => void;
}

const BusContext = createContext<BusContextType | undefined>(undefined);

export const BusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    // Load data from localStorage or use sample data
    const savedBookings = localStorage.getItem('bookings');
    setBuses(sampleBuses);  // Use sampleBuses instead of buses
    setRoutes(sampleRoutes);  // Use sampleRoutes instead of routes
    setBookings(savedBookings ? JSON.parse(savedBookings) : initialBookings);
  }, []);

  // Rest of the code remains the same
  const addBooking = (booking: Booking) => {
    const newBookings = [...bookings, booking];
    setBookings(newBookings);
    localStorage.setItem('bookings', JSON.stringify(newBookings));
  };

  const cancelBooking = (bookingId: string) => {
    const updatedBookings = bookings.map(booking =>
      booking.id === bookingId ? { ...booking, status: 'cancelled' as const } : booking
    );
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
  };

  return (
    <BusContext.Provider value={{ buses, routes, bookings, addBooking, cancelBooking }}>
      {children}
    </BusContext.Provider>
  );
};

export const useBusContext = () => {
  const context = useContext(BusContext);
  if (context === undefined) {
    throw new Error('useBusContext must be used within a BusProvider');
  }
  return context;
};