import React from 'react';
import { useBusContext } from '../context/BusContext';
import { Bus, Route, Users, Clock } from 'lucide-react';

const Dashboard = () => {
  const { buses, routes, bookings } = useBusContext();
  const activeBookings = bookings.filter(b => b.status === 'confirmed');

  const stats = [
    {
      title: 'Active Buses',
      value: buses.length,
      icon: Bus,
      color: 'bg-blue-500',
    },
    {
      title: 'Available Routes',
      value: routes.length,
      icon: Route,
      color: 'bg-green-500',
    },
    {
      title: 'Today\'s Bookings',
      value: activeBookings.length,
      icon: Users,
      color: 'bg-purple-500',
    },
    {
      title: 'On-Time Rate',
      value: '95%',
      icon: Clock,
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-full`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
          <div className="space-y-4">
            {activeBookings.slice(0, 5).map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{booking.passengerName}</p>
                  <p className="text-sm text-gray-600">Seat {booking.seatNumber}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${booking.fare}</p>
                  <p className="text-sm text-gray-600">{new Date(booking.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Active Routes</h2>
          <div className="space-y-4">
            {routes.map((route) => (
              <div key={route.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{route.name}</p>
                  <p className="text-sm text-gray-600">{route.startPoint} → {route.endPoint}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${route.fare}</p>
                  <p className="text-sm text-gray-600">{route.schedule[0].departureTime}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;