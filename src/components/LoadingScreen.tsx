import React, { useEffect, useState } from 'react';
import { Sparkles, Shield, Compass, Cpu, Layers } from 'lucide-react';

interface LoadingScreenProps {
  firstName: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ firstName }) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  const stages = [
    { text: 'Analyse du prénom...', icon: Compass, sub: 'Extraction des initiales, symétrie des consonnes et phonétique' },
    { text: 'Recherche du meilleur concept...', icon: Sparkles, sub: 'Exploration monogrammique et équilibre des proportions' },
    { text: 'Construction du symbole...', icon: Shield, sub: 'Tracé vectoriel géométrique et composition spatiale' },
    { text: 'Création de votre identité...', icon: Layers, sub: 'Harmonisation typographique, crénage et accords de couleurs' },
    { text: 'Finalisation...', icon: Cpu, sub: 'Génération des 4 concepts prêts pour déploiement' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStageIndex((prev) => (prev < stages.length - 1 ? prev + 1 : prev));
    }, 1200);

    return () => clearInterval(interval);
  }, [stages.length]);

  const CurrentIcon = stages[currentStageIndex].icon;
  const progressPercent = Math.min(100, Math.round(((currentStageIndex + 1) / stages.length) * 100));

  return (
    <div className="py-20 sm:py-32 flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Center rotating monogram emblem */}
      <div className="relative mb-8">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-amber-500/20 via-amber-500/5 to-transparent border border-amber-500/40 flex items-center justify-center text-amber-300 font-bold font-cinzel text-4xl shadow-[0_0_40px_rgba(245,158,11,0.2)] animate-pulse">
          {(firstName || 'P')[0].toUpperCase()}
        </div>
        <div className="absolute -inset-2 rounded-3xl border border-amber-400/20 animate-spin [animation-duration:8s]" />
      </div>

      {/* Stage Title */}
      <div className="space-y-2 max-w-md mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
          <CurrentIcon className="w-3.5 h-3.5 animate-spin" />
          <span>Étape {currentStageIndex + 1} sur {stages.length}</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-outfit tracking-wide transition-all duration-300">
          {stages[currentStageIndex].text}
        </h3>

        <p className="text-xs sm:text-sm text-slate-400 font-normal">
          {stages[currentStageIndex].sub}
        </p>
      </div>

      {/* Luxury Progress Bar */}
      <div className="w-full max-w-xs mt-8 space-y-2">
        <div className="h-1.5 w-full bg-white/[0.08] rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
          <span>{firstName.toUpperCase()}</span>
          <span>{progressPercent}%</span>
        </div>
      </div>
    </div>
  );
};
