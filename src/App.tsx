import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { PublicLandingPage } from './components/PublicLandingPage';
import { UserDashboard } from './components/dashboard/UserDashboard';
import { AuthModalOrView } from './components/auth/AuthViews';
import { TermsModal, PrivacyModal, ContactModal } from './components/legal/LegalModals';
import { Footer } from './components/Footer';

function MainApp() {
  const { user, userProfile, loading } = useAuth();

  // Navigation tab for logged-in users
  const [connectedTab, setConnectedTab] = useState<
    'dashboard' | 'create' | 'my-logos' | 'account' | 'subscription'
  >('dashboard');

  // Auth Modal State
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | 'forgot'>('register');
  const [authNoticeMessage, setAuthNoticeMessage] = useState<string | null>(null);

  // Legal & Contact Modals
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  // Welcome banner after login/register
  const [welcomeBanner, setWelcomeBanner] = useState<{
    type: 'registered' | 'logged_in';
    name: string;
  } | null>(null);

  // Auto handle path hash or protected link redirection
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (['dashboard', 'create', 'my-logos', 'account', 'subscription'].includes(hash)) {
        if (!user && !loading) {
          setAuthNoticeMessage('Connectez-vous ou créez un compte pour accéder au générateur.');
          setAuthModalMode('register');
          setAuthModalOpen(true);
        } else if (user) {
          setConnectedTab(hash as any);
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [user, loading]);

  // Open Auth modal with specific mode and optional notice
  const handleOpenAuth = (mode: 'login' | 'register', notice?: string) => {
    setAuthModalMode(mode);
    setAuthNoticeMessage(notice || null);
    setAuthModalOpen(true);
  };

  // On Auth Success
  const handleAuthSuccess = (type: 'registered' | 'logged_in') => {
    setAuthModalOpen(false);
    setAuthNoticeMessage(null);
    const firstName = userProfile?.firstName || user?.displayName?.split(' ')[0] || 'Créateur';

    setWelcomeBanner({
      type,
      name: firstName,
    });

    if (type === 'registered') {
      setConnectedTab('create');
    } else {
      setConnectedTab('dashboard');
    }
  };

  // Handle Tab navigation
  const handleNavigateTab = (tab: 'dashboard' | 'create' | 'my-logos' | 'account' | 'subscription') => {
    setConnectedTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080B10] text-[#E2E8F0] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300 font-bold font-cinzel text-xl animate-pulse">
          P
        </div>
        <p className="text-xs tracking-widest uppercase text-slate-400 font-semibold font-mono">
          PRÉNOM LOGO AI • Chargement de votre espace...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080B10] text-[#E2E8F0] flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      {/* Navigation Header */}
      <Navbar
        onNavigateHome={() => {
          if (user) {
            setConnectedTab('dashboard');
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        onOpenLogin={() => handleOpenAuth('login')}
        onOpenRegister={() =>
          handleOpenAuth('register', 'Créez votre compte pour accéder au générateur de logos.')
        }
        onNavigateTab={handleNavigateTab}
        activeConnectedTab={connectedTab}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {!user ? (
          /* Public Landing Page (Zero login required to discover) */
          <PublicLandingPage
            onStartSignUp={() =>
              handleOpenAuth('register', 'Créez votre compte pour accéder au générateur de logos.')
            }
            onOpenSignIn={() => handleOpenAuth('login')}
            onOpenTerms={() => setTermsModalOpen(true)}
            onOpenPrivacy={() => setPrivacyModalOpen(true)}
            onOpenContact={() => setContactModalOpen(true)}
          />
        ) : (
          /* Authenticated User Dashboard & Generator Area */
          <UserDashboard
            activeTab={connectedTab}
            onTabChange={handleNavigateTab}
            welcomeBanner={welcomeBanner}
            onDismissBanner={() => setWelcomeBanner(null)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenTerms={() => setTermsModalOpen(true)}
        onOpenPrivacy={() => setPrivacyModalOpen(true)}
        onOpenContact={() => setContactModalOpen(true)}
      />

      {/* Authentication Modal */}
      {authModalOpen && (
        <AuthModalOrView
          initialMode={authModalMode}
          noticeMessage={authNoticeMessage}
          onSuccess={handleAuthSuccess}
          onClose={() => setAuthModalOpen(false)}
          onSwitchMode={(mode) => setAuthModalMode(mode)}
        />
      )}

      {/* Legal and Contact Modals */}
      <TermsModal isOpen={termsModalOpen} onClose={() => setTermsModalOpen(false)} />
      <PrivacyModal isOpen={privacyModalOpen} onClose={() => setPrivacyModalOpen(false)} />
      <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
