import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BusProvider } from './context/BusContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import TicketBooking from './pages/TicketBooking';
import RouteManagement from './pages/RouteManagement';
import FleetManagement from './pages/FleetManagement';
import LiveTracking from './pages/LiveTracking';
import Analytics from './pages/Analytics';

function App() {
  return (
    <BusProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/booking" element={<TicketBooking />} />
              <Route path="/routes" element={<RouteManagement />} />
              <Route path="/fleet" element={<FleetManagement />} />
              <Route path="/tracking" element={<LiveTracking />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </main>
        </div>
      </Router>
    </BusProvider>
  );
}

export default App;