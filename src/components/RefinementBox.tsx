import React, { useState } from 'react';
import { X, Sparkles, Send, Check } from 'lucide-react';
import { LogoConcept } from '../types';
import { LogoRenderer } from './LogoRenderer';

interface RefinementBoxProps {
  concept: LogoConcept;
  onClose: () => void;
  onSubmitRefinement: (concept: LogoConcept, instruction: string) => void;
  isLoading: boolean;
}

export const RefinementBox: React.FC<RefinementBoxProps> = ({
  concept,
  onClose,
  onSubmitRefinement,
  isLoading,
}) => {
  const [instruction, setInstruction] = useState('');

  const quickActions = [
    'Plus minimaliste',
    'Plus premium',
    'Plus moderne',
    'Plus professionnel',
    'Plus audacieux',
    'Simplifier le symbole',
    'Modifier les couleurs',
    'Utiliser uniquement les initiales',
    'Créer une version monochrome',
  ];

  const handleQuickAction = (actionText: string) => {
    setInstruction(actionText);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!instruction.trim()) return;
    onSubmitRefinement(concept, instruction.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#0B0F19] border border-white/[0.12] shadow-2xl p-6 sm:p-8 space-y-6 my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-outfit">
                Que voulez-vous modifier ?
              </h3>
              <p className="text-xs text-slate-400">
                Ajustez le Concept {concept.conceptNumber} ({concept.title})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Small thumbnail of active concept */}
        <div className="p-3 rounded-xl bg-[#070A12] border border-white/[0.06] flex items-center gap-4">
          <div className="w-28 shrink-0">
            <LogoRenderer concept={concept} size="sm" />
          </div>
          <div className="text-xs space-y-1">
            <span className="font-semibold text-white block">{concept.title}</span>
            <p className="text-slate-400 line-clamp-2">{concept.shortDescription}</p>
          </div>
        </div>

        {/* Suggested Quick Actions */}
        <div className="space-y-2.5">
          <span className="text-xs font-semibold text-slate-300">
            Actions rapides suggérées :
          </span>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action) => {
              const isSelected = instruction === action;
              return (
                <button
                  key={action}
                  type="button"
                  onClick={() => handleQuickAction(action)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 border border-white/[0.06]'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  <span>{action}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom prompt input form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="refinement-input" className="block text-xs font-semibold text-slate-300 mb-1.5">
              Votre consigne précise d'ajustement
            </label>
            <textarea
              id="refinement-input"
              rows={3}
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="Ex. Fais-le plus minimaliste et plus luxueux."
              className="w-full px-4 py-3 rounded-xl bg-[#070A12] border border-white/[0.12] focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-white placeholder-slate-500 text-sm outline-none transition-all resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] text-slate-300 text-xs font-semibold cursor-pointer"
            >
              Annuler
            </button>

            <button
              id="submit-refinement-btn"
              type="submit"
              disabled={isLoading || !instruction.trim()}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs tracking-wide shadow-md transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isLoading ? 'Ajustement en cours...' : 'Appliquer la modification'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
