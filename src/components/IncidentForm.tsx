import React, { useState } from 'react';
import { MapPin, AlertTriangle } from 'lucide-react';
import { Incident } from '../types';

interface IncidentFormProps {
  onSubmit: (incident: Omit<Incident, 'id' | 'timestamp'>) => void;
}

export default function IncidentForm({ onSubmit }: IncidentFormProps) {
  const [formData, setFormData] = useState({
    type: '',
    location: '',
    description: '',
    severity: 'medium',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      type: '',
      location: '',
      description: '',
      severity: 'medium',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type d'incident
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
            required
          >
            <option value="">Sélectionnez un type</option>
            <option value="Accident routier">Accident routier</option>
            <option value="Incendie">Incendie</option>
            <option value="Inondation urbaine">Inondation urbaine</option>
            <option value="Incident de sécurité publique">
              Incident de sécurité publique
            </option>
            <option value="Accident industriel">Accident industriel</option>
            <option value="Événement météo">Événement météo</option>
            <option value="Vandalisme ou graffitis">
              Vandalisme ou graffitis
            </option>
            <option value="Problème de stationnement">
              Problème de stationnement
            </option>
            <option value="Panne d’électricité">Panne d’électricité</option>
            <option value="Accident routier">
              Problème de qualité de l’air{' '}
            </option>
            <option value="Autre">Autre</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Niveau de gravité
          </label>
          <select
            value={formData.severity}
            onChange={(e) =>
              setFormData({ ...formData, severity: e.target.value })
            }
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
            required
          >
            <option value="low">Faible</option>
            <option value="medium">Moyen</option>
            <option value="high">Élevé</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Localisation
        </label>
        <div className="relative">
          <input
            type="text"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 pl-10"
            placeholder="Adresse de l'incident"
            required
          />
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
          rows={3}
          placeholder="Décrivez l'incident..."
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-amber-500 text-white py-2 px-4 rounded-lg hover:bg-amber-600 transition-colors flex items-center justify-center gap-2"
      >
        <AlertTriangle className="h-5 w-5" />
        Signaler l'incident
      </button>
    </form>
  );
}
