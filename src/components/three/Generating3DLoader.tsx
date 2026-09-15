import React, { useEffect, useState } from 'react';
import { ThreeDName } from './ThreeDName';
import { Compass, Sparkles, Shield, Layers, Cpu, CheckCircle2 } from 'lucide-react';

interface Generating3DLoaderProps {
  firstName: string;
}

export const Generating3DLoader: React.FC<Generating3DLoaderProps> = ({ firstName }) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  const stages = [
    {
      text: 'Analyse du prénom...',
      phase: 'word' as const,
      icon: Compass,
      sub: `Extraction de l'empreinte phonétique et des ancrages géométriques pour « ${(firstName || 'FIRMIN').toUpperCase()} »`,
    },
    {
      text: 'Recherche d\'une direction créative...',
      phase: 'separate' as const,
      icon: Sparkles,
      sub: 'Exploration monogrammique et décomposition vectorielle en éléments distincts',
    },
    {
      text: 'Construction du symbole...',
      phase: 'converge' as const,
      icon: Shield,
      sub: 'Fusion et équilibre spatial des initiales majeures sous ratio d\'or',
    },
    {
      text: 'Création de votre identité...',
      phase: 'monogram' as const,
      icon: Layers,
      sub: 'Harmonisation typographique, contrastes optiques et finitions de surface',
    },
    {
      text: 'Finalisation...',
      phase: 'symbol' as const,
      icon: Cpu,
      sub: 'Génération de 4 concepts professionnels haute fidélité et pack de marque',
    },
  ];

  // Stage progression timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStageIndex((prev) => (prev < stages.length - 1 ? prev + 1 : prev));
    }, 1500);

    return () => clearInterval(interval);
  }, [stages.length]);

  const CurrentIcon = stages[currentStageIndex].icon;
  const progressPercent = Math.min(100, Math.round(((currentStageIndex + 1) / stages.length) * 100));

  return (
    <div className="py-10 sm:py-16 flex flex-col items-center justify-center text-center px-4 relative overflow-hidden max-w-4xl mx-auto">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-tr from-amber-600/15 via-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Lab Header Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-mono font-bold tracking-wider uppercase mb-3">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
        <span>Laboratoire de Synthèse 3D & Vectorielle</span>
      </div>

      {/* Central 3D Dynamic Name Metaphor */}
      <div className="w-full relative my-2 flex items-center justify-center">
        <ThreeDName
          name={firstName || 'FIRMIN'}
          material="LUXURY"
          color="noir_or"
          height={280}
          phase="auto_loop"
          animationSpeed={1.2}
          showPhaseIndicator={true}
        />
      </div>

      {/* Stage Description & Telemetry */}
      <div className="space-y-3 max-w-lg mx-auto mt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] text-amber-300 text-xs font-semibold">
          <CurrentIcon className="w-3.5 h-3.5 animate-spin" />
          <span>Étape {currentStageIndex + 1} sur {stages.length}</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-outfit tracking-wide transition-all duration-300">
          {stages[currentStageIndex].text}
        </h3>

        <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed">
          {stages[currentStageIndex].sub}
        </p>
      </div>

      {/* Luxury Progress Bar */}
      <div className="w-full max-w-md mt-6 space-y-2">
        <div className="h-2 w-full bg-white/[0.08] rounded-full overflow-hidden p-0.5 border border-white/[0.06]">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-200 rounded-full transition-all duration-500 ease-out shadow-[0_0_15px_rgba(245,158,11,0.5)]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-[11px] text-slate-400 font-mono">
          <span className="text-amber-400 font-bold">{(firstName || 'FIRMIN').toUpperCase()}</span>
          <span className="flex items-center gap-1">
            {progressPercent === 100 ? (
              <span className="text-emerald-400 flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-3 h-3" />
                <span>Prêt</span>
              </span>
            ) : (
              <span>{progressPercent}%</span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
