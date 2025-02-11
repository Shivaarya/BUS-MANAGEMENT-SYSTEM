import React from 'react';
import { useBusContext } from '../context/BusContext';
import { Bus, Users, Route as RouteIcon } from 'lucide-react';

const FleetManagement = () => {
  const { buses, routes } = useBusContext();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Fleet Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {buses.map(bus => {
          const assignedRoute = routes.find(r => r.id === bus.assignedRoute);

          return (
            <div key={bus.id} className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <Bus className="w-5 h-5 mr-2" />
                  {bus.number}
                </h2>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  Active
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">Capacity</p>
                    <p className="font-medium">{bus.capacity} seats</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <RouteIcon className="w-5 h-5 text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">Assigned Route</p>
                    <p className="font-medium">{assignedRoute?.name || 'Unassigned'}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600 mb-1">Current Location</p>
                  <p className="font-medium">
                    Lat: {bus.currentLocation.lat.toFixed(4)}, 
                    Lng: {bus.currentLocation.lng.toFixed(4)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FleetManagement;