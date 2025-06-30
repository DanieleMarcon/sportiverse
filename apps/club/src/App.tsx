import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AthletesList from './pages/AthletesList';
import AthleteDetail from './pages/AthleteDetail';
import CalendarView from './pages/CalendarView';
import LineupEditor from './pages/LineupEditor';
import MembershipForm from './pages/MembershipForm';

export default function App() {
  return (
    <BrowserRouter>
      <nav className="bg-gray-800 text-white p-4 flex gap-4">
        <Link to="/" className="hover:underline">Dashboard</Link>
        <Link to="/athletes" className="hover:underline">Atleti</Link>
        <Link to="/calendar" className="hover:underline">Calendario</Link>
        <Link to="/lineup" className="hover:underline">Formazione</Link>
        <Link to="/membership" className="hover:underline">Iscrizioni</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/athletes" element={<AthletesList />} />
        <Route path="/athlete/:id" element={<AthleteDetail />} />
        <Route path="/calendar" element={<CalendarView />} />
        <Route path="/lineup" element={<LineupEditor />} />
        <Route path="/membership" element={<MembershipForm />} />
      </Routes>
    </BrowserRouter>
  );
}
