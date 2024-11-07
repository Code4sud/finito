import React from 'react';
import { AlertTriangle, Waves, Wind, Flame, Cloud, Zap } from 'lucide-react';

interface EmergencyGuide {
  title: string;
  icon: React.ReactNode;
  image: string;
  steps: string[];
}

const guides: EmergencyGuide[] = [
  {
    title: "Inondation",
    icon: <Waves className="text-blue-500" size={32} />,
    image: "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&q=80&w=800",
    steps: [
      "Coupez l'électricité et le gaz",
      "Montez aux étages supérieurs",
      "Ne vous engagez pas sur une route inondée",
      "Écoutez la radio pour suivre l'évolution de la situation",
      "Préparez-vous à évacuer si les autorités le demandent"
    ]
  },
  {
    title: "Tempête",
    icon: <Wind className="text-gray-500" size={32} />,
    image: "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?auto=format&fit=crop&q=80&w=800",
    steps: [
      "Mettez-vous à l'abri dans un bâtiment solide",
      "Fermez portes, fenêtres et volets",
      "Débranchez les appareils électriques",
      "Évitez de vous déplacer",
      "Éloignez-vous des arbres et des lignes électriques"
    ]
  },
  {
    title: "Incendie",
    icon: <Flame className="text-red-500" size={32} />,
    image: "https://images.unsplash.com/photo-1629774631753-88f827bf6447?auto=format&fit=crop&q=80&w=800",
    steps: [
      "Évacuez immédiatement les lieux",
      "Appelez les pompiers (18 ou 112)",
      "Fermez les portes derrière vous",
      "Ne prenez pas l'ascenseur",
      "Baissez-vous pour éviter les fumées"
    ]
  },
  {
    title: "Avalanche",
    icon: <Cloud className="text-blue-300" size={32} />,
    image: "https://images.unsplash.com/photo-1551796880-ddd03f861ae4?auto=format&fit=crop&q=80&w=800",
    steps: [
      "Tentez de fuir latéralement",
      "Débarrassez-vous des bâtons et skis",
      "Fermez la bouche",
      "Protégez vos voies respiratoires",
      "Essayez de créer une poche d'air devant votre visage"
    ]
  },
  {
    title: "Orage",
    icon: <Zap className="text-yellow-500" size={32} />,
    image: "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?auto=format&fit=crop&q=80&w=800",
    steps: [
      "Évitez les activités extérieures",
      "Ne vous abritez pas sous un arbre",
      "Éloignez-vous des plans d'eau",
      "Débranchez les appareils électriques",
      "Évitez d'utiliser le téléphone fixe"
    ]
  }
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
              <div className="grid md:grid-cols-2">
                <div className="h-64 md:h-auto">
                  <img
                    src={guide.image}
                    alt={guide.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    {guide.icon}
                    <h2 className="text-2xl font-bold text-gray-800">{guide.title}</h2>
                  </div>
                  <div className="space-y-3">
                    {guide.steps.map((step, stepIndex) => (
                      <p key={stepIndex} className="flex items-start gap-2 text-gray-600">
                        <span className="font-bold text-amber-500">{stepIndex + 1}.</span>
                        {step}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}