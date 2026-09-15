import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  User,
  Crown,
  LayoutDashboard,
  ArrowRight,
  Clock,
  CheckCircle2,
  ShieldCheck,
  Plus,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ColorSchemeId, LetterAnalysis, LogoConcept, LogoStyle } from '../../types';
import { GeneratorFlow } from '../GeneratorFlow';
import { LoadingScreen } from '../LoadingScreen';
import { ResultsDashboard } from '../ResultsDashboard';
import { LogoDetailModal } from '../LogoDetailModal';
import { RefinementBox } from '../RefinementBox';
import { BrandKitModal } from '../BrandKitModal';
import { MyLogosView } from './MyLogosView';
import { AccountProfileView } from './AccountProfileView';
import { SubscriptionView } from './SubscriptionView';
import { exportLogoToPNG } from '../../utils/exportEngine';
import { createProceduralConcepts, analyzeNameLetters } from '../../utils/logoEngine';
import { Dashboard3DAccent } from '../three/Dashboard3DAccent';
import { Card3DTilt } from '../three/Card3DTilt';
import { ThreeDName } from '../three/ThreeDName';

interface UserDashboardProps {
  activeTab: 'dashboard' | 'create' | 'my-logos' | 'account' | 'subscription';
  onTabChange: (tab: 'dashboard' | 'create' | 'my-logos' | 'account' | 'subscription') => void;
  welcomeBanner?: {
    type: 'registered' | 'logged_in';
    name: string;
  } | null;
  onDismissBanner?: () => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  activeTab,
  onTabChange,
  welcomeBanner,
  onDismissBanner,
}) => {
  const { user, userProfile, savedLogos, saveLogo } = useAuth();

  // Generator inputs & state
  const [firstName, setFirstName] = useState(userProfile?.firstName || '');
  const [business, setBusiness] = useState('');
  const [slogan, setSlogan] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<LogoStyle>('PREMIUM');
  const [selectedColor, setSelectedColor] = useState<ColorSchemeId>('noir_or');

  const [isLoading, setIsLoading] = useState(false);
  const [concepts, setConcepts] = useState<LogoConcept[]>([]);
  const [letterAnalysis, setLetterAnalysis] = useState<LetterAnalysis | null>(null);

  // Modals
  const [selectedConceptForDetail, setSelectedConceptForDetail] = useState<LogoConcept | null>(null);
  const [selectedConceptForRefine, setSelectedConceptForRefine] = useState<LogoConcept | null>(null);
  const [selectedConceptForBrandKit, setSelectedConceptForBrandKit] = useState<LogoConcept | null>(null);
  const [isRefining, setIsRefining] = useState(false);

  const displayName = userProfile?.firstName || user?.displayName?.split(' ')[0] || 'Créateur';

  // Handle Generation inside connected app
  const handleGenerate = async (data: {
    firstName: string;
    business: string;
    slogan: string;
    style: LogoStyle;
    colorScheme: ColorSchemeId;
  }) => {
    setFirstName(data.firstName);
    setBusiness(data.business);
    setSlogan(data.slogan);
    setSelectedStyle(data.style);
    setSelectedColor(data.colorScheme);

    setIsLoading(true);

    try {
      const response = await fetch('/api/analyze-and-generate-logos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Erreur serveur (${response.status})`);
      }

      const resData = await response.json();

      if (resData.success && resData.concepts) {
        setConcepts(resData.concepts);
        setLetterAnalysis(resData.letterAnalysis);
      } else {
        const localConcepts = createProceduralConcepts(
          data.firstName,
          data.business,
          data.slogan,
          data.style,
          data.colorScheme
        );
        setConcepts(localConcepts);
        setLetterAnalysis(analyzeNameLetters(data.firstName));
      }
    } catch (err: any) {
      console.warn('Network or AI fallback:', err);
      const localConcepts = createProceduralConcepts(
        data.firstName,
        data.business,
        data.slogan,
        data.style,
        data.colorScheme
      );
      setConcepts(localConcepts);
      setLetterAnalysis(analyzeNameLetters(data.firstName));
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2200);
    }
  };

  // Quick standard download
  const handleQuickDownload = async (concept: LogoConcept) => {
    try {
      await exportLogoToPNG(concept, {
        width: 1080,
        height: 1080,
        transparent: false,
      });
    } catch (err) {
      console.error('Download error:', err);
    }
  };

  // Refine concept
  const handleRefineConcept = async (concept: LogoConcept, instruction: string) => {
    setIsRefining(true);
    try {
      const response = await fetch('/api/refine-concept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ concept, instruction }),
      });

      if (!response.ok) {
        throw new Error(`Erreur d'ajustement (${response.status})`);
      }

      const data = await response.json();
      if (data.success && data.concept) {
        setConcepts((prev) => prev.map((c) => (c.id === concept.id ? data.concept : c)));
        setSelectedConceptForRefine(null);
        setSelectedConceptForDetail(data.concept);
      }
    } catch (err) {
      console.warn('Refinement fallback:', err);
      const adjusted: LogoConcept = {
        ...concept,
        title: `${concept.title} (Ajusté)`,
        shortDescription: `${concept.shortDescription} — Adapté selon : « ${instruction} »`,
      };
      setConcepts((prev) => prev.map((c) => (c.id === concept.id ? adjusted : c)));
      setSelectedConceptForRefine(null);
      setSelectedConceptForDetail(adjusted);
    } finally {
      setIsRefining(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Welcome Notification Banner */}
      {welcomeBanner && (
        <div className="relative rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent border border-amber-500/30 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in shadow-xl">
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-white font-outfit flex items-center gap-2">
              {welcomeBanner.type === 'registered' ? (
                <>
                  <span>Bienvenue sur PRÉNOM LOGO AI, {welcomeBanner.name} 🎉</span>
                </>
              ) : (
                <>
                  <span>Bon retour, {welcomeBanner.name} 👋</span>
                </>
              )}
            </h3>
            <p className="text-xs sm:text-sm text-amber-200/90">
              {welcomeBanner.type === 'registered'
                ? 'Votre espace est prêt. Lancez votre première création de marque !'
                : 'Créons quelque chose de mémorable ensemble.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {welcomeBanner.type === 'registered' && (
              <button
                onClick={() => {
                  onTabChange('create');
                  if (onDismissBanner) onDismissBanner();
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>✨ Créer mon premier logo</span>
              </button>
            )}

            {onDismissBanner && (
              <button
                onClick={onDismissBanner}
                className="text-xs text-slate-400 hover:text-white px-2 py-1 cursor-pointer"
              >
                Ignorer
              </button>
            )}
          </div>
        </div>
      )}

      {/* Connected Sub-Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 border-b border-white/[0.08]">
        <button
          onClick={() => onTabChange('dashboard')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'dashboard'
              ? 'bg-amber-500/15 border border-amber-500/30 text-amber-300'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Tableau de bord</span>
        </button>

        <button
          onClick={() => onTabChange('create')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'create'
              ? 'bg-amber-500/15 border border-amber-500/30 text-amber-300'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Générateur de logo</span>
        </button>

        <button
          onClick={() => onTabChange('my-logos')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'my-logos'
              ? 'bg-amber-500/15 border border-amber-500/30 text-amber-300'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Mes logos</span>
          {savedLogos.length > 0 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
              {savedLogos.length}
            </span>
          )}
        </button>

        <button
          onClick={() => onTabChange('subscription')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'subscription'
              ? 'bg-amber-500/15 border border-amber-500/30 text-amber-300'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
          }`}
        >
          <Crown className="w-4 h-4" />
          <span>Abonnement</span>
        </button>

        <button
          onClick={() => onTabChange('account')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'account'
              ? 'bg-amber-500/15 border border-amber-500/30 text-amber-300'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Mon compte</span>
        </button>
      </div>

      {/* ================= TAB: DASHBOARD (Overview) ================= */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8 animate-fade-in">
          {/* Hero Greeting */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-[#0B0F1C] border border-white/[0.08] relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <Dashboard3DAccent />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 font-mono block mb-1">
                  Espace Créateur Sécurisé
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-outfit">
                  Bonjour, {displayName} 👋
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 flex flex-wrap items-center gap-2">
                  <span>Votre identité commence ici.</span>
                  <span className="text-slate-600 hidden sm:inline">•</span>
                  <span>Prêt à transformer <strong className="text-amber-300 font-semibold">{displayName.toUpperCase()}</strong> en identité d'exception ?</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
              {/* Personal 3D Name Object */}
              <div className="w-36 h-20 hidden sm:flex items-center justify-center pointer-events-auto">
                <ThreeDName
                  name={displayName}
                  material="LUXURY"
                  color="noir_or"
                  height={80}
                  scale={0.65}
                  interactive={true}
                  phase="word"
                />
              </div>

              <button
                onClick={() => onTabChange('create')}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm shadow-[0_0_25px_rgba(245,158,11,0.25)] transition-all cursor-pointer shrink-0"
              >
                <Sparkles className="w-4 h-4" />
                <span>✨ Créer un logo</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Cards with 3D Tilt */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card3DTilt>
              <div
                onClick={() => onTabChange('create')}
                className="rounded-2xl bg-[#0D1220] border border-white/[0.08] hover:border-amber-500/30 p-6 transition-all cursor-pointer group h-full"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Plus className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white font-outfit mb-1">Nouveau logo</h3>
                <p className="text-xs text-slate-400">
                  Générez 4 concepts à partir de votre prénom ou d'un nom de projet.
                </p>
              </div>
            </Card3DTilt>

            <Card3DTilt>
              <div
                onClick={() => onTabChange('my-logos')}
                className="rounded-2xl bg-[#0D1220] border border-white/[0.08] hover:border-amber-500/30 p-6 transition-all cursor-pointer group h-full"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Layers className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white font-outfit mb-1">Mes créations</h3>
                  <span className="text-base font-mono font-bold text-white">
                    {savedLogos.length}
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Consultez, réajustez et téléchargez vos logos enregistrés.
                </p>
              </div>
            </Card3DTilt>

            <Card3DTilt>
              <div
                onClick={() => onTabChange('subscription')}
                className="rounded-2xl bg-[#0D1220] border border-white/[0.08] hover:border-amber-500/30 p-6 transition-all cursor-pointer group h-full"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Crown className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white font-outfit mb-1">Abonnement</h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-white/[0.06] text-amber-300 font-bold uppercase">
                    {userProfile?.plan === 'pro' ? 'Plan Pro' : 'Gratuit'}
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  {userProfile?.plan === 'pro'
                    ? 'Exports 4K et vectoriels débloqués.'
                    : 'Passez au Plan Pro pour les exports Ultra 4K.'}
                </p>
              </div>
            </Card3DTilt>
          </div>


          {/* Quick Start / Recent Logos */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white font-outfit">Vos derniers logos</h3>
              {savedLogos.length > 0 && (
                <button
                  onClick={() => onTabChange('my-logos')}
                  className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>Voir tout ({savedLogos.length})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {savedLogos.length === 0 ? (
              <div className="rounded-3xl bg-[#0B0F1B] border border-white/[0.08] p-8 sm:p-12 text-center space-y-5 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="w-full max-w-xs mx-auto">
                  <ThreeDName
                    name={displayName}
                    material="PREMIUM"
                    color="noir_or"
                    height={130}
                    scale={0.75}
                    interactive={true}
                    phase="auto_loop"
                    animationSpeed={0.9}
                  />
                </div>
                <div className="space-y-1.5 max-w-sm mx-auto">
                  <h4 className="text-base sm:text-lg font-bold text-white font-outfit">
                    Votre première identité vous attend.
                  </h4>
                  <p className="text-xs text-slate-400">
                    Générez une identité visuelle complète et vectorielle pour « {displayName} » en quelques secondes.
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => onTabChange('create')}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm shadow-[0_0_25px_rgba(245,158,11,0.25)] transition-all cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>✨ Créer mon premier logo</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedLogos.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedConceptForDetail(item.concept)}
                    className="rounded-2xl bg-[#0D1220] border border-white/[0.08] hover:border-amber-500/30 p-4 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-white font-outfit">
                        {item.concept.brandName}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.06] text-amber-300 font-mono">
                        {item.concept.style}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mb-2">
                      {item.concept.shortDescription}
                    </p>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(item.createdAt).toLocaleDateString('fr-FR')}</span>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= TAB: CREATE (Generator Flow) ================= */}
      {activeTab === 'create' && (
        <div className="space-y-8 animate-fade-in">
          {isLoading ? (
            <LoadingScreen firstName={firstName} />
          ) : concepts.length === 0 ? (
            <GeneratorFlow
              initialName={firstName}
              initialBusiness={business}
              initialSlogan={slogan}
              initialStyle={selectedStyle}
              initialColor={selectedColor}
              onSubmit={handleGenerate}
              isLoading={isLoading}
            />
          ) : (
            <div className="space-y-6">
              {/* Back to Form button */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setConcepts([])}
                  className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] transition-colors cursor-pointer"
                >
                  <span>← Modifier le prénom ou les options</span>
                </button>
              </div>

              <ResultsDashboard
                concepts={concepts}
                letterAnalysis={letterAnalysis || undefined}
                onViewConcept={(c) => setSelectedConceptForDetail(c)}
                onModifyConcept={(c) => setSelectedConceptForRefine(c)}
                onQuickDownload={handleQuickDownload}
                onResetGenerator={() => setConcepts([])}
                onOpenBrandKit={(c) => setSelectedConceptForBrandKit(c)}
              />
            </div>
          )}
        </div>
      )}

      {/* ================= TAB: MY LOGOS ================= */}
      {activeTab === 'my-logos' && (
        <MyLogosView
          onOpenDetailModal={(c) => setSelectedConceptForDetail(c)}
          onOpenBrandKitModal={(c) => setSelectedConceptForBrandKit(c)}
          onRefineLogo={(c) => setSelectedConceptForRefine(c)}
          onStartNewLogo={() => onTabChange('create')}
        />
      )}

      {/* ================= TAB: SUBSCRIPTION ================= */}
      {activeTab === 'subscription' && (
        <SubscriptionView onStartGenerator={() => onTabChange('create')} />
      )}

      {/* ================= TAB: ACCOUNT ================= */}
      {activeTab === 'account' && (
        <AccountProfileView
          onGoToSubscription={() => onTabChange('subscription')}
          onGoToMyLogos={() => onTabChange('my-logos')}
        />
      )}

      {/* ================= MODALS ================= */}
      {selectedConceptForDetail && (
        <LogoDetailModal
          concept={selectedConceptForDetail}
          onClose={() => setSelectedConceptForDetail(null)}
          onOpenRefinement={(c) => {
            setSelectedConceptForDetail(null);
            setSelectedConceptForRefine(c);
          }}
          onOpenBrandKit={(c) => {
            setSelectedConceptForDetail(null);
            setSelectedConceptForBrandKit(c);
          }}
        />
      )}

      {selectedConceptForRefine && (
        <RefinementBox
          concept={selectedConceptForRefine}
          onClose={() => setSelectedConceptForRefine(null)}
          onSubmitRefinement={handleRefineConcept}
          isRefining={isRefining}
        />
      )}

      {selectedConceptForBrandKit && (
        <BrandKitModal
          concept={selectedConceptForBrandKit}
          onClose={() => setSelectedConceptForBrandKit(null)}
        />
      )}
    </div>
  );
};
