import React, { useState, useRef, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import IncidentForm from '../components/IncidentForm';
import IncidentList from '../components/IncidentList';
import { Bell, AlertTriangle, Shield, BellRing } from 'lucide-react';
import { Incident } from '../types';

const libraries = ['places'];

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 43.668920436872654, // Latitude de Nice
  lng: 7.213590497382964, // Longitude de Nice
};

export default function AlertPage() {
  const [incidents, setIncidents] = useState<Incident[]>([
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
    },
  ]);
  const [address, setAddress] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>(center);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocationClicked, setIsLocationClicked] = useState(false);  // Flag pour savoir si l'utilisateur a cliqué sur la carte
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

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

  // Cette fonction est appelée lorsque l'utilisateur sélectionne un endroit dans la barre de recherche
  const handlePlaceChanged = () => {
    const searchBox = searchBoxRef.current;
    if (!searchBox) return;

    const places = searchBox.getPlaces();
    if (places.length === 0) {
      setError('Aucune adresse trouvée');
      return;
    }

    const place = places[0];
    if (place.geometry && place.geometry.location) {
      setAddress(place.formatted_address || '');
      setMapCenter(place.geometry.location.toJSON());
      setError(null);
    } else {
      setError('Localisation non trouvée pour cette adresse');
    }
  };

  // Gestion du clic sur la carte pour obtenir les coordonnées
  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    const latLng = e.latLng;
    if (latLng) {
      setLocation({ lat: latLng.lat(), lng: latLng.lng() });
      setAddress(`${latLng.lat().toFixed(6)},${latLng.lng().toFixed(6)}`);
      setIsLocationClicked(true); // On marque que l'utilisateur a cliqué sur la carte
      setError(null);
    }
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <BellRing className="text-amber-500" />
              Signaler un incident
            </h2>
            <IncidentForm
              onSubmit={addIncident}
              location={isLocationClicked ? address : ''}  // Si l'utilisateur a cliqué sur la carte, on passe les coordonnées, sinon le champ reste vide
            />
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
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Carte des incidents</h2>
            <LoadScript googleMapsApiKey="AIzaSyDh7acIuzTV9QoJj2yde2DKKT5_ly2VvGs" libraries={libraries}>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={mapCenter}
                zoom={12}
                onClick={handleMapClick}
              >
                {location && (
                  <Marker position={{ lat: location.lat, lng: location.lng }} />
                )}
              </GoogleMap>
            </LoadScript>

            {/* Affichage des coordonnées sélectionnées */}
            {address && (
              <div className="mt-4 text-lg font-semibold">
                <p>Coordonnées sélectionnées :</p>
                <p>{address}</p>
              </div>
            )}

            {error && <div className="text-red-500 mt-4">{error}</div>}
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
