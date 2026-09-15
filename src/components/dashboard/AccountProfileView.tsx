import React, { useState } from 'react';
import { User, Mail, Calendar, ShieldCheck, Crown, LogOut, CheckCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AccountProfileViewProps {
  onGoToSubscription: () => void;
  onGoToMyLogos: () => void;
}

export const AccountProfileView: React.FC<AccountProfileViewProps> = ({
  onGoToSubscription,
  onGoToMyLogos,
}) => {
  const { user, userProfile, signOutUser, savedLogos } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleSignOut = async () => {
    setLoggingOut(true);
    try {
      await signOutUser();
    } catch (err) {
      console.error('Error signing out:', err);
    } finally {
      setLoggingOut(false);
    }
  };

  const displayName = userProfile
    ? `${userProfile.firstName} ${userProfile.lastName}`.trim() || user?.displayName || 'Membre'
    : user?.displayName || 'Membre';

  const userEmail = userProfile?.email || user?.email || '';
  const createdDate = userProfile?.createdAt
    ? new Date(userProfile.createdAt).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Récemment';

  const isPro = userProfile?.plan === 'pro';

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="pb-6 border-b border-white/[0.08]">
        <h2 className="text-2xl sm:text-3xl font-bold text-white font-outfit">
          Mon Compte & Sécurité
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Gérez vos informations personnelles, votre plan d'accès et vos identifiants.
        </p>
      </div>

      {/* Profile Card */}
      <div className="rounded-3xl bg-[#0B0F1B] border border-white/[0.08] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-500/30 text-amber-300 font-black text-2xl flex items-center justify-center font-outfit shadow-inner">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-outfit">{displayName}</h3>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{userEmail}</span>
              </p>
            </div>
          </div>

          <div>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                isPro
                  ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300'
                  : 'bg-white/[0.06] border border-white/[0.1] text-slate-300'
              }`}
            >
              {isPro ? <Crown className="w-3.5 h-3.5 text-amber-400" /> : <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />}
              <span>{isPro ? 'Membre Plan Pro' : 'Membre Plan Gratuit'}</span>
            </span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <span className="text-slate-400 block mb-1">Date d'inscription</span>
            <span className="text-sm font-semibold text-white flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-400" />
              {createdDate}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <span className="text-slate-400 block mb-1">Logos dans votre galerie</span>
            <span className="text-sm font-semibold text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              {savedLogos.length} logo{savedLogos.length > 1 ? 's' : ''} sauvegardé{savedLogos.length > 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Subscription Section Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Crown className="w-4 h-4 text-amber-400" />
              <span>Votre formule actuelle : {isPro ? 'Plan Pro' : 'Plan Gratuit'}</span>
            </h4>
            <p className="text-xs text-slate-300 mt-1">
              {isPro
                ? 'Vous bénéficiez des exports 4K illimités et des présentations 16:9.'
                : 'Passez au Plan Pro pour débloquer les exports 4K et les fichiers vectoriels SVG.'}
            </p>
          </div>

          <button
            onClick={onGoToSubscription}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer shrink-0"
          >
            {isPro ? 'Gérer mon offre' : 'Découvrir le Plan Pro'}
          </button>
        </div>

        {/* Sign out */}
        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
          <p className="text-xs text-slate-400">
            Toutes vos créations restent protégées après votre déconnexion.
          </p>

          <button
            onClick={handleSignOut}
            disabled={loggingOut}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 font-bold text-xs transition-colors cursor-pointer disabled:opacity-50"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{loggingOut ? 'Déconnexion...' : 'Se déconnecter'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
