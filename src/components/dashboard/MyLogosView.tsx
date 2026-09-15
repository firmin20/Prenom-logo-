import React, { useState } from 'react';
import {
  Sparkles,
  Download,
  Trash2,
  ExternalLink,
  Layers,
  Calendar,
  Eye,
  Sliders,
  AlertCircle,
  FileCheck,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { SavedLogoItem, LogoConcept } from '../../types';
import { LogoRenderer } from '../LogoRenderer';

interface MyLogosViewProps {
  onOpenDetailModal: (concept: LogoConcept) => void;
  onOpenBrandKitModal: (concept: LogoConcept) => void;
  onRefineLogo: (concept: LogoConcept) => void;
  onStartNewLogo: () => void;
}

export const MyLogosView: React.FC<MyLogosViewProps> = ({
  onOpenDetailModal,
  onOpenBrandKitModal,
  onRefineLogo,
  onStartNewLogo,
}) => {
  const { savedLogos, loadingLogos, deleteSavedLogo } = useAuth();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteSavedLogo(id);
      setDeleteConfirmId(null);
    } catch (err) {
      console.error('Error deleting logo:', err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-outfit">
            Mes Logos Sauvegardés
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Retrouvez, téléchargez en 4K et modifiez toutes vos créations de marque.
          </p>
        </div>

        <button
          onClick={onStartNewLogo}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Créer un nouveau logo</span>
        </button>
      </div>

      {/* Loading state */}
      {loadingLogos && (
        <div className="py-20 text-center space-y-3">
          <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-400">Chargement de votre galerie privée...</p>
        </div>
      )}

      {/* Empty State */}
      {!loadingLogos && savedLogos.length === 0 && (
        <div className="py-16 sm:py-24 text-center max-w-md mx-auto space-y-6 rounded-3xl bg-[#0B0F1B] border border-white/[0.08] p-8">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
            <Layers className="w-7 h-7" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white font-outfit">
              Aucun logo sauvegardé pour le moment
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Générez votre premier logo à partir de votre prénom et enregistrez-le dans votre collection privée.
            </p>
          </div>
          <button
            onClick={onStartNewLogo}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Créer mon premier logo</span>
          </button>
        </div>
      )}

      {/* Logos Grid */}
      {!loadingLogos && savedLogos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedLogos.map((item) => {
            const concept = item.concept;
            const dateStr = new Date(item.createdAt).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            });

            return (
              <div
                key={item.id}
                className="group rounded-2xl bg-[#0D1220] border border-white/[0.08] hover:border-amber-500/30 transition-all overflow-hidden flex flex-col justify-between shadow-lg"
              >
                <div>
                  {/* Visual Renderer Container */}
                  <div className="relative aspect-square w-full overflow-hidden bg-black/40 border-b border-white/[0.06]">
                    <LogoRenderer concept={concept} />

                    {/* Quick overlay buttons */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-xs p-4">
                      <button
                        onClick={() => onOpenDetailModal(concept)}
                        className="p-3 rounded-xl bg-white text-slate-950 hover:scale-105 transition-transform font-bold text-xs flex items-center gap-1.5 shadow-xl cursor-pointer"
                        title="Voir en grand et télécharger"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Aperçu & 4K</span>
                      </button>

                      <button
                        onClick={() => onOpenBrandKitModal(concept)}
                        className="p-3 rounded-xl bg-amber-500 text-slate-950 hover:scale-105 transition-transform font-bold text-xs flex items-center gap-1.5 shadow-xl cursor-pointer"
                        title="Kit de marque"
                      >
                        <Layers className="w-4 h-4" />
                        <span>Kit de marque</span>
                      </button>
                    </div>
                  </div>

                  {/* Info Details */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-base font-bold text-white font-outfit">
                          {concept.brandName}
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          {concept.business || concept.title}
                        </p>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.06] text-amber-300 font-mono">
                        {concept.style}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {dateStr}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                        4K Ready
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="px-5 py-3.5 bg-black/25 border-t border-white/[0.04] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenDetailModal(concept)}
                      className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Télécharger</span>
                    </button>

                    <button
                      onClick={() => onRefineLogo(concept)}
                      className="text-xs font-semibold text-slate-400 hover:text-slate-200 flex items-center gap-1 ml-3 cursor-pointer"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Ajuster</span>
                    </button>
                  </div>

                  {/* Delete button with confirmation */}
                  {deleteConfirmId === item.id ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={deletingId === item.id}
                        className="text-[11px] px-2 py-1 rounded bg-red-500 text-white font-bold cursor-pointer hover:bg-red-400"
                      >
                        Confirmer
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="text-[11px] px-2 py-1 rounded bg-white/[0.08] text-slate-300 hover:bg-white/[0.15] cursor-pointer"
                      >
                        Annuler
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirmId(item.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
