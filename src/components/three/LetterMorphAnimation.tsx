import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Play, Pause } from 'lucide-react';

interface TransformationSample {
  name: string;
  l1: string;
  l2: string;
  style: string;
  tagline: string;
}

const SAMPLES: TransformationSample[] = [
  { name: 'FIRMIN', l1: 'F', l2: 'FI', style: 'PREMIUM', tagline: 'Monogramme d\'autorité & Symétrie dorée' },
  { name: 'NOVA', l1: 'N', l2: 'NO', style: 'TECHNOLOGY', tagline: 'Angle cinétique & Fusion futuriste' },
  { name: 'ELYA', l1: 'E', l2: 'EL', style: 'LUXURY', tagline: 'Courbes minimalistes & Cachet haute-couture' },
  { name: 'MAVEN', l1: 'M', l2: 'MA', style: 'BUSINESS', tagline: 'Tracé architectural & Piliers institutionnels' },
];

export const LetterMorphAnimation: React.FC = () => {
  const [sampleIndex, setSampleIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0); // 0: Letter, 1: Digram, 2: Structure, 3: Logo Symbol
  const [isPlaying, setIsPlaying] = useState(true);

  const activeSample = SAMPLES[sampleIndex];

  // Auto progression
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev === 3) {
          // Change sample after completing full cycle
          setSampleIndex((s) => (s + 1) % SAMPLES.length);
          return 0;
        }
        return prev + 1;
      });
    }, 2800);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const stepLabels = [
    { label: '01. Initiale', desc: 'Décomposition du caractère' },
    { label: '02. Rythme', desc: 'Équilibre phonétique' },
    { label: '03. Géométrie', desc: 'Structure vectorielle' },
    { label: '04. Logo Final', desc: 'Identité de marque' },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto rounded-3xl bg-[#090D17]/90 border border-white/[0.1] p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header bar */}
      <div className="flex items-center justify-between pb-5 border-b border-white/[0.08]">
        <div className="space-y-0.5">
          <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400 font-mono">
            Transformation Cinématique
          </span>
          <h4 className="text-sm font-bold text-white font-outfit">
            Votre prénom devient une identité visuelle.
          </h4>
        </div>

        {/* Sample switcher & Play/Pause */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-white/[0.05] p-1 rounded-xl border border-white/[0.08]">
            {SAMPLES.map((s, idx) => (
              <button
                key={s.name}
                onClick={() => {
                  setSampleIndex(idx);
                  setStepIndex(0);
                }}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                  sampleIndex === idx
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'Mettre en pause' : 'Lecture automatique'}
            className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Center Dynamic Stage */}
      <div className="py-8 sm:py-10 flex flex-col items-center justify-center relative min-h-[220px]">
        {/* Stage visual container */}
        <div className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-2xl bg-gradient-to-br from-[#0F1422] to-[#070910] border border-amber-500/25 flex items-center justify-center shadow-[0_10px_35px_rgba(0,0,0,0.5)] overflow-hidden">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:16px_16px]" />

          {/* STEP 0: Single Initial */}
          {stepIndex === 0 && (
            <div className="relative flex flex-col items-center justify-center animate-fade-in">
              <span className="text-6xl sm:text-7xl font-extrabold text-white font-cinzel tracking-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                {activeSample.l1}
              </span>
              <span className="text-[10px] font-mono text-slate-400 mt-2 tracking-widest uppercase">
                Lettre source
              </span>
            </div>
          )}

          {/* STEP 1: Digram / Sound harmony */}
          {stepIndex === 1 && (
            <div className="relative flex flex-col items-center justify-center animate-fade-in">
              <span className="text-5xl sm:text-6xl font-black text-amber-200 font-cinzel tracking-wider drop-shadow-[0_0_25px_rgba(245,158,11,0.25)]">
                {activeSample.l2}
              </span>
              <div className="w-8 h-0.5 bg-amber-400/60 rounded-full mt-2" />
              <span className="text-[10px] font-mono text-amber-300/80 mt-1 tracking-widest uppercase">
                Ancrage optique
              </span>
            </div>
          )}

          {/* STEP 2: Geometric Monogram Framework */}
          {stepIndex === 2 && (
            <div className="relative w-full h-full flex items-center justify-center animate-fade-in p-4">
              <svg className="w-28 h-28 text-amber-400" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                <polygon points="50,15 82,32 82,68 50,85 18,68 18,32" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                <line x1="18" y1="50" x2="82" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                <line x1="50" y1="15" x2="50" y2="85" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                <text x="50" y="58" textAnchor="middle" fill="#ffffff" fontSize="28" fontFamily="Cinzel" fontWeight="bold">
                  {activeSample.l1}
                </text>
              </svg>
              <span className="absolute bottom-2 text-[9px] font-mono text-amber-400 tracking-widest uppercase">
                Matrice géométrique
              </span>
            </div>
          )}

          {/* STEP 3: Finished Professional Logo Symbol */}
          {stepIndex === 3 && (
            <div className="relative w-full h-full flex flex-col items-center justify-center animate-fade-in p-4">
              <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-tr from-amber-500/20 via-amber-400/10 to-transparent border border-amber-400/50 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.35)]">
                <span className="text-4xl font-extrabold text-white font-cinzel tracking-wider">
                  {activeSample.l1}
                </span>
                <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-amber-400 rounded-full shadow-[0_0_8px_#f59e0b]" />
              </div>
              <span className="text-[11px] font-bold text-white font-outfit mt-2 tracking-wide">
                {activeSample.name}
              </span>
              <span className="text-[9px] font-mono text-amber-300/90 tracking-widest uppercase">
                {activeSample.style} EDITION
              </span>
            </div>
          )}
        </div>

        {/* Current explanation pill */}
        <div className="mt-4 text-center">
          <p className="text-xs text-slate-300 font-medium max-w-sm">
            {stepIndex === 0 && `Extraction de l'initiale « ${activeSample.l1} » du prénom ${activeSample.name}.`}
            {stepIndex === 1 && `Assemblage structurel des premières lettres pour définir le crénage.`}
            {stepIndex === 2 && `Création du squelette géométrique, équilibre des axes et proportions d'orfèvre.`}
            {stepIndex === 3 && activeSample.tagline}
          </p>
        </div>
      </div>

      {/* Step Indicators */}
      <div className="grid grid-cols-4 gap-2 pt-4 border-t border-white/[0.08]">
        {stepLabels.map((st, idx) => (
          <button
            key={idx}
            onClick={() => {
              setStepIndex(idx);
              setIsPlaying(false);
            }}
            className={`p-2.5 rounded-xl text-left transition-all cursor-pointer ${
              stepIndex === idx
                ? 'bg-amber-500/15 border border-amber-500/40 text-amber-300 shadow-sm'
                : 'bg-white/[0.02] border border-white/[0.04] text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="text-[11px] font-bold font-mono truncate">{st.label}</div>
            <div className="text-[9px] text-slate-400 truncate hidden sm:block">{st.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
