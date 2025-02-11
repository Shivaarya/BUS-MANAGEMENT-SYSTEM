import React, { useState } from 'react';
import { useBusContext } from '../context/BusContext';
import { MapPin, Clock, DollarSign } from 'lucide-react';

const RouteManagement = () => {
  const { routes } = useBusContext();
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  const filteredRoutes = routes.filter(route => {
    if (!selectedDay && !selectedTime) return true;
    
    return route.schedule.some(schedule => {
      const dayMatch = !selectedDay || schedule.days.includes(selectedDay);
      const timeMatch = !selectedTime || schedule.departureTime === selectedTime;
      return dayMatch && timeMatch;
    });
  });

  const uniqueTimes = [...new Set(routes.flatMap(route => 
    route.schedule.map(s => s.departureTime)
  ))].sort();

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Route Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Day
          </label>
          <select 
            className="select"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
          >
            <option value="">All Days</option>
            {days.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Time
          </label>
          <select 
            className="select"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          >
            <option value="">All Times</option>
            {uniqueTimes.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredRoutes.map(route => (
          <div key={route.id} className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">{route.name}</h2>
              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                Route #{route.id}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-gray-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-600">From</p>
                  <p className="font-medium">{route.startPoint}</p>
                </div>
              </div>

              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-gray-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-600">To</p>
                  <p className="font-medium">{route.endPoint}</p>
                </div>
              </div>

              <div className="flex items-center">
                <DollarSign className="w-5 h-5 text-gray-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-600">Fare</p>
                  <p className="font-medium">${route.fare}</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium mb-2 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Schedule
              </h3>
              <div className="grid gap-2">
                {route.schedule.map((schedule, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">
                          {schedule.departureTime} - {schedule.arrivalTime}
                        </p>
                        <p className="text-sm text-gray-600">
                          {schedule.days.join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouteManagement;