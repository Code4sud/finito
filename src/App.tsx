import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AlertPage from './pages/AlertPage';
import GuidePage from './pages/GuidePage';
import Header from './components/Header';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/alert" element={<AlertPage />} />
        <Route path="/guide" element={<GuidePage />} />
      </Routes>
    </div>
  );
}