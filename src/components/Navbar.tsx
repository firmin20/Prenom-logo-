import React, { useState } from 'react';
import {
  Sparkles,
  Compass,
  Layers,
  Crown,
  User,
  LogOut,
  ChevronDown,
  Menu,
  X,
  HelpCircle,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onNavigateHome: () => void;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onNavigateTab?: (tab: 'dashboard' | 'create' | 'my-logos' | 'account' | 'subscription') => void;
  activeConnectedTab?: 'dashboard' | 'create' | 'my-logos' | 'account' | 'subscription';
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigateHome,
  onOpenLogin,
  onOpenRegister,
  onNavigateTab,
  activeConnectedTab = 'dashboard',
}) => {
  const { user, userProfile, signOutUser } = useAuth();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const displayName = userProfile?.firstName || user?.displayName?.split(' ')[0] || 'Membre';

  const handleSignOut = async () => {
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    await signOutUser();
    onNavigateHome();
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#080B10]/90 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <div
          className="flex items-center gap-3 sm:gap-4 cursor-pointer"
          onClick={onNavigateHome}
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-amber-400/20 via-amber-500/10 to-transparent border border-amber-500/30 flex items-center justify-center text-amber-300 font-bold font-cinzel text-lg shadow-[0_0_20px_rgba(217,119,6,0.15)]">
            P
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-wider text-base sm:text-lg text-white font-outfit flex items-center gap-1.5">
              PRÉNOM LOGO <span className="text-xs px-1.5 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/30 text-amber-300 font-medium">AI</span>
            </span>
            <span className="text-[11px] sm:text-xs text-slate-400 font-medium hidden sm:inline-block">
              Un prénom. Une identité. Un logo.
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        {!user ? (
          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-slate-300">
            <a
              href="#comment-ca-marche"
              className="hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Comment ça marche</span>
            </a>
            <a
              href="#fonctionnalites"
              className="hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Fonctionnalités</span>
            </a>
            <a
              href="#exemples"
              className="hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Exemples</span>
            </a>
            <a
              href="#tarifs"
              className="hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Tarifs</span>
            </a>
            <a
              href="#faq"
              className="hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>FAQ</span>
            </a>
          </nav>
        ) : (
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold">
            <button
              onClick={() => onNavigateTab && onNavigateTab('dashboard')}
              className={`transition-colors cursor-pointer ${
                activeConnectedTab === 'dashboard' ? 'text-amber-300' : 'text-slate-300 hover:text-white'
              }`}
            >
              Tableau de bord
            </button>
            <button
              onClick={() => onNavigateTab && onNavigateTab('create')}
              className={`transition-colors cursor-pointer ${
                activeConnectedTab === 'create' ? 'text-amber-300' : 'text-slate-300 hover:text-white'
              }`}
            >
              Créer un logo
            </button>
            <button
              onClick={() => onNavigateTab && onNavigateTab('my-logos')}
              className={`transition-colors cursor-pointer ${
                activeConnectedTab === 'my-logos' ? 'text-amber-300' : 'text-slate-300 hover:text-white'
              }`}
            >
              Mes logos
            </button>
            <button
              onClick={() => onNavigateTab && onNavigateTab('subscription')}
              className={`transition-colors cursor-pointer ${
                activeConnectedTab === 'subscription' ? 'text-amber-300' : 'text-slate-300 hover:text-white'
              }`}
            >
              Abonnement
            </button>
          </nav>
        )}

        {/* Right CTA / Auth controls */}
        <div className="flex items-center gap-3">
          {!user ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                id="nav-login-btn"
                onClick={onOpenLogin}
                className="px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                Se connecter
              </button>

              <button
                id="nav-cta-btn"
                onClick={onOpenRegister}
                className="group relative inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm tracking-wide shadow-[0_0_25px_rgba(245,158,11,0.25)] hover:shadow-[0_0_35px_rgba(245,158,11,0.4)] transition-all duration-200 active:scale-[0.98] cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                <span>Créer mon logo</span>
              </button>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] transition-colors cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold text-xs flex items-center justify-center font-outfit">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs font-bold text-white hidden sm:inline">
                  {displayName}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* User Dropdown */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0E1322] border border-white/[0.12] shadow-2xl p-2 z-50 space-y-1 animate-fade-in backdrop-blur-xl">
                  <div className="px-3 py-2 border-b border-white/[0.06] mb-1">
                    <p className="text-xs font-bold text-white truncate">{displayName}</p>
                    <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                  </div>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onNavigateTab && onNavigateTab('dashboard');
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left text-xs font-semibold text-slate-200 hover:bg-white/[0.06] hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    <span>Tableau de bord</span>
                  </button>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onNavigateTab && onNavigateTab('create');
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left text-xs font-semibold text-slate-200 hover:bg-white/[0.06] hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Créer un logo</span>
                  </button>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onNavigateTab && onNavigateTab('my-logos');
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left text-xs font-semibold text-slate-200 hover:bg-white/[0.06] hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5 text-sky-400" />
                    <span>Mes logos</span>
                  </button>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onNavigateTab && onNavigateTab('subscription');
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left text-xs font-semibold text-slate-200 hover:bg-white/[0.06] hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    <Crown className="w-3.5 h-3.5 text-amber-400" />
                    <span>Mon abonnement</span>
                  </button>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onNavigateTab && onNavigateTab('account');
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left text-xs font-semibold text-slate-200 hover:bg-white/[0.06] hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5 text-purple-400" />
                    <span>Mon profil</span>
                  </button>

                  <div className="pt-1 border-t border-white/[0.06]">
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Se déconnecter</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/[0.05] text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/[0.08] bg-[#0A0E17] p-4 space-y-3 animate-fade-in">
          {!user ? (
            <div className="space-y-2 text-sm font-semibold text-slate-300">
              <a
                href="#comment-ca-marche"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 hover:text-amber-300"
              >
                Comment ça marche
              </a>
              <a
                href="#fonctionnalites"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 hover:text-amber-300"
              >
                Fonctionnalités
              </a>
              <a
                href="#exemples"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 hover:text-amber-300"
              >
                Exemples
              </a>
              <a
                href="#tarifs"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 hover:text-amber-300"
              >
                Tarifs
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 hover:text-amber-300"
              >
                FAQ
              </a>
              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLogin();
                  }}
                  className="w-full py-2.5 rounded-xl bg-white/[0.05] text-center font-bold text-xs"
                >
                  Se connecter
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenRegister();
                  }}
                  className="w-full py-2.5 rounded-xl bg-amber-500 text-slate-950 text-center font-bold text-xs"
                >
                  Créer mon logo
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2 text-sm font-semibold text-slate-300">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateTab && onNavigateTab('dashboard');
                }}
                className="block w-full text-left py-2 hover:text-amber-300"
              >
                Tableau de bord
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateTab && onNavigateTab('create');
                }}
                className="block w-full text-left py-2 hover:text-amber-300"
              >
                Créer un logo
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateTab && onNavigateTab('my-logos');
                }}
                className="block w-full text-left py-2 hover:text-amber-300"
              >
                Mes logos
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateTab && onNavigateTab('subscription');
                }}
                className="block w-full text-left py-2 hover:text-amber-300"
              >
                Abonnement
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateTab && onNavigateTab('account');
                }}
                className="block w-full text-left py-2 hover:text-amber-300"
              >
                Mon profil
              </button>
              <div className="pt-2 border-t border-white/[0.06]">
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left py-2 text-red-400 font-bold"
                >
                  Se déconnecter
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
