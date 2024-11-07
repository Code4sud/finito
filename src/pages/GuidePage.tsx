import React from 'react';
import { AlertTriangle, Waves, Flame, Skull } from 'lucide-react';

interface EmergencyGuide {
  title: string;
  icon: React.ReactNode;
  image: string;
}

const guides: EmergencyGuide[] = [
  {
    title: "Inondation",
    icon: <Waves className="text-blue-500" size={32} />,
    image: "/images/innondation.png",
  },
  {
    title: "Incendie",
    icon: <Flame className="text-red-500" size={32} />,
    image: "/images/Incendie_en_general1.png",
  },
  {
    title: "Accident",
    icon: <Skull className="text-red-500" size={32} />,
    image: "/images/accident.jpg",
  },
];

export default function GuidePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
          <AlertTriangle className="text-amber-500" />
          Guide des catastrophes naturelles
        </h1>

        <div className="grid gap-8">
          {guides.map((guide, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="grid ">
              <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    {guide.icon}
                    <h2 className="text-2xl font-bold text-gray-800">{guide.title}</h2>
                  </div>
                </div>
                <div className="h-64 md:h-auto">
                  <img
                    src={guide.image}
                    alt={guide.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
