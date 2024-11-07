import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, BookOpen, Cloud, Thermometer, Wind, Droplets, Phone } from 'lucide-react';
import WeatherPanel from '../components/WeatherPanel';

const EmergencyNumber = ({ number, label }: { number: string; label: string }) => (
  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
    <span className="text-red-800 font-medium">{label}</span>
    <div className="flex items-center gap-2">
      <Phone className="text-red-500" size={20} />
      <span className="text-red-600 font-bold">{number}</span>
    </div>
  </div>
);

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center gap-8">
        {/* Alert Button */}
        <div className="flex flex-col items-center justify-center space-y-6 w-full">
          <button
            onClick={() => navigate('/alert')}
            className="group relative w-64 h-64 rounded-full bg-red-500 hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center justify-center transform hover:scale-105"
          >
            <div className="absolute inset-0 rounded-full border-4 border-red-400 animate-ping"></div>
            <div className="text-white flex flex-col items-center">
              <AlertCircle size={64} className="mb-2" />
              <span className="text-2xl font-bold">ALERTER</span>
            </div>
          </button>

          <button 
            onClick={() => navigate('/guide')}
            className="flex items-center gap-3 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <BookOpen size={24} />
            <span className="text-lg font-semibold">Guide illustré des sinistres</span>
          </button>
        </div>

        {/* Emergency Numbers and Weather */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {/* Emergency Numbers */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
              <Phone className="text-red-500" />
              Numéros d'urgence
            </h2>
            <div className="grid gap-3">
              <EmergencyNumber number="15" label="SAMU" />
              <EmergencyNumber number="17" label="Police Secours" />
              <EmergencyNumber number="18" label="Pompiers" />
              <EmergencyNumber number="112" label="Numéro d'urgence européen" />
              <EmergencyNumber number="114" label="Numéro d'urgence pour les personnes sourdes et malentendantes" />
              <EmergencyNumber number="115" label="SAMU Social" />
              <EmergencyNumber number="119" label="Enfance en danger" />
            </div>
          </div>

          {/* Weather Panel */}
          <WeatherPanel />
        </div>
      </div>
    </main>
  );
}