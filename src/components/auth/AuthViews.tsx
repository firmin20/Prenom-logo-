import React, { useState } from 'react';
import { Sparkles, Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle2, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Dashboard3DAccent } from '../three/Dashboard3DAccent';

interface AuthViewProps {
  initialMode?: 'login' | 'register' | 'forgot';
  noticeMessage?: string | null;
  onSuccess: (mode: 'registered' | 'logged_in') => void;
  onClose?: () => void;
  onSwitchMode: (mode: 'login' | 'register' | 'forgot') => void;
}

export const AuthModalOrView: React.FC<AuthViewProps> = ({
  initialMode = 'register',
  noticeMessage,
  onSuccess,
  onClose,
  onSwitchMode,
}) => {
  const { signInWithEmail, signUpWithEmail, signInGoogle, sendPasswordReset, authError, clearAuthError } =
    useAuth();

  // Form states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [resetSuccessMessage, setResetSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearAuthError();

    if (initialMode === 'register') {
      if (!firstName.trim()) {
        setLocalError('Veuillez renseigner votre prénom.');
        return;
      }
      if (!email.trim() || !password) {
        setLocalError('Veuillez renseigner tous les champs obligatoires.');
        return;
      }
      if (password.length < 6) {
        setLocalError('Le mot de passe doit comporter au moins 6 caractères.');
        return;
      }
      if (password !== confirmPassword) {
        setLocalError('Les mots de passe ne correspondent pas.');
        return;
      }

      setLoading(true);
      try {
        await signUpWithEmail(firstName.trim(), lastName.trim(), email.trim(), password);
        onSuccess('registered');
      } catch (err: any) {
        setLocalError(err.message || "Erreur lors de l'inscription");
      } finally {
        setLoading(false);
      }
    } else if (initialMode === 'login') {
      if (!email.trim() || !password) {
        setLocalError('Veuillez renseigner votre e-mail et votre mot de passe.');
        return;
      }

      setLoading(true);
      try {
        await signInWithEmail(email.trim(), password);
        onSuccess('logged_in');
      } catch (err: any) {
        setLocalError(err.message || 'Identifiants invalides');
      } finally {
        setLoading(false);
      }
    } else if (initialMode === 'forgot') {
      if (!email.trim()) {
        setLocalError('Veuillez renseigner votre adresse e-mail.');
        return;
      }

      setLoading(true);
      try {
        await sendPasswordReset(email.trim());
        setResetSuccessMessage('Un lien de réinitialisation vous a été envoyé par e-mail.');
      } catch (err: any) {
        setLocalError(err.message || 'Erreur lors de la réinitialisation');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGoogleAuth = async () => {
    setLocalError(null);
    clearAuthError();
    setLoading(true);
    try {
      await signInGoogle();
      onSuccess('logged_in');
    } catch (err: any) {
      const msg = err?.message || 'Connexion avec Google interrompue. Veuillez réessayer ou utiliser l\'e-mail ci-dessous.';
      setLocalError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-md my-auto max-h-[95vh] rounded-3xl bg-[#090D17] border border-white/[0.12] shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-y-auto text-slate-200 flex flex-col">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-6 pt-5 sm:pt-6 pb-1 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300 font-bold font-cinzel text-sm relative overflow-hidden">
              <Dashboard3DAccent size={32} />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              PRÉNOM LOGO AI
            </span>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Notice Message if redirected from restricted page */}
        {noticeMessage && (
          <div className="mx-5 sm:mx-6 mt-3 px-3.5 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
            <span>{noticeMessage}</span>
          </div>
        )}

        {/* Error notification */}
        {(localError || authError) && (
          <div className="mx-5 sm:mx-6 mt-3 px-3.5 py-2.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-200 text-xs flex flex-col gap-1.5 animate-fade-in">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
              <span className="leading-relaxed">{localError || authError}</span>
            </div>
            <span className="text-[11px] text-amber-300 font-medium pl-6">
              👉 Remplissez simplement le formulaire e-mail ci-dessous pour continuer instantanément.
            </span>
          </div>
        )}

        {/* Main Content Area */}
        <div className="p-5 sm:p-7 space-y-5">
          {/* Header titles */}
          <div className="text-left space-y-1">
            {initialMode === 'register' && (
              <>
                <h2 className="text-xl sm:text-2xl font-black text-white font-outfit tracking-tight">
                  Créez votre compte
                </h2>
                <p className="text-xs text-slate-400">
                  Votre identité visuelle commence ici.
                </p>
              </>
            )}

            {initialMode === 'login' && (
              <>
                <h2 className="text-xl sm:text-2xl font-black text-white font-outfit tracking-tight">
                  Bienvenue à nouveau
                </h2>
                <p className="text-xs text-slate-400">
                  Connectez-vous pour retrouver vos logos et votre générateur.
                </p>
              </>
            )}

            {initialMode === 'forgot' && (
              <>
                <h2 className="text-xl sm:text-2xl font-black text-white font-outfit tracking-tight">
                  Mot de passe oublié
                </h2>
                <p className="text-xs text-slate-400">
                  Entrez votre adresse e-mail pour recevoir les instructions de réinitialisation.
                </p>
              </>
            )}
          </div>

          {/* Google SSO Button (For Register and Login) */}
          {initialMode !== 'forgot' && (
            <div>
              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.12] text-white text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer disabled:opacity-50"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continuer avec Google</span>
              </button>

              <div className="relative my-4 flex items-center justify-center">
                <div className="border-t border-white/[0.08] w-full" />
                <span className="bg-[#090D17] px-3 text-[10px] uppercase font-bold tracking-wider text-slate-400 shrink-0">
                  ou avec votre e-mail
                </span>
              </div>
            </div>
          )}

          {/* Form */}
          {resetSuccessMessage ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <p className="text-xs text-slate-300">{resetSuccessMessage}</p>
              <button
                type="button"
                onClick={() => {
                  setResetSuccessMessage(null);
                  onSwitchMode('login');
                }}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
              >
                Retour à la connexion
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Register Fields */}
              {initialMode === 'register' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Prénom <span className="text-amber-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Votre prénom"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Nom
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Votre nom"
                      className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Adresse e-mail <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nom@domaine.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Password */}
              {initialMode !== 'forgot' && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-semibold text-slate-300">
                      Mot de passe <span className="text-amber-400">*</span>
                    </label>
                    {initialMode === 'login' && (
                      <button
                        type="button"
                        onClick={() => onSwitchMode('forgot')}
                        className="text-[10px] text-amber-400/90 hover:text-amber-300 transition-colors cursor-pointer"
                      >
                        Mot de passe oublié ?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              )}

              {/* Confirm Password (Register) */}
              {initialMode === 'register' && (
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Confirmation du mot de passe <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs tracking-wide shadow-[0_0_20px_rgba(245,158,11,0.25)] transition-all duration-200 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>
                      {initialMode === 'register'
                        ? 'Créer mon compte'
                        : initialMode === 'login'
                        ? 'Se connecter'
                        : 'Envoyer les instructions'}
                    </span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Toggle Between Login / Register */}
          <div className="pt-2 text-center text-xs text-slate-400 border-t border-white/[0.06]">
            {initialMode === 'register' && (
              <p>
                Déjà un compte ?{' '}
                <button
                  type="button"
                  onClick={() => onSwitchMode('login')}
                  className="font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer ml-1"
                >
                  Se connecter
                </button>
              </p>
            )}

            {initialMode === 'login' && (
              <p>
                Vous n'avez pas encore de compte ?{' '}
                <button
                  type="button"
                  onClick={() => onSwitchMode('register')}
                  className="font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer ml-1"
                >
                  Créer un compte
                </button>
              </p>
            )}

            {initialMode === 'forgot' && (
              <p>
                <button
                  type="button"
                  onClick={() => onSwitchMode('login')}
                  className="font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                >
                  ← Revenir à la connexion
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
