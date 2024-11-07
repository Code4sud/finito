import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bug } from 'lucide-react';

export default function Header() {
  const navigate = useNavigate();
  
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bug className="h-8 w-8 text-amber-500" />
            <h1 className="text-2xl font-bold text-gray-800 cursor-pointer" onClick={() => navigate('/')}>Bee Attentive</h1>
          </div>
          <nav>
            <ul className="flex items-center gap-6">
              <li>
                <button 
                  onClick={() => navigate('/')} 
                  className="text-gray-600 hover:text-amber-500 transition-colors"
                >
                  Accueil
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/alert')} 
                  className="text-gray-600 hover:text-amber-500 transition-colors"
                >
                  Alerter
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/guide')} 
                  className="text-gray-600 hover:text-amber-500 transition-colors"
                >
                  Guide
                </button>
              </li>
              <li>
              <button 
                  onClick={() => navigate('/carte')} 
                  className="text-gray-600 hover:text-amber-500 transition-colors"
                >
                  carte
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}