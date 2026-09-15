import React from 'react';
import { ShieldCheck, Sparkles, Heart } from 'lucide-react';

interface FooterProps {
  onOpenTerms?: () => void;
  onOpenPrivacy?: () => void;
  onOpenContact?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenTerms,
  onOpenPrivacy,
  onOpenContact,
}) => {
  return (
    <footer className="border-t border-white/[0.06] bg-[#06080E] text-slate-400 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300 font-bold font-cinzel text-sm">
                P
              </div>
              <span className="text-lg font-bold text-white font-outfit tracking-wider">
                PRÉNOM LOGO <span className="text-amber-400">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              « Un prénom. Une identité. Un logo. »
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Exports certifiés conformes (HD, 4K & Transparent)
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Intelligence Artificielle de Branding
            </span>
          </div>
        </div>

        {/* Links bar */}
        <div className="pt-6 border-t border-white/[0.04] flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-6 text-slate-400">
            {onOpenTerms && (
              <button
                onClick={onOpenTerms}
                className="hover:text-amber-300 transition-colors cursor-pointer"
              >
                Conditions d'utilisation
              </button>
            )}
            {onOpenPrivacy && (
              <button
                onClick={onOpenPrivacy}
                className="hover:text-amber-300 transition-colors cursor-pointer"
              >
                Politique de confidentialité
              </button>
            )}
            {onOpenContact && (
              <button
                onClick={onOpenContact}
                className="hover:text-amber-300 transition-colors cursor-pointer"
              >
                Contact & Support
              </button>
            )}
            <a href="#tarifs" className="hover:text-amber-300 transition-colors">
              Tarifs
            </a>
            <a href="#faq" className="hover:text-amber-300 transition-colors">
              FAQ
            </a>
          </div>

          <p className="text-slate-500">
            © {new Date().getFullYear()} PRÉNOM LOGO AI. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};
