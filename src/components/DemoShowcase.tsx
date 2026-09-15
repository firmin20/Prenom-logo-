import React, { useState } from 'react';
import { DEMO_PRESETS } from '../data/presets';
import { createProceduralConcepts } from '../utils/logoEngine';
import { LogoRenderer } from './LogoRenderer';
import { Sparkles, ArrowRight, Check } from 'lucide-react';
import { LogoConcept } from '../types';

interface DemoShowcaseProps {
  onLoadPreset: (demo: typeof DEMO_PRESETS[0], concepts: LogoConcept[]) => void;
  onOpenDetailModal?: (concept: LogoConcept) => void;
}

export const DemoShowcase: React.FC<DemoShowcaseProps> = ({
  onLoadPreset,
  onOpenDetailModal,
}) => {
  const [selectedDemoIndex, setSelectedDemoIndex] = useState<number>(0);

  const activeDemo = DEMO_PRESETS[selectedDemoIndex];

  // Generate 4 concepts for the selected demo
  const demoConcepts = React.useMemo(() => {
    return createProceduralConcepts(
      activeDemo.name,
      activeDemo.business,
      activeDemo.slogan,
      activeDemo.style,
      activeDemo.colorScheme
    );
  }, [activeDemo]);

  return (
    <section id="exemples-marques" className="py-20 sm:py-28 relative border-t border-white/[0.06] bg-[#090C14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2 block">
              Galerie d'inspiration
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-outfit">
              Exemples d'identités générées
            </h2>
            <p className="mt-3 text-slate-400 text-sm max-w-xl">
              Chaque prénom possède une morphologie unique. Observez comment l'IA sublime différentes typologies de lettres et secteurs d'activité.
            </p>
          </div>

          {/* Demo Pills */}
          <div className="flex flex-wrap gap-2">
            {DEMO_PRESETS.map((demo, idx) => {
              const isSelected = idx === selectedDemoIndex;
              return (
                <button
                  key={demo.name}
                  onClick={() => setSelectedDemoIndex(idx)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                      : 'bg-white/[0.05] hover:bg-white/[0.09] text-slate-300 border border-white/[0.08]'
                  }`}
                >
                  <span>{demo.name}</span>
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Demo Identity Card */}
        <div className="rounded-2xl bg-[#0D121F]/80 border border-white/[0.1] p-6 sm:p-8 backdrop-blur-xl">
          {/* Metadata of active demo */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-white/[0.08] gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-black text-white tracking-wider font-outfit">
                  {activeDemo.name}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                  Style {activeDemo.style}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Activité : <span className="text-slate-200 font-medium">{activeDemo.business}</span> • Slogan : <span className="text-slate-200 font-medium italic">« {activeDemo.slogan} »</span>
              </p>
            </div>

            <button
              onClick={() => onLoadPreset(activeDemo, demoConcepts)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(245,158,11,0.25)] cursor-pointer"
            >
              <Sparkles className="w-4 h-4 fill-slate-950" />
              <span>Charger ces 4 concepts</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 4 Concepts Display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {demoConcepts.map((concept) => (
              <div
                key={concept.id}
                className="group relative rounded-xl bg-[#080B12] border border-white/[0.07] hover:border-amber-500/40 p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-[11px]">
                    <span className="font-mono text-slate-400 px-2 py-0.5 rounded bg-white/[0.05]">
                      Concept 0{concept.conceptNumber}
                    </span>
                    <span className="text-amber-400 font-semibold">
                      {concept.conceptType}
                    </span>
                  </div>

                  <LogoRenderer concept={concept} size="md" />

                  <h4 className="mt-4 text-sm font-bold text-white line-clamp-1">
                    {concept.title}
                  </h4>
                  <p className="mt-1 text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {concept.shortDescription}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                  <button
                    onClick={() => {
                      if (onOpenDetailModal) {
                        onOpenDetailModal(concept);
                      } else {
                        onLoadPreset(activeDemo, demoConcepts);
                      }
                    }}
                    className="text-xs text-amber-300 hover:text-amber-200 font-medium transition-colors cursor-pointer"
                  >
                    Examiner les détails →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
