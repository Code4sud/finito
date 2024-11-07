import React from 'react';
import IncidentForm from '../components/IncidentForm';
import IncidentList from '../components/IncidentList';
import { Bell, AlertTriangle, Shield, BellRing } from 'lucide-react';
import { Incident } from '../types';

export default function AlertPage() {
  const [incidents, setIncidents] = React.useState<Incident[]>([
    {
      id: 1,
      type: 'Accident routier',
      location: 'Avenue des Champs-Élysées',
      description: 'Collision entre deux véhicules',
      severity: 'high',
      timestamp: new Date().toISOString(),
    },
    {
      id: 2,
      type: 'Travaux',
      location: 'Rue de Rivoli',
      description: 'Route barrée pour travaux',
      severity: 'medium',
      timestamp: new Date().toISOString(),
    }
  ]);

  const addIncident = (incident: Omit<Incident, 'id' | 'timestamp'>) => {
    setIncidents([
      {
        ...incident,
        id: incidents.length + 1,
        timestamp: new Date().toISOString(),
      },
      ...incidents,
    ]);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <BellRing className="text-amber-500" />
              Signaler un incident
            </h2>
            <IncidentForm onSubmit={addIncident} />
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <AlertTriangle className="text-amber-500" />
              Incidents récents
            </h2>
            <IncidentList incidents={incidents} />
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Statistiques</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg">
                <Bell className="text-amber-500" />
                <div>
                  <p className="font-semibold text-gray-800">{incidents.length}</p>
                  <p className="text-sm text-gray-600">Incidents signalés</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
                <AlertTriangle className="text-red-500" />
                <div>
                  <p className="font-semibold text-gray-800">
                    {incidents.filter(i => i.severity === 'high').length}
                  </p>
                  <p className="text-sm text-gray-600">Incidents critiques</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-500 rounded-xl shadow-lg p-6 text-white">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Shield />
              Conseils de sécurité
            </h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                • Restez vigilant et signalez tout incident suspect
              </li>
              <li className="flex items-start gap-2">
                • Vérifiez les alertes avant de vous déplacer
              </li>
              <li className="flex items-start gap-2">
                • Suivez les instructions des autorités
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}