import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, AlertTriangle } from 'lucide-react';
import { Incident } from '../types';

interface IncidentFormProps {
  onSubmit: (incident: Omit<Incident, 'id' | 'timestamp'>) => void;
  location: string;  // Localisation automatiquement remplie si l'utilisateur a cliqué sur la carte
}

const IncidentForm: React.FC<IncidentFormProps> = ({ onSubmit, location }) => {
  const [formData, setFormData] = useState({
    type: '',
    location: location, // Initialisation avec la localisation donnée
    description: '',
    severity: 'medium',
  });

  const navigate = useNavigate();

  useEffect(() => {
    setFormData((prev) => ({ ...prev, location }));
  }, [location]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.type || !formData.description || !formData.severity || !formData.location) {
      alert('Tous les champs sont obligatoires');
      return;
    }

    onSubmit(formData);
    // Réinitialisation du formulaire après soumission
    setFormData({
      type: '',
      location: '',
      description: '',
      severity: 'medium',
    });

    setTimeout(() => {
      navigate('/guide');
    }, 3000)

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
            <option value="Incident de sécurité publique">Incident de sécurité publique</option>
            <option value="Accident industriel">Accident industriel</option>
            <option value="Événement météo">Événement météo</option>
            <option value="Vandalisme ou graffitis">Vandalisme ou graffitis</option>
            <option value="Problème de stationnement">Problème de stationnement</option>
            <option value="Panne d’électricité">Panne d’électricité</option>
            <option value="Problème de qualité de l’air">Problème de qualité de l’air</option>
            <option value="Manifestation ou grève">Manifestation ou grève</option>
            <option value="Incident lors d’événements publics">Incident lors d’événements publics</option>
            <option value="Problème de collecte des déchets">Problème de collecte des déchets</option>
            <option value="Problème d’approvisionnement en eau">Problème d’approvisionnement en eau</option>
            <option value="Incident lié aux infrastructures">Incident lié aux infrastructures</option>
            <option value="Panne de signalisation routière">Panne de signalisation routière</option>
            <option value="Blocage de circulation">Blocage de circulation</option>
            <option value="Panne de réseau téléphonique ou Internet">Panne de réseau téléphonique ou Internet</option>
            <option value="Autre">Autre</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Niveau de gravité
          </label>
          <select
            value={formData.severity}
            onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
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
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
          rows={3}
          placeholder="Décrivez l'incident..."
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-amber-500 text-white py-2 px-4 rounded-lg hover:bg-amber-600 transition-colors flex items-center justify-center gap-2">
        <AlertTriangle className="h-5 w-5" />
        Signaler l'incident
      </button>
      <div className="flex justify-center items-center">
          <p className="text-gray-1000 flex items-center gap-3">
          Vous serez redirigé sur la page de guide suite à la soumission du formulaire.
          </p>
        </div>
    </form>
  );
};

export default IncidentForm;
