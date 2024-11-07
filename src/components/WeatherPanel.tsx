import React, { useState, useEffect } from 'react';
import { Cloud, Thermometer, Wind, Droplets, AlertTriangle } from 'lucide-react';

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string;
}

interface WeatherWarning {
  phenomenon_id: string;
  color_id: number;
  begin_time: string;
  end_time: string;
}

export default function WeatherPanel() {
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 22,
    humidity: 65,
    windSpeed: 12,
    description: "Partiellement nuageux"
  });
  const [weatherWarnings, setWeatherWarnings] = useState<WeatherWarning[]>([]);

  useEffect(() => {
    const apiUrl = 'https://portail-api.meteofrance.fr/public/DPVigilance/v1';
    const apiKey = 'eyJ4NXQiOiJZV0kxTTJZNE1qWTNOemsyTkRZeU5XTTRPV014TXpjek1UVmhNbU14T1RSa09ETXlOVEE0Tnc9PSIsImtpZCI6ImdhdGV3YXlfY2VydGlmaWNhdGVfYWxpYXMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJNYXR0aXNAY2FyYm9uLnN1cGVyIiwiYXBwbGljYXRpb24iOnsib3duZXIiOiJNYXR0aXMiLCJ0aWVyUXVvdGFUeXBlIjpudWxsLCJ0aWVyIjoiVW5saW1pdGVkIiwibmFtZSI6IkRlZmF1bHRBcHBsaWNhdGlvbiIsImlkIjoyMDA0OCwidXVpZCI6IjJjOWEyODRhLWQzNmItNGFmYS1hYTZmLTFmNmFjOTcyNGMyZCJ9LCJpc3MiOiJodHRwczpcL1wvcG9ydGFpbC1hcGkubWV0ZW9mcmFuY2UuZnI6NDQzXC9vYXV0aDJcL3Rva2VuIiwidGllckluZm8iOnsiNjBSZXFQYXJNaW4iOnsidGllclF1b3RhVHlwZSI6InJlcXVlc3RDb3VudCIsImdyYXBoUUxNYXhDb21wbGV4aXR5IjowLCJncmFwaFFMTWF4RGVwdGgiOjAsInN0b3BPblF1b3RhUmVhY2giOnRydWUsInNwaWtlQXJyZXN0TGltaXQiOjAsInNwaWtlQXJyZXN0VW5pdCI6InNlYyJ9fSwia2V5dHlwZSI6IlBST0RVQ1RJT04iLCJzdWJzY3JpYmVkQVBJcyI6W3sic3Vic2NyaWJlclRlbmFudERvbWFpbiI6ImNhcmJvbi5zdXBlciIsIm5hbWUiOiJEb25uZWVzUHVibGlxdWVzVmlnaWxhbmNlIiwiY29udGV4dCI6IlwvcHVibGljXC9EUFZpZ2lsYW5jZVwvdjEiLCJwdWJsaXNoZXIiOiJhZG1pbiIsInZlcnNpb24iOiJ2MSIsInN1YnNjcmlwdGlvblRpZXIiOiI2MFJlcVBhck1pbiJ9XSwiZXhwIjoxODI1NTg2MzU0LCJ0b2tlbl90eXBlIjoiYXBpS2V5IiwiaWF0IjoxNzMwOTEzNTU0LCJqdGkiOiJjOWQ1ZGVlYS00MTQ4LTQzYTgtYjZlMi05ZDQxNmZiNDU0ZjgifQ==.lX-Uv1a8L5TRuPnDRVy_CvPnjAbTkLbk9fGgAebJ2h0s-Qknixu-PbdcRo18WJiZogkOMrbyt0Kfmx2Q9L-IZUEIKckOs4hcSi4CoqPp4Iz41bSdPjbf0Sd809ZwyRvfxKdlEprn2JMXJ9xndBYPxvu6JIX_30LMNQyx-mlOT14TftJzX-4uHEixa2cImfz_HmkGUK2c597Vq9uQ5mY7LUEX-07mZD7Q-DhUVGZ8OcaDSXtp5yc9sPN4xn_Hh3W26F9LzPBWuu1vtIcerH-GxTYcPKAdcIjsODd-iT5wOBUgh_RPRzy375OBcPX4eY_w3-oYFQZhvh8sRe8dIfUKWg==';

    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'accept': '*/*',
        'apikey': apiKey
      }
    })
    .then(response => response.json())    
    .then(data => {
      setWeatherWarnings(data.vigilanceData.warnings);
    })
    .catch(error => {
      console.error('Error fetching weather warnings:', error);
    });
  }, []);

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

        {/* New section for weather warnings */}
        <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
            <AlertTriangle className="text-red-500" size={24} />
            Avertissements météorologiques
          </h3>
          {weatherWarnings.length > 1 ? (
            weatherWarnings.map((warning, index) => (
              <div key={index} className="flex items-start gap-3 bg-white/80 backdrop-blur-sm rounded-lg p-3 mb-2">
                <div className={`text-${warning.color_id > 0 ? 'amber' : 'red'}-500 flex-shrink-0`}>
                  {/* Placeholder for an icon */}
                  <span>⚠️</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">{warning.phenomenon_id}</p>
                  <p className="text-sm text-gray-600">
                    From {warning.begin_time} to {warning.end_time}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No weather warnings available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
