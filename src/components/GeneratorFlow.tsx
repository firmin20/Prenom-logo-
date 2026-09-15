import React, { useState } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, Check, Palette, Sparkle, AlertCircle } from 'lucide-react';
import { ColorSchemeId, LogoStyle } from '../types';
import { STYLES, COLOR_SCHEMES } from '../data/presets';

interface GeneratorFlowProps {
  initialName?: string;
  initialBusiness?: string;
  initialSlogan?: string;
  initialStyle?: LogoStyle;
  initialColor?: ColorSchemeId;
  onSubmit: (data: {
    firstName: string;
    business: string;
    slogan: string;
    style: LogoStyle;
    colorScheme: ColorSchemeId;
  }) => void;
  isLoading: boolean;
}

export const GeneratorFlow: React.FC<GeneratorFlowProps> = ({
  initialName = '',
  initialBusiness = '',
  initialSlogan = '',
  initialStyle = 'PREMIUM',
  initialColor = 'noir_or',
  onSubmit,
  isLoading,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [firstName, setFirstName] = useState(initialName);
  const [business, setBusiness] = useState(initialBusiness);
  const [slogan, setSlogan] = useState(initialSlogan);
  const [selectedStyle, setSelectedStyle] = useState<LogoStyle>(initialStyle);
  const [selectedColor, setSelectedColor] = useState<ColorSchemeId>(initialColor);
  const [validationError, setValidationError] = useState<string>('');

  // Handle Step 1 validation
  const handleNextFromStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim()) {
      setValidationError('Veuillez renseigner votre prénom pour lancer l’analyse.');
      return;
    }
    setValidationError('');
    setCurrentStep(2);
  };

  const handleNextFromStep2 = () => {
    setCurrentStep(3);
  };

  const handleFinalSubmit = () => {
    if (!firstName.trim()) {
      setCurrentStep(1);
      setValidationError('Veuillez entrer votre prénom.');
      return;
    }
    onSubmit({
      firstName: firstName.trim(),
      business: business.trim(),
      slogan: slogan.trim(),
      style: selectedStyle,
      colorScheme: selectedColor,
    });
  };

  return (
    <section id="generateur-logo" className="py-12 sm:py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step Progress Tracker */}
        <div className="mb-10 sm:mb-14">
          <div className="flex items-center justify-between relative max-w-xl mx-auto">
            {/* Background line */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/[0.08] -translate-y-1/2 -z-10" />
            <div
              className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-amber-500 to-amber-400 -translate-y-1/2 -z-10 transition-all duration-300"
              style={{
                width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%',
              }}
            />

            {/* Step 1 Node */}
            <button
              onClick={() => setCurrentStep(1)}
              className={`flex flex-col items-center gap-2 cursor-pointer transition-all ${
                currentStep >= 1 ? 'text-amber-400' : 'text-slate-500'
              }`}
            >
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all ${
                  currentStep === 1
                    ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-500/20'
                    : currentStep > 1
                    ? 'bg-amber-400 text-slate-950'
                    : 'bg-[#111827] text-slate-400 border border-white/[0.1]'
                }`}
              >
                {currentStep > 1 ? <Check className="w-4 h-4" /> : '1'}
              </div>
              <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase">
                Prénom
              </span>
            </button>

            {/* Step 2 Node */}
            <button
              onClick={() => {
                if (firstName.trim()) setCurrentStep(2);
              }}
              className={`flex flex-col items-center gap-2 cursor-pointer transition-all ${
                currentStep >= 2 ? 'text-amber-400' : 'text-slate-500'
              }`}
            >
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all ${
                  currentStep === 2
                    ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-500/20'
                    : currentStep > 2
                    ? 'bg-amber-400 text-slate-950'
                    : 'bg-[#111827] text-slate-400 border border-white/[0.1]'
                }`}
              >
                {currentStep > 2 ? <Check className="w-4 h-4" /> : '2'}
              </div>
              <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase">
                Style
              </span>
            </button>

            {/* Step 3 Node */}
            <button
              onClick={() => {
                if (firstName.trim()) setCurrentStep(3);
              }}
              className={`flex flex-col items-center gap-2 cursor-pointer transition-all ${
                currentStep >= 3 ? 'text-amber-400' : 'text-slate-500'
              }`}
            >
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all ${
                  currentStep === 3
                    ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-500/20'
                    : 'bg-[#111827] text-slate-400 border border-white/[0.1]'
                }`}
              >
                3
              </div>
              <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase">
                Couleurs
              </span>
            </button>
          </div>
        </div>

        {/* Form Container */}
        <div className="rounded-3xl bg-[#0C101A]/90 border border-white/[0.1] p-6 sm:p-10 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
          {/* STEP 1: ENTER YOUR NAME */}
          {currentStep === 1 && (
            <form onSubmit={handleNextFromStep1} className="space-y-8">
              <div className="text-center max-w-md mx-auto space-y-2">
                <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">
                  Étape 1 sur 3
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-outfit">
                  Quel est votre prénom ?
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Notre moteur analysera chaque lettre pour concevoir des logos uniques.
                </p>
              </div>

              {validationError && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              <div className="space-y-5 max-w-lg mx-auto">
                {/* First Name Input */}
                <div>
                  <label htmlFor="first-name-input" className="block text-xs font-semibold text-slate-300 mb-2">
                    Votre prénom <span className="text-amber-400">*</span>
                  </label>
                  <input
                    id="first-name-input"
                    type="text"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      if (validationError) setValidationError('');
                    }}
                    placeholder="Ex. Firmin"
                    autoFocus
                    required
                    className="w-full px-5 py-4 rounded-xl bg-[#080B12] border border-white/[0.12] focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-white placeholder-slate-500 text-base sm:text-lg font-medium outline-none transition-all shadow-inner"
                  />
                </div>

                {/* Optional Activity */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="business-input" className="block text-xs font-semibold text-slate-300">
                      Votre activité ou entreprise
                    </label>
                    <span className="text-[11px] text-slate-500">Optionnel</span>
                  </div>
                  <input
                    id="business-input"
                    type="text"
                    value={business}
                    onChange={(e) => setBusiness(e.target.value)}
                    placeholder="Ex. Digital Studio"
                    className="w-full px-5 py-3.5 rounded-xl bg-[#080B12] border border-white/[0.12] focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-white placeholder-slate-500 text-sm sm:text-base font-normal outline-none transition-all"
                  />
                </div>

                {/* Optional Slogan */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="slogan-input" className="block text-xs font-semibold text-slate-300">
                      Votre slogan
                    </label>
                    <span className="text-[11px] text-slate-500">Optionnel</span>
                  </div>
                  <input
                    id="slogan-input"
                    type="text"
                    value={slogan}
                    onChange={(e) => setSlogan(e.target.value)}
                    placeholder="Ex. Créons votre avenir numérique"
                    className="w-full px-5 py-3.5 rounded-xl bg-[#080B12] border border-white/[0.12] focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-white placeholder-slate-500 text-sm sm:text-base font-normal outline-none transition-all"
                  />
                </div>
              </div>

              {/* Step 1 Button */}
              <div className="flex justify-center pt-4">
                <button
                  id="step-1-continue-btn"
                  type="submit"
                  className="w-full max-w-sm inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm sm:text-base tracking-wider uppercase shadow-[0_0_25px_rgba(245,158,11,0.25)] transition-all active:scale-[0.98] cursor-pointer"
                >
                  <span>CONTINUER</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: CHOOSE YOUR STYLE */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div className="text-center max-w-md mx-auto space-y-2">
                <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">
                  Étape 2 sur 3
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-outfit">
                  Choisissez votre style
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Sélectionnez l'orientation stylistique pour vos 4 concepts de logos.
                </p>
              </div>

              {/* 8 Style Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {STYLES.map((style) => {
                  const isSelected = selectedStyle === style.id;
                  const initialLetter = (firstName || 'P')[0].toUpperCase();

                  return (
                    <div
                      key={style.id}
                      id={`style-card-${style.id.toLowerCase()}`}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`relative rounded-2xl p-5 border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#141C2E] border-amber-400 ring-2 ring-amber-400/25 shadow-[0_0_25px_rgba(245,158,11,0.15)]'
                          : 'bg-[#090D16] border-white/[0.08] hover:border-white/[0.2] hover:bg-[#0D1320]'
                      }`}
                    >
                      <div>
                        {/* Style Visual Preview Header */}
                        <div
                          className="h-20 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden border border-white/[0.05]"
                          style={{ backgroundColor: style.visualPreview.bgColor }}
                        >
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg"
                            style={{
                              border: `2px solid ${style.visualPreview.accentColor}`,
                              color: style.visualPreview.accentColor,
                              fontFamily: style.id === 'LUXURY' ? 'Cinzel' : 'Outfit',
                            }}
                          >
                            {initialLetter}
                          </div>

                          {/* Selected checkmark pill */}
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          )}
                        </div>

                        {/* Title & Tagline */}
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-base font-bold text-white font-outfit">
                            {style.name}
                          </h4>
                        </div>
                        <p className="text-[11px] text-amber-300/90 font-medium mb-2">
                          {style.tagline}
                        </p>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {style.description}
                        </p>
                      </div>

                      {/* Keywords */}
                      <div className="mt-4 pt-3 border-t border-white/[0.06] flex flex-wrap gap-1">
                        {style.keywords.map((kw) => (
                          <span
                            key={kw}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.05] text-slate-300 font-medium"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Navigation buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 font-semibold text-xs sm:text-sm cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Retour</span>
                </button>

                <button
                  id="step-2-continue-btn"
                  type="button"
                  onClick={handleNextFromStep2}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all cursor-pointer"
                >
                  <span>CONTINUER VERS LES COULEURS</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: COLOR SELECTION */}
          {currentStep === 3 && (
            <div className="space-y-8">
              <div className="text-center max-w-md mx-auto space-y-2">
                <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">
                  Étape 3 sur 3
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-outfit">
                  Palette & Couleurs
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Choisissez une ambiance chromatique ou laissez l'IA déterminer l'harmonie parfaite.
                </p>
              </div>

              {/* Color options grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {COLOR_SCHEMES.map((scheme) => {
                  const isSelected = selectedColor === scheme.id;
                  const isAuto = scheme.id === 'auto';

                  return (
                    <div
                      key={scheme.id}
                      id={`color-option-${scheme.id}`}
                      onClick={() => setSelectedColor(scheme.id)}
                      className={`relative rounded-2xl p-5 border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#141C2E] border-amber-400 ring-2 ring-amber-400/25 shadow-[0_0_20px_rgba(245,158,11,0.15)]'
                          : 'bg-[#090D16] border-white/[0.08] hover:border-white/[0.2] hover:bg-[#0D1320]'
                      }`}
                    >
                      <div>
                        {/* Header Swatch */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {isAuto ? (
                              <div className="w-7 h-7 rounded-full bg-gradient-to-r from-amber-400 via-sky-400 to-rose-400 flex items-center justify-center text-slate-950">
                                <Sparkle className="w-3.5 h-3.5 fill-current" />
                              </div>
                            ) : (
                              <div className="flex items-center -space-x-1.5">
                                <div
                                  className="w-6 h-6 rounded-full border border-black/30 shadow-sm"
                                  style={{ backgroundColor: scheme.colors.primary }}
                                />
                                <div
                                  className="w-6 h-6 rounded-full border border-black/30 shadow-sm"
                                  style={{ backgroundColor: scheme.colors.secondary }}
                                />
                                <div
                                  className="w-6 h-6 rounded-full border border-black/30 shadow-sm"
                                  style={{ backgroundColor: scheme.colors.background }}
                                />
                              </div>
                            )}

                            <span className="text-sm font-bold text-white font-outfit">
                              {scheme.name}
                            </span>
                          </div>

                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          )}
                        </div>

                        <p className="text-xs text-slate-400 leading-relaxed">
                          {scheme.description}
                        </p>
                      </div>

                      {/* Color Preview Bar */}
                      <div className="mt-4 pt-3 border-t border-white/[0.06]">
                        {isAuto ? (
                          <div className="h-2 rounded-full bg-gradient-to-r from-amber-400 via-sky-400 to-rose-400" />
                        ) : (
                          <div className="flex h-2 rounded-full overflow-hidden">
                            <div className="w-2/4" style={{ backgroundColor: scheme.colors.primary }} />
                            <div className="w-1/4" style={{ backgroundColor: scheme.colors.secondary }} />
                            <div className="w-1/4" style={{ backgroundColor: scheme.colors.accent }} />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Summary recap before generation */}
              <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-amber-400" />
                  <span>
                    Création pour <strong className="text-white font-semibold">{firstName || 'Prénom'}</strong> • Style <strong className="text-amber-300">{selectedStyle}</strong> • 4 concepts originaux
                  </span>
                </div>
                <span className="text-slate-400">Temps estimé : ~3 à 5 secondes</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 font-semibold text-xs sm:text-sm cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Retour</span>
                </button>

                <button
                  id="final-create-logo-btn"
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={isLoading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-10 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-base tracking-wide shadow-[0_0_35px_rgba(245,158,11,0.3)] hover:shadow-[0_0_45px_rgba(245,158,11,0.5)] transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-5 h-5 fill-slate-950" />
                  <span>✨ CRÉER MON LOGO</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
