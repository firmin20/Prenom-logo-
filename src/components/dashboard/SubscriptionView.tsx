import React, { useState } from 'react';
import { Crown, Check, Sparkles, ShieldCheck, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SubscriptionViewProps {
  onStartGenerator: () => void;
}

export const SubscriptionView: React.FC<SubscriptionViewProps> = ({ onStartGenerator }) => {
  const { userProfile, upgradePlan } = useAuth();
  const [upgrading, setUpgrading] = useState(false);
  const [upgradedSuccess, setUpgradedSuccess] = useState(false);

  const currentPlan = userProfile?.plan || 'free';
  const isPro = currentPlan === 'pro';

  const handleTogglePlan = async (targetPlan: 'free' | 'pro') => {
    setUpgrading(true);
    try {
      await upgradePlan(targetPlan);
      setUpgradedSuccess(true);
      setTimeout(() => setUpgradedSuccess(false), 3000);
    } catch (err) {
      console.error('Error toggling plan:', err);
    } finally {
      setUpgrading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block">
          Abonnement & Avantages
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-outfit">
          Gérez votre formule PRÉNOM LOGO AI
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Choisissez le niveau de précision graphique adapté à vos ambitions de marque.
        </p>
      </div>

      {upgradedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Votre formule a été mise à jour avec succès !</span>
        </div>
      )}

      {/* Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        {/* Plan Gratuit */}
        <div
          className={`rounded-3xl p-8 flex flex-col justify-between transition-all ${
            !isPro
              ? 'bg-[#0E1424] border-2 border-white/[0.2] shadow-xl'
              : 'bg-[#090D17] border border-white/[0.08] opacity-80'
          }`}
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white font-outfit">PLAN GRATUIT</h3>
                <p className="text-xs text-slate-400">Découverte & Essai</p>
              </div>
              {!isPro && (
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-white/[0.1] text-white font-bold">
                  Actuel
                </span>
              )}
            </div>

            <div>
              <span className="text-4xl font-extrabold text-white font-outfit">0 €</span>
              <span className="text-xs text-slate-400 ml-2">Pour toujours</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Pour découvrir les concepts générés par l'IA et créer votre première signature de marque.
            </p>

            <div className="space-y-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Génération de 4 concepts par prénom</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Téléchargement format Standard (1080×1080)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Prévisualisation smartphone & web</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Historique privé de vos logos</span>
              </div>
            </div>
          </div>

          <div className="pt-8">
            {!isPro ? (
              <button
                disabled
                className="w-full py-3 rounded-xl bg-white/[0.05] text-slate-400 font-bold text-xs cursor-default"
              >
                Votre formule active
              </button>
            ) : (
              <button
                onClick={() => handleTogglePlan('free')}
                disabled={upgrading}
                className="w-full py-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-slate-300 font-bold text-xs transition-colors cursor-pointer"
              >
                Revenir au Plan Gratuit
              </button>
            )}
          </div>
        </div>

        {/* Plan Pro */}
        <div
          className={`rounded-3xl p-8 flex flex-col justify-between relative transition-all ${
            isPro
              ? 'bg-gradient-to-b from-[#141C30] to-[#0A0E1A] border-2 border-amber-400 shadow-[0_0_40px_rgba(245,158,11,0.25)]'
              : 'bg-gradient-to-b from-[#12192B] to-[#0A0D15] border border-amber-500/40 shadow-xl'
          }`}
        >
          {/* Badge */}
          <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-[10px] tracking-wider uppercase shadow-md">
            {isPro ? 'Formule Active' : 'Recommandé'}
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-amber-300 font-outfit flex items-center gap-2">
                  <Crown className="w-5 h-5 text-amber-400" />
                  <span>PLAN PRO</span>
                </h3>
                <p className="text-xs text-slate-400">Qualité Studio & Agence</p>
              </div>
            </div>

            <div>
              <span className="text-4xl font-extrabold text-white font-outfit">
                {isPro ? 'Actif' : 'Offre Spéciale'}
              </span>
              <span className="text-xs text-amber-300 block mt-1">
                {isPro ? 'Toutes les options débloquées' : 'Accès illimité aux fonctionnalités avancées'}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Pour les entrepreneurs et marques exigeant une haute résolution d'impression et des fichiers vectoriels.
            </p>

            <div className="space-y-3 pt-2 text-xs text-slate-200">
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>Générations et retouches illimitées</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>Export Ultra Haute Résolution 4K (3840×3840)</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>Fichiers vectoriels éditables (SVG)</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>Slides de présentation 16:9 pour Pitch Deck</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>PNG transparents & Kit de marque complet</strong></span>
              </div>
            </div>
          </div>

          <div className="pt-8 space-y-3">
            {!isPro ? (
              <button
                onClick={() => handleTogglePlan('pro')}
                disabled={upgrading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs tracking-wide shadow-lg transition-all cursor-pointer disabled:opacity-50"
              >
                {upgrading ? 'Activation en cours...' : 'Activer le Plan Pro'}
              </button>
            ) : (
              <button
                onClick={onStartGenerator}
                className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Créer un logo en qualité Pro</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
