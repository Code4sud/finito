import React, { useState } from 'react';
import { Cloud, Thermometer, Wind, Droplets } from 'lucide-react';

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string;
}

export default function WeatherPanel() {
  const [weather] = useState<WeatherData>({
    temperature: 22,
    humidity: 65,
    windSpeed: 12,
    description: "Partiellement nuageux"
  });

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Cloud className="text-amber-500" />
        Météo locale
      </h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
          <div className="flex items-center gap-2">
            <Thermometer className="text-blue-500" size={24} />
            <div>
              <p className="text-sm text-gray-600">Température</p>
              <p className="text-xl font-bold text-gray-800">{weather.temperature}°C</p>
            </div>
          </div>
          <p className="text-sm font-medium text-gray-800">{weather.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl">
            <Wind className="text-amber-500" size={20} />
            <div>
              <p className="text-xs text-gray-600">Vent</p>
              <p className="text-lg font-bold text-gray-800">{weather.windSpeed} km/h</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl">
            <Droplets className="text-teal-500" size={20} />
            <div>
              <p className="text-xs text-gray-600">Humidité</p>
              <p className="text-lg font-bold text-gray-800">{weather.humidity}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}