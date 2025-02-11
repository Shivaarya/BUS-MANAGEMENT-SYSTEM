import React from 'react';
import { useBusContext } from '../context/BusContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Analytics = () => {
  const { bookings, routes } = useBusContext();

  // Revenue by route
  const revenueByRoute = routes.map(route => {
    const routeBookings = bookings.filter(b => b.routeId === route.id && b.status === 'confirmed');
    const revenue = routeBookings.reduce((sum, booking) => sum + booking.fare, 0);
    return { route: route.name, revenue };
  });

  const revenueChartData = {
    labels: revenueByRoute.map(item => item.route),
    datasets: [
      {
        label: 'Revenue by Route',
        data: revenueByRoute.map(item => item.revenue),
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 1,
      },
    ],
  };

  // Bookings status distribution
  const bookingStatus = {
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
  };

  const bookingStatusData = {
    labels: ['Confirmed', 'Cancelled'],
    datasets: [
      {
        data: [bookingStatus.confirmed, bookingStatus.cancelled],
        backgroundColor: [
          'rgba(34, 197, 94, 0.5)',
          'rgba(239, 68, 68, 0.5)',
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(239, 68, 68)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-1">Total Bookings</h3>
          <p className="text-3xl font-bold text-indigo-600">{bookings.length}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-1">Active Routes</h3>
          <p className="text-3xl font-bold text-green-600">{routes.length}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-1">Confirmed Bookings</h3>
          <p className="text-3xl font-bold text-blue-600">{bookingStatus.confirmed}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-1">Cancelled Bookings</h3>
          <p className="text-3xl font-bold text-red-600">{bookingStatus.cancelled}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Revenue by Route</h2>
          <Bar
            data={revenueChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
              },
            }}
          />
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Booking Status Distribution</h2>
          <div className="w-full max-w-md mx-auto">
            <Pie
              data={bookingStatusData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom' as const,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;