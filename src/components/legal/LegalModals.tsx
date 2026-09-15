import React, { useState } from 'react';
import { X, Shield, FileText, Mail, Send, CheckCircle2 } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[85vh] rounded-3xl bg-[#0B0F19] border border-white/[0.12] shadow-2xl flex flex-col overflow-hidden text-slate-300">
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08] bg-[#0E1424]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-outfit">Conditions Générales d'Utilisation</h3>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.05] transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto text-xs sm:text-sm leading-relaxed">
          <div>
            <h4 className="font-bold text-white mb-2">1. Objet du Service</h4>
            <p className="text-slate-400">
              PRÉNOM LOGO AI propose un service d'assistance graphique basé sur l'intelligence artificielle pour concevoir des logos et identités visuelles à partir de prénoms.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-2">2. Propriété Intellectuelle & Droits d'Utilisation</h4>
            <p className="text-slate-400">
              Vous conservez l'entière propriété et les droits d'exploitation commerciale sur tous les logos et kits de marque générés et téléchargés via votre compte personnel. Vous êtes libre de les utiliser pour votre entreprise, vos réseaux sociaux ou vos supports publicitaires.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-2">3. Comptes & Sécurité</h4>
            <p className="text-slate-400">
              L'accès au générateur de logo nécessite la création d'un compte authentifié. Chaque utilisateur est responsable de la confidentialité de ses identifiants. Les créations de chaque compte sont strictement privées et cloisonnées.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-2">4. Disponibilité & Garanties</h4>
            <p className="text-slate-400">
              Nous nous efforçons de garantir une haute disponibilité du service et un rendu vectoriel et haute définition de qualité professionnelle.
            </p>
          </div>
        </div>

        <div className="p-4 border-t border-white/[0.08] bg-[#0E1424] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
          >
            J'ai compris
          </button>
        </div>
      </div>
    </div>
  );
};

export const PrivacyModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[85vh] rounded-3xl bg-[#0B0F19] border border-white/[0.12] shadow-2xl flex flex-col overflow-hidden text-slate-300">
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08] bg-[#0E1424]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-outfit">Politique de Confidentialité</h3>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.05] transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto text-xs sm:text-sm leading-relaxed">
          <div>
            <h4 className="font-bold text-white mb-2">1. Données collectées</h4>
            <p className="text-slate-400">
              Nous collectons uniquement les informations nécessaires au fonctionnement de votre compte : prénom, nom, adresse e-mail, ainsi que les spécifications des logos créés (prénom, activité, style).
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-2">2. Confidentialité de vos créations</h4>
            <p className="text-slate-400">
              Vos logos sauvegardés sont strictement confidentiels. Des règles de sécurité au niveau de la base de données empêchent formellement tout autre utilisateur d'accéder à votre galerie privée.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-2">3. Aucune revente de données</h4>
            <p className="text-slate-400">
              PRÉNOM LOGO AI ne vend ni ne cède aucune donnée personnelle ou création graphique à des tiers.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-2">4. Vos droits (RGPD)</h4>
            <p className="text-slate-400">
              Vous pouvez à tout moment demander la modification, l'exportation ou la suppression intégrale de votre compte et de vos logos sauvegardés.
            </p>
          </div>
        </div>

        <div className="p-4 border-t border-white/[0.08] bg-[#0E1424] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export const ContactModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0B0F19] border border-white/[0.12] shadow-2xl flex flex-col overflow-hidden text-slate-300">
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08] bg-[#0E1424]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-outfit">Contact & Support</h3>
              <p className="text-[11px] text-slate-400">Notre équipe de design vous répond sous 24h</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.05] transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-base font-bold text-white">Message envoyé !</h4>
            <p className="text-xs text-slate-400">
              Merci de nous avoir contactés. Nous reviendrons vers vous dans les plus brefs délais.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Votre Nom / Prénom</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Firmin"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Adresse e-mail</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nom@exemple.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Votre Message ou Question</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Une question sur les logos, votre abonnement ou un format d'export ?"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-medium text-slate-300 transition-colors cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Envoyer le message</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
