import React from 'react';
import { AlertTriangle, MapPin, Clock } from 'lucide-react';
import { Incident } from '../types';

interface IncidentListProps {
  incidents: Incident[];
}

export default function IncidentList({ incidents }: IncidentListProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="space-y-4">
      {incidents.map((incident) => (
        <div
          key={incident.id}
          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800">{incident.type}</h3>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(
                incident.severity
              )}`}
            >
              {incident.severity === 'high'
                ? 'Critique'
                : incident.severity === 'medium'
                ? 'Moyen'
                : 'Faible'}
            </span>
          </div>
          
          <p className="text-gray-600 mb-3">{incident.description}</p>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {incident.location}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {formatDate(incident.timestamp)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}