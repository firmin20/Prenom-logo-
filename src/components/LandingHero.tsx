import React from 'react';
import { Sparkles, ArrowRight, Layers, Award, CheckCircle2 } from 'lucide-react';
import { LogoRenderer } from './LogoRenderer';
import { DEMO_PRESETS } from '../data/presets';
import { createProceduralConcepts } from '../utils/logoEngine';

interface LandingHeroProps {
  onStartGenerator: () => void;
  onScrollToHowItWorks: () => void;
  onSelectPreset: (presetName: string) => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onStartGenerator,
  onScrollToHowItWorks,
  onSelectPreset,
}) => {
  // Pre-render a hero preview of Firmin concept
  const heroConcepts = React.useMemo(() => {
    return createProceduralConcepts('FIRMIN', 'Digital Studio', 'Créons votre avenir numérique', 'PREMIUM', 'noir_or');
  }, []);

  return (
    <section className="relative pt-8 pb-16 sm:pt-14 sm:pb-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[350px] sm:h-[450px] bg-gradient-to-tr from-amber-600/10 via-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6 sm:space-y-8">
          {/* Top subtle badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-medium text-amber-300 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>Architecture de Marque IA de Nouvelle Génération</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] font-outfit">
            Votre prénom peut <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-white via-amber-100 to-amber-400 bg-clip-text text-transparent">
              devenir une marque.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            Transformez simplement votre prénom en un logo professionnel, moderne et mémorable grâce à l'IA.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              id="hero-create-btn"
              onClick={onStartGenerator}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-base tracking-wide shadow-[0_0_35px_rgba(245,158,11,0.3)] hover:shadow-[0_0_45px_rgba(245,158,11,0.5)] transition-all duration-200 active:scale-[0.98] cursor-pointer"
            >
              <Sparkles className="w-5 h-5 fill-slate-950" />
              <span>✨ Créer mon logo</span>
            </button>

            <button
              id="hero-learn-btn"
              onClick={onScrollToHowItWorks}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-slate-200 font-semibold text-sm transition-all duration-200 cursor-pointer"
            >
              <span>Découvrir comment ça marche</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Value props checklist */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm text-slate-400 font-medium">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Analyse typographique avancée
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              4 concepts distincts
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Export HD & PNG transparent
            </span>
          </div>
        </div>

        {/* Visual Brand Identity Showcase Card */}
        <div className="mt-14 sm:mt-20 max-w-5xl mx-auto">
          <div className="relative rounded-2xl bg-gradient-to-b from-[#111827]/80 to-[#0B0F17]/90 border border-white/[0.1] p-4 sm:p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            {/* Header bar of card */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-6 border-b border-white/[0.08] gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-300">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-white text-sm font-semibold tracking-wide">
                    Exemple d'Analyse d'Identité : FIRMIN
                  </h2>
                  <p className="text-xs text-slate-400">
                    Structure de lettre F → Monogramme statutaire & Géométrie équilibrée
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Tester un autre prénom :</span>
                <div className="flex flex-wrap gap-1.5">
                  {DEMO_PRESETS.slice(0, 3).map((demo) => (
                    <button
                      key={demo.name}
                      onClick={() => onSelectPreset(demo.name)}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-white/[0.05] hover:bg-amber-500/20 hover:text-amber-300 text-slate-300 border border-white/[0.06] transition-colors cursor-pointer"
                    >
                      {demo.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Showcase Grid of the 4 concepts generated for Firmin */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {heroConcepts.map((concept, index) => (
                <div
                  key={concept.id}
                  className="group relative rounded-xl bg-[#090D15]/80 border border-white/[0.06] hover:border-amber-500/30 p-4 transition-all duration-300 hover:-translate-y-1 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-3 text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-white/[0.06] text-slate-300 font-mono">
                      Concept 0{index + 1}
                    </span>
                    <span className="text-amber-400/90 font-medium">
                      {concept.conceptType}
                    </span>
                  </div>

                  <LogoRenderer concept={concept} size="sm" />

                  <div className="mt-3 pt-3 border-t border-white/[0.06]">
                    <p className="text-xs text-slate-400 font-normal line-clamp-2">
                      {concept.shortDescription}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom note */}
            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                Chaque prénom bénéficie d'une analyse géométrique sur-mesure
              </span>
              <button
                onClick={onStartGenerator}
                className="text-amber-300 hover:text-amber-200 font-medium transition-colors cursor-pointer"
              >
                Créer avec votre prénom →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
