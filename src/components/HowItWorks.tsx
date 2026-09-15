import React from 'react';
import { Type, Palette, Sparkles, UserCheck, Briefcase, Feather } from 'lucide-react';

interface HowItWorksProps {
  onStartGenerator: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartGenerator }) => {
  const steps = [
    {
      number: '01',
      title: 'Entrez votre prénom',
      description:
        "Renseignez votre prénom, ainsi que votre activité ou slogan si vous le souhaitez. L'IA décompose immédiatement les initiales, le rythme consonantique et l'équilibre visuel des lettres.",
      icon: Type,
      accent: 'from-amber-500/20 to-amber-500/5',
      border: 'border-amber-500/30',
      iconColor: 'text-amber-400',
    },
    {
      number: '02',
      title: 'Choisissez votre style',
      description:
        "Sélectionnez l'univers de votre marque parmi 8 styles professionnels (Minimal, Premium, Luxury, Modern, Tech, etc.) et définissez votre palette chromatique ou laissez l'IA choisir.",
      icon: Palette,
      accent: 'from-sky-500/20 to-sky-500/5',
      border: 'border-sky-500/30',
      iconColor: 'text-sky-400',
    },
    {
      number: '03',
      title: "Laissez l'IA créer votre identité",
      description:
        "L'algorithme de branding génère 4 concepts radicalement différents : monogramme, symbole abstrait, wordmark typographique et blason fusion. Téléchargez en haute définition avec ou sans fond.",
      icon: Sparkles,
      accent: 'from-emerald-500/20 to-emerald-500/5',
      border: 'border-emerald-500/30',
      iconColor: 'text-emerald-400',
    },
  ];

  const targetAudiences = [
    {
      title: 'Entrepreneurs & Fondateurs',
      description: 'Donnez à votre projet ou agence une crédibilité immédiate avec une identité statutaire et percutante.',
      icon: Briefcase,
    },
    {
      title: 'Créateurs & Indépendants',
      description: 'Développez un personal branding d’exception pour vos profils sociaux, newsletters et portfolios.',
      icon: Feather,
    },
    {
      title: 'Marques Personnelles',
      description: 'Affirmez votre nom comme une signature unique pour vos documents, cartes de visite et conférences.',
      icon: UserCheck,
    },
  ];

  return (
    <section id="comment-ca-marche" className="py-20 sm:py-28 relative border-t border-white/[0.06] bg-[#07090F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2 block">
            Processus en 3 étapes
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-outfit">
            Comment ça marche
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            De la décomposition géométrique de vos lettres jusqu'au logo prêt à l'emploi pour tous vos supports.
          </p>
        </div>

        {/* 3 Steps Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative rounded-2xl bg-gradient-to-b from-[#111827]/60 to-[#0A0D15]/80 border border-white/[0.08] p-8 flex flex-col justify-between hover:border-white/[0.18] transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.accent} border ${step.border} flex items-center justify-center ${step.iconColor}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black text-slate-600 font-mono group-hover:text-slate-400 transition-colors">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 font-outfit">
                    {step.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center gap-2 text-xs text-slate-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Conçu selon les standards d’agence
                </div>
              </div>
            );
          })}
        </div>

        {/* "Pensé pour les créateurs, entrepreneurs et marques personnelles." */}
        <div className="mt-20 sm:mt-28 pt-16 border-t border-white/[0.08]">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-outfit">
              Pensé pour les créateurs, entrepreneurs et marques personnelles.
            </h3>
            <p className="mt-3 text-slate-400 text-sm">
              Un logo conçu pour vivre aussi bien en avatar WhatsApp de 32 pixels qu’en enseigne ou carte de visite haut de gamme.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {targetAudiences.map((item, index) => {
              const ItemIcon = item.icon;
              return (
                <div
                  key={index}
                  className="rounded-xl bg-[#0C101A]/60 border border-white/[0.06] p-6 hover:bg-[#0E1422]/70 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-center justify-center mb-4">
                    <ItemIcon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Quick CTA */}
          <div className="mt-12 text-center">
            <button
              onClick={onStartGenerator}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-semibold text-sm transition-all duration-200 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Générer le logo de mon prénom</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
