import React, { useState } from 'react';
import { X, Download, ArrowLeft, Sparkles, Layers, Check, Copy, FileText, Monitor, Bookmark, BookmarkCheck } from 'lucide-react';
import { DownloadSizeOption, LogoConcept } from '../types';
import { DOWNLOAD_SIZES } from '../data/presets';
import { LogoRenderer } from './LogoRenderer';
import { exportLogoToPNG, exportLogoToSVG } from '../utils/exportEngine';
import { useAuth } from '../context/AuthContext';

interface LogoDetailModalProps {
  concept: LogoConcept;
  onClose: () => void;
  onOpenRefinement: (concept: LogoConcept) => void;
  onOpenBrandKit: (concept: LogoConcept) => void;
  onGenerateAiVariant?: (concept: LogoConcept) => void;
  isGeneratingAiVariant?: boolean;
}

export const LogoDetailModal: React.FC<LogoDetailModalProps> = ({
  concept,
  onClose,
  onOpenRefinement,
  onOpenBrandKit,
  onGenerateAiVariant,
  isGeneratingAiVariant = false,
}) => {
  const { user, saveLogo, savedLogos } = useAuth();
  const [selectedSize, setSelectedSize] = useState<DownloadSizeOption>(DOWNLOAD_SIZES[0]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const isAlreadySaved = savedLogos.some((l) => l.concept.id === concept.id || (l.concept.brandName === concept.brandName && l.concept.title === concept.title));

  const handleSaveToAccount = async () => {
    if (!user) return;
    setIsSaving(true);
    try {
      await saveLogo(concept);
      setDownloadSuccessMessage('Logo enregistré avec succès dans votre espace !');
      setTimeout(() => setDownloadSuccessMessage(null), 3000);
    } catch (err) {
      console.error('Error saving logo:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownload = async (transparent: boolean) => {
    setIsDownloading(true);
    setDownloadSuccessMessage(null);
    try {
      await exportLogoToPNG(concept, {
        width: selectedSize.width,
        height: selectedSize.height,
        transparent,
        isPresentation: selectedSize.isPresentation,
      });
      setDownloadSuccessMessage(
        selectedSize.isPresentation
          ? 'Slide de présentation générée !'
          : selectedSize.width >= 3840
          ? 'Export Ultra 4K (3840x3840) réussi !'
          : 'Export PNG réussi !'
      );
      setTimeout(() => setDownloadSuccessMessage(null), 3000);
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleExportSVG = () => {
    exportLogoToSVG(concept, false);
    setDownloadSuccessMessage('Logo vectoriel SVG exporté !');
    setTimeout(() => setDownloadSuccessMessage(null), 3000);
  };

  const handleQuickSelectSize = (sizeId: string) => {
    const found = DOWNLOAD_SIZES.find((s) => s.id === sizeId);
    if (found) setSelectedSize(found);
  };

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-5xl rounded-3xl bg-[#090D15] border border-white/[0.12] shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08] bg-[#0C101B]/80 sticky top-0 z-20">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Retour aux concepts</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 font-semibold font-mono">
              Concept {concept.conceptNumber} • {concept.conceptType}
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto">
          {/* Main Logo Large Presentation */}
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-inner bg-[#06080F]">
            <LogoRenderer concept={concept} size="xl" />
          </div>

          {/* Core Identity Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Cols: Description & Design Explanation */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-1 block">
                  Concept & Vision
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-outfit">
                  {concept.title}
                </h2>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed font-normal">
                  {concept.shortDescription}
                </p>
              </div>

              {/* Design Explanation */}
              <div className="p-5 rounded-2xl bg-[#0D121E] border border-white/[0.07] space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Explication de design de marque
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {concept.designExplanation}
                </p>
              </div>

              {/* Typography & Golden Ratio Rules */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#0B0F19] border border-white/[0.06]">
                  <h4 className="text-xs font-bold text-slate-400 mb-1">Typographie principale</h4>
                  <p className="text-sm font-bold text-white font-outfit">
                    {concept.typography.fontFamily} ({concept.typography.fontWeight})
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {concept.typography.styleTag}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0B0F19] border border-white/[0.06]">
                  <h4 className="text-xs font-bold text-slate-400 mb-1">Direction du symbole</h4>
                  <p className="text-sm font-bold text-amber-300 font-outfit">
                    {concept.designBrief.symbol}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {concept.designBrief.negativeSpace}
                  </p>
                </div>
              </div>

              {/* Recommended Usage */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Recommandations d'usage
                </h3>
                <div className="flex flex-wrap gap-2">
                  {concept.recommendedUsage.map((usage, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-slate-300"
                    >
                      {usage}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Colors & Export Center */}
            <div className="space-y-6">
              {/* Color Palette Swatches */}
              <div className="p-5 rounded-2xl bg-[#0D121E] border border-white/[0.07] space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Couleurs de la marque
                </h3>
                <div className="space-y-2.5">
                  {[
                    { label: 'Primaire (Symbole)', hex: concept.colors.primary },
                    { label: 'Secondaire (Accent)', hex: concept.colors.secondary },
                    { label: 'Arrière-plan', hex: concept.colors.background },
                    { label: 'Texte marque', hex: concept.colors.text },
                  ].map((colorItem) => (
                    <div
                      key={colorItem.label}
                      onClick={() => copyColor(colorItem.hex)}
                      className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.05] transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-7 h-7 rounded-lg border border-black/30 shadow-sm shrink-0"
                          style={{ backgroundColor: colorItem.hex }}
                        />
                        <span className="text-xs text-slate-300 font-medium">
                          {colorItem.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 font-mono text-xs text-slate-400 group-hover:text-amber-300">
                        <span>{colorItem.hex}</span>
                        {copiedHex === colorItem.hex ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Download Size Selector */}
              <div className="p-5 rounded-2xl bg-[#0D121F] border border-white/[0.08] space-y-3.5 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Moteur d'export haute fidélité
                    </h3>
                    {selectedSize.badge && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 border border-amber-500/40 text-amber-300">
                        {selectedSize.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-amber-300 font-mono font-semibold">
                    {selectedSize.dimensions}
                  </span>
                </div>

                {/* Quick format shortcut pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <button
                    type="button"
                    onClick={() => handleQuickSelectSize('4k_ultra')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                      selectedSize.id === '4k_ultra'
                        ? 'bg-amber-400 text-slate-950 shadow-sm'
                        : 'bg-white/[0.05] hover:bg-white/[0.1] text-slate-300'
                    }`}
                  >
                    ✨ 4K Ultra (3840×3840)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickSelectSize('presentation_pro')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                      selectedSize.id === 'presentation_pro'
                        ? 'bg-amber-400 text-slate-950 shadow-sm'
                        : 'bg-white/[0.05] hover:bg-white/[0.1] text-slate-300'
                    }`}
                  >
                    📊 Slide Pro (16:9)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickSelectSize('high_res')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                      selectedSize.id === 'high_res'
                        ? 'bg-amber-400 text-slate-950 shadow-sm'
                        : 'bg-white/[0.05] hover:bg-white/[0.1] text-slate-300'
                    }`}
                  >
                    Carré HD (2048)
                  </button>
                </div>

                {/* Dropdown Selector */}
                <select
                  value={selectedSize.id}
                  onChange={(e) => {
                    const found = DOWNLOAD_SIZES.find((s) => s.id === e.target.value);
                    if (found) setSelectedSize(found);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#080B12] border border-white/[0.12] text-white text-xs font-medium outline-none focus:border-amber-400 transition-colors"
                >
                  {DOWNLOAD_SIZES.map((size) => (
                    <option key={size.id} value={size.id}>
                      {size.label} — {size.dimensions}
                    </option>
                  ))}
                </select>

                <div className="p-2.5 rounded-xl bg-black/30 border border-white/[0.05] text-[11px] text-slate-300 leading-relaxed">
                  {selectedSize.isPresentation ? (
                    <span className="flex items-start gap-1.5 text-amber-200">
                      <Monitor className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                      <span>
                        <strong>Format Présentation Professionnelle (16:9)</strong> : génère un carton de présentation complet avec le logo agrandi, le nuancier chromatique HEX/RGB et les spécifications typographiques, parfait pour PowerPoint, Keynote & Pitch Decks.
                      </span>
                    </span>
                  ) : selectedSize.width >= 3840 ? (
                    <span className="flex items-start gap-1.5 text-amber-200">
                      <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                      <span>
                        <strong>Résolution Ultra 4K (3840 × 3840 px)</strong> : rendu ultra-haute densité 14.7 mégapixels calibré pour l'impression très grand format, la signalétique et les créations professionnelles.
                      </span>
                    </span>
                  ) : (
                    <span>{selectedSize.description}</span>
                  )}
                </div>

                {/* Notification toast if download finished */}
                {downloadSuccessMessage && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold animate-fade-in">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{downloadSuccessMessage}</span>
                  </div>
                )}

                {/* Save to Account / Private Gallery */}
                {user && (
                  <button
                    onClick={handleSaveToAccount}
                    disabled={isSaving || isAlreadySaved}
                    className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      isAlreadySaved
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 cursor-default'
                        : 'bg-white/[0.05] hover:bg-white/[0.1] border-white/[0.1] text-amber-300'
                    }`}
                  >
                    {isAlreadySaved ? (
                      <>
                        <BookmarkCheck className="w-4 h-4 text-emerald-400" />
                        <span>Enregistré dans votre espace</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-4 h-4" />
                        <span>{isSaving ? 'Enregistrement...' : 'Enregistrer dans « Mes logos »'}</span>
                      </>
                    )}
                  </button>
                )}

                {/* Primary Download Action Buttons */}
                <div className="space-y-2 pt-1">
                  <button
                    id="modal-download-png-btn"
                    onClick={() => handleDownload(false)}
                    disabled={isDownloading}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50"
                  >
                    <Download className="w-4 h-4" />
                    <span>
                      {selectedSize.isPresentation
                        ? 'Télécharger la Slide de Présentation (PNG 16:9)'
                        : selectedSize.width >= 3840
                        ? 'Télécharger en Ultra Résolution 4K (PNG)'
                        : 'Télécharger le Logo (PNG)'}
                    </span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      id="modal-download-transparent-btn"
                      onClick={() => handleDownload(true)}
                      disabled={isDownloading}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-slate-200 font-semibold text-xs transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50"
                    >
                      <span>⬜ PNG Transparent</span>
                    </button>

                    <button
                      id="modal-download-svg-btn"
                      onClick={handleExportSVG}
                      disabled={isDownloading}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-amber-300 font-semibold text-xs transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50"
                      title="Télécharger le fichier vectoriel SVG éditable"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Vectoriel (SVG)</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Action: Modifier / Créer une variante */}
              <div className="space-y-2">
                <button
                  onClick={() => onOpenRefinement(concept)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-amber-600/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-semibold text-xs sm:text-sm transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>✨ Créer une variante (Affiner)</span>
                </button>

                <button
                  onClick={() => onOpenBrandKit(concept)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 font-medium text-xs transition-all cursor-pointer"
                >
                  <Layers className="w-4 h-4 text-slate-400" />
                  <span>Créer mon mini kit de marque</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
