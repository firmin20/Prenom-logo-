import React, { useState } from 'react';
import { Eye, Edit3, Download, Sparkles, RefreshCw, Layers, ChevronDown, Check, FileText, Monitor, Image } from 'lucide-react';
import { LetterAnalysis, LogoConcept } from '../types';
import { LogoRenderer } from './LogoRenderer';
import { exportLogoToPNG, exportLogoToSVG } from '../utils/exportEngine';

interface ResultsDashboardProps {
  concepts: LogoConcept[];
  letterAnalysis?: LetterAnalysis;
  onViewConcept: (concept: LogoConcept) => void;
  onModifyConcept: (concept: LogoConcept) => void;
  onQuickDownload: (concept: LogoConcept) => void;
  onResetGenerator: () => void;
  onOpenBrandKit: (concept: LogoConcept) => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  concepts,
  letterAnalysis,
  onViewConcept,
  onModifyConcept,
  onQuickDownload,
  onResetGenerator,
  onOpenBrandKit,
}) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleExport = async (concept: LogoConcept, type: 'standard' | '4k' | 'presentation' | 'presentation_4k' | 'transparent' | 'svg') => {
    setOpenMenuId(null);
    try {
      if (type === 'svg') {
        exportLogoToSVG(concept, false);
        showToast(`Logo ${concept.brandName} exporté en SVG vectoriel !`);
      } else if (type === '4k') {
        await exportLogoToPNG(concept, {
          width: 3840,
          height: 3840,
          transparent: false,
        });
        showToast(`Export Ultra 4K (3840×3840) téléchargé !`);
      } else if (type === 'presentation') {
        await exportLogoToPNG(concept, {
          width: 1920,
          height: 1080,
          isPresentation: true,
        });
        showToast(`Slide de présentation 16:9 téléchargée !`);
      } else if (type === 'presentation_4k') {
        await exportLogoToPNG(concept, {
          width: 3840,
          height: 2160,
          isPresentation: true,
        });
        showToast(`Slide de présentation Ultra 4K (16:9) téléchargée !`);
      } else if (type === 'transparent') {
        await exportLogoToPNG(concept, {
          width: 2048,
          height: 2048,
          transparent: true,
        });
        showToast(`PNG Transparent HD téléchargé !`);
      } else {
        await exportLogoToPNG(concept, {
          width: 1080,
          height: 1080,
          transparent: false,
        });
        showToast(`Logo standard (1080×1080) téléchargé !`);
      }
    } catch (e) {
      console.error('Export error:', e);
      showToast('Erreur lors du téléchargement.');
    }
  };
  return (
    <section id="resultats-dashboard" className="py-12 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 fill-amber-300" />
              <span>4 Concepts uniques élaborés</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-outfit">
              Votre identité prend forme.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-normal">
              Choisissez le concept qui vous ressemble.
            </p>
          </div>

          <button
            onClick={onResetGenerator}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.1] text-slate-300 hover:text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer self-start md:self-auto"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Nouveau prénom</span>
          </button>
        </div>

        {/* Letter Analysis Brief Card */}
        {letterAnalysis && (
          <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-[#0D121F]/80 border border-white/[0.08] backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-300 font-bold font-cinzel text-xl shrink-0">
                {letterAnalysis.initials}
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Analyse morphologique de « {letterAnalysis.name} »</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.06] text-amber-300 font-mono">
                    {letterAnalysis.length} lettres
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {letterAnalysis.vibeSummary}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 text-xs text-slate-400">
              <div className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                Initiale : <strong className="text-white">{letterAnalysis.initials}</strong>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                Symétrie : <strong className="text-white capitalize">{letterAnalysis.dominantSymmetry}</strong>
              </div>
            </div>
          </div>
        )}

        {/* 4 Generated Concepts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {concepts.map((concept) => (
            <div
              key={concept.id}
              id={`concept-card-${concept.conceptNumber}`}
              className="group relative rounded-2xl bg-[#0A0D15] border border-white/[0.09] hover:border-amber-500/40 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
            >
              <div>
                {/* Header of Concept Card */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/[0.08] text-xs font-mono text-slate-300 font-semibold">
                      Concept {concept.conceptNumber}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-xs font-medium text-amber-300">
                      Style {concept.style}
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-slate-400">
                    {concept.conceptType}
                  </span>
                </div>

                {/* Logo Preview (Centered) */}
                <div
                  className="cursor-pointer overflow-hidden rounded-xl group-hover:scale-[1.01] transition-transform"
                  onClick={() => onViewConcept(concept)}
                >
                  <LogoRenderer concept={concept} size="lg" />
                </div>

                {/* Title & Short Description */}
                <div className="mt-6 space-y-2">
                  <h3 className="text-lg font-bold text-white font-outfit tracking-wide flex items-center justify-between">
                    <span>{concept.title}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {concept.shortDescription}
                  </p>
                </div>
              </div>

              {/* Action Buttons: "Voir", "Modifier", "Télécharger" */}
              <div className="mt-8 pt-5 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {/* Button "Voir" */}
                  <button
                    id={`btn-view-${concept.conceptNumber}`}
                    onClick={() => onViewConcept(concept)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white font-semibold text-xs transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-400" />
                    <span>Voir</span>
                  </button>

                  {/* Button "Modifier" */}
                  <button
                    id={`btn-modify-${concept.conceptNumber}`}
                    onClick={() => onModifyConcept(concept)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-amber-300 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Modifier</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {/* Mini Brand Kit Quick Link */}
                  <button
                    onClick={() => onOpenBrandKit(concept)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-semibold text-xs transition-colors cursor-pointer"
                    title="Ouvrir le mini kit de marque pour ce concept"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Kit de marque</span>
                  </button>

                  {/* Quick Export Dropdown Group */}
                  <div className="relative">
                    <div className="inline-flex rounded-xl shadow-sm">
                      <button
                        id={`btn-download-${concept.conceptNumber}`}
                        onClick={() => handleExport(concept, '4k')}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-l-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm transition-all cursor-pointer"
                        title="Télécharger directement en Ultra Haute Résolution 4K (3840×3840)"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export 4K</span>
                      </button>
                      <button
                        onClick={() => setOpenMenuId(openMenuId === concept.id ? null : concept.id)}
                        className="px-2 py-2 rounded-r-xl bg-amber-600 hover:bg-amber-500 text-slate-950 border-l border-amber-600 transition-colors cursor-pointer"
                        title="Plus d'options d'export (Présentation, SVG, etc.)"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Popover Menu */}
                    {openMenuId === concept.id && (
                      <div className="absolute right-0 bottom-full mb-2 w-64 rounded-2xl bg-[#0D121F] border border-white/[0.12] shadow-2xl p-2 z-30 space-y-1 animate-fade-in backdrop-blur-xl">
                        <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-white/[0.06]">
                          Options d'exportation
                        </div>

                        <button
                          onClick={() => handleExport(concept, '4k')}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-semibold text-amber-300 hover:bg-white/[0.06] transition-colors cursor-pointer"
                        >
                          <span className="flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                            <span>Ultra 4K (3840×3840)</span>
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">14.7 MP</span>
                        </button>

                        <button
                          onClick={() => handleExport(concept, 'presentation')}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-semibold text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                        >
                          <span className="flex items-center gap-2">
                            <Monitor className="w-3.5 h-3.5 text-sky-400" />
                            <span>Slide Présentation Pro</span>
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">16:9 HD</span>
                        </button>

                        <button
                          onClick={() => handleExport(concept, 'presentation_4k')}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-semibold text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                        >
                          <span className="flex items-center gap-2">
                            <Monitor className="w-3.5 h-3.5 text-purple-400" />
                            <span>Slide Présentation 4K</span>
                          </span>
                          <span className="text-[10px] text-purple-300 font-mono">3840×2160</span>
                        </button>

                        <button
                          onClick={() => handleExport(concept, 'svg')}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-semibold text-slate-200 hover:bg-white/[0.06] transition-colors cursor-pointer"
                        >
                          <span className="flex items-center gap-2">
                            <FileText className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Vectoriel (SVG)</span>
                          </span>
                          <span className="text-[10px] text-emerald-400 font-mono">Vecteur</span>
                        </button>

                        <button
                          onClick={() => handleExport(concept, 'transparent')}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-semibold text-slate-300 hover:bg-white/[0.06] transition-colors cursor-pointer"
                        >
                          <span className="flex items-center gap-2">
                            <Image className="w-3.5 h-3.5 text-slate-400" />
                            <span>PNG Transparent HD</span>
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">2048px</span>
                        </button>

                        <div className="pt-1 border-t border-white/[0.06]">
                          <button
                            onClick={() => {
                              setOpenMenuId(null);
                              onViewConcept(concept);
                            }}
                            className="w-full px-3 py-1.5 rounded-lg text-center text-[11px] font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
                          >
                            Toutes les dimensions et options →
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#0F172A] border border-amber-500/40 text-amber-200 text-xs font-semibold shadow-2xl animate-fade-in backdrop-blur-md">
            <Check className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </section>
  );
};
