import React, { useState } from 'react';
import { X, Layers, Copy, Check, Smartphone, CreditCard, Globe, Sparkles, Download, Monitor } from 'lucide-react';
import { LogoConcept } from '../types';
import { LogoRenderer } from './LogoRenderer';
import { exportLogoToPNG } from '../utils/exportEngine';

interface BrandKitModalProps {
  concept: LogoConcept;
  onClose: () => void;
}

export const BrandKitModal: React.FC<BrandKitModalProps> = ({ concept, onClose }) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  const handleDownloadPresentation = async () => {
    setIsExporting(true);
    try {
      await exportLogoToPNG(concept, {
        width: 1920,
        height: 1080,
        isPresentation: true,
      });
      setExportNotice('Slide de présentation 16:9 téléchargée !');
      setTimeout(() => setExportNotice(null), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownload4K = async () => {
    setIsExporting(true);
    try {
      await exportLogoToPNG(concept, {
        width: 3840,
        height: 3840,
        transparent: false,
      });
      setExportNotice('Export Ultra 4K (3840x3840) téléchargé !');
      setTimeout(() => setExportNotice(null), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setIsExporting(false);
    }
  };

  const initial = (concept.brandName || 'P')[0].toUpperCase();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-lg overflow-y-auto">
      <div className="relative w-full max-w-6xl rounded-3xl bg-[#080B12] border border-white/[0.12] shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between px-6 py-5 border-b border-white/[0.08] bg-[#0B0F19]/80 sticky top-0 z-20 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-outfit">
                Mini Kit de Marque Officiel — {concept.brandName}
              </h2>
              <p className="text-xs text-slate-400">
                Livrable d'identité visuelle complet prêt pour déploiement multisupport
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPresentation}
              disabled={isExporting}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-semibold text-slate-200 transition-colors cursor-pointer disabled:opacity-50"
              title="Exporter sous format slide de présentation 16:9 optimisé pour pitch decks"
            >
              <Monitor className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Slide Présentation (16:9)</span>
              <span className="sm:hidden">16:9</span>
            </button>

            <button
              onClick={handleDownload4K}
              disabled={isExporting}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
              title="Exporter en résolution Ultra 4K (3840×3840)"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export 4K</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {exportNotice && (
          <div className="bg-emerald-500/15 border-b border-emerald-500/30 px-6 py-2 text-xs font-semibold text-emerald-300 flex items-center gap-2 animate-fade-in">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{exportNotice}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-10 space-y-10 overflow-y-auto">
          {/* 1. Primary & Secondary Logos Grid */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                1. Déclinaisons du Logo
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Primary Logo */}
              <div className="rounded-2xl bg-[#0D121F] border border-white/[0.08] p-6 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">Logo Principal (Centré)</span>
                  <span className="text-slate-400">Usage standard</span>
                </div>
                <div className="rounded-xl overflow-hidden bg-[#06080F] border border-white/[0.05]">
                  <LogoRenderer concept={concept} size="md" />
                </div>
              </div>

              {/* Secondary Logo (Horizontal layout simulation) */}
              <div className="rounded-2xl bg-[#0D121F] border border-white/[0.08] p-6 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">Logo Secondaire (Horizontal)</span>
                  <span className="text-slate-400">Pour en-têtes web & bannières</span>
                </div>
                <div
                  className="rounded-xl p-8 min-h-[220px] flex items-center justify-center gap-5 border border-white/[0.05]"
                  style={{ backgroundColor: concept.colors.background }}
                >
                  <div className="w-14 h-14 rounded-xl border-2 flex items-center justify-center text-xl font-bold font-outfit" style={{ borderColor: concept.colors.primary, color: concept.colors.primary }}>
                    {initial}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl sm:text-2xl font-bold tracking-[0.25em] font-outfit text-white uppercase">
                      {concept.brandName}
                    </span>
                    {concept.slogan && (
                      <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400">
                        {concept.slogan}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Icon / Favicon & Monochrome Versions */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                2. Favicon & Versions Monochromes
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Favicon / App Icon */}
              <div className="rounded-2xl bg-[#0D121F] border border-white/[0.08] p-5 text-center space-y-3">
                <span className="text-xs font-semibold text-white block">Favicon / App Icon</span>
                <div className="py-6 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-900 to-black border-2 border-amber-400 flex items-center justify-center text-amber-400 font-bold font-cinzel text-3xl shadow-lg">
                    {initial}
                  </div>
                </div>
                <p className="text-[11px] text-slate-400">Parfaitement lisible à 32x32px</p>
              </div>

              {/* Monochrome Dark */}
              <div className="rounded-2xl bg-[#0D121F] border border-white/[0.08] p-5 text-center space-y-3">
                <span className="text-xs font-semibold text-white block">Monochrome Négatif (Noir)</span>
                <div className="py-6 flex items-center justify-center">
                  <div className="p-4 rounded-xl bg-black border border-white/[0.1] flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-lg border border-white flex items-center justify-center font-bold text-white text-lg">
                      {initial}
                    </div>
                    <span className="text-xs font-bold text-white tracking-[0.2em]">
                      {concept.brandName}
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400">Pour marquage à chaud & broderies</p>
              </div>

              {/* Monochrome Light */}
              <div className="rounded-2xl bg-[#0D121F] border border-white/[0.08] p-5 text-center space-y-3">
                <span className="text-xs font-semibold text-white block">Monochrome Positif (Blanc)</span>
                <div className="py-6 flex items-center justify-center">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col items-center gap-2 text-slate-900 shadow-sm">
                    <div className="w-10 h-10 rounded-lg border border-slate-900 flex items-center justify-center font-bold text-slate-900 text-lg">
                      {initial}
                    </div>
                    <span className="text-xs font-bold text-slate-900 tracking-[0.2em]">
                      {concept.brandName}
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400">Pour factures & papier à en-tête</p>
              </div>
            </div>
          </div>

          {/* 3. Color Palette */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                3. Nuancier & Charte Chromatique
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'Primaire Symbole', hex: concept.colors.primary, role: 'Couleur maîtresse de l’emblème' },
                { name: 'Accent Secondaire', hex: concept.colors.secondary, role: 'Subdivisions et filigranes' },
                { name: 'Fond Signature', hex: concept.colors.background, role: 'Arrière-plan des supports sombres' },
                { name: 'Texte & Titrage', hex: concept.colors.text, role: 'Typographie principale du prénom' },
              ].map((c) => (
                <div
                  key={c.name}
                  onClick={() => copyColor(c.hex)}
                  className="rounded-2xl bg-[#0D121F] border border-white/[0.08] p-4 space-y-3 cursor-pointer hover:border-amber-400/30 transition-all group"
                >
                  <div
                    className="h-20 rounded-xl shadow-inner border border-black/20 flex items-end p-2"
                    style={{ backgroundColor: c.hex }}
                  />
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white">{c.name}</h4>
                      <span className="font-mono text-xs text-slate-400 group-hover:text-amber-300 flex items-center gap-1">
                        {c.hex}
                        {copiedHex === c.hex ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">{c.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Typography Recommendations */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                4. Recommandations Typographiques
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-[#0D121F] border border-white/[0.08] p-6 space-y-2">
                <span className="text-xs font-semibold text-amber-400">Police de Titre & Marque</span>
                <p className="text-2xl font-bold text-white font-outfit">{concept.typography.fontFamily}</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  À employer en majuscules avec crénage étendu (+20% à +35%) pour toute communication statutaire.
                </p>
              </div>

              <div className="rounded-2xl bg-[#0D121F] border border-white/[0.08] p-6 space-y-2">
                <span className="text-xs font-semibold text-amber-400">Police de Corps & Subhead</span>
                <p className="text-2xl font-bold text-white font-jakarta">Plus Jakarta Sans</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Idéale pour les textes courants, devis, interfaces web et présentations professionnelles.
                </p>
              </div>
            </div>
          </div>

          {/* 5. Real World Application Mockups */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                5. Mises en Situation Réelles
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Business Card Mockup */}
              <div className="rounded-2xl bg-[#0D121F] border border-white/[0.08] p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <CreditCard className="w-4 h-4 text-amber-400" />
                  <span>Carte de visite de prestige</span>
                </div>
                <div className="aspect-[1.75/1] rounded-xl bg-gradient-to-br from-slate-900 via-black to-slate-950 border border-amber-500/20 p-5 flex flex-col justify-between shadow-lg">
                  <div className="w-8 h-8 rounded-lg border border-amber-400/50 flex items-center justify-center text-amber-300 text-xs font-bold">
                    {initial}
                  </div>
                  <div>
                    <span className="text-sm font-bold tracking-widest text-white uppercase block">
                      {concept.brandName}
                    </span>
                    <span className="text-[9px] text-amber-300/80 uppercase">
                      Fondateur & Directeur
                    </span>
                  </div>
                </div>
              </div>

              {/* Website Header Mockup */}
              <div className="rounded-2xl bg-[#0D121F] border border-white/[0.08] p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <Globe className="w-4 h-4 text-amber-400" />
                  <span>Barre de navigation Web</span>
                </div>
                <div className="aspect-[1.75/1] rounded-xl bg-slate-950 border border-white/[0.08] p-4 flex flex-col justify-between shadow-lg">
                  <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-amber-400/20 text-amber-400 text-[10px] font-bold flex items-center justify-center">
                        {initial}
                      </div>
                      <span className="text-xs font-bold text-white tracking-wider">
                        {concept.brandName}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span className="w-8 h-1.5 bg-white/20 rounded" />
                      <span className="w-8 h-1.5 bg-white/20 rounded" />
                    </div>
                  </div>
                  <div className="py-2 text-center">
                    <span className="text-[11px] text-slate-300 font-medium">
                      Hero Section Responsive
                    </span>
                  </div>
                </div>
              </div>

              {/* Mobile App Icon Mockup */}
              <div className="rounded-2xl bg-[#0D121F] border border-white/[0.08] p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <Smartphone className="w-4 h-4 text-amber-400" />
                  <span>Icône d'application iOS / Android</span>
                </div>
                <div className="aspect-[1.75/1] rounded-xl bg-slate-950 border border-white/[0.08] flex items-center justify-center shadow-lg">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-bold font-outfit text-2xl shadow-xl">
                    {initial}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
