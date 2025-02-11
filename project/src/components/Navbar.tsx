import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bus, Route, BarChart3, MapPin, Ticket, Home } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/booking', icon: Ticket, label: 'Book Ticket' },
    { path: '/routes', icon: Route, label: 'Routes' },
    { path: '/fleet', icon: Bus, label: 'Fleet' },
    { path: '/tracking', icon: MapPin, label: 'Live Tracking' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
  ];

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 font-bold text-xl">
            BusManager
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {navItems.map(({ path, icon: Icon, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === path
                      ? 'bg-indigo-700 text-white'
                      : 'text-indigo-100 hover:bg-indigo-500'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;