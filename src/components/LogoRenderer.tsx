import React, { useRef } from 'react';
import { LogoConcept } from '../types';

interface LogoRendererProps {
  concept: LogoConcept;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBackground?: boolean;
  className?: string;
  id?: string;
}

export const LogoRenderer: React.FC<LogoRendererProps> = ({
  concept,
  size = 'md',
  showBackground = true,
  className = '',
  id,
}) => {
  const { colors, typography, brandName, slogan, symbolData, aiImageUrl, conceptType } = concept;

  // Sizing styles
  const sizeClasses = {
    sm: {
      container: 'p-4 min-h-[140px]',
      symbolSize: 'w-10 h-10',
      title: 'text-base tracking-[0.2em]',
      slogan: 'text-[9px] tracking-[0.2em] mt-1',
      gap: 'gap-2',
    },
    md: {
      container: 'p-6 min-h-[220px]',
      symbolSize: 'w-16 h-16',
      title: 'text-xl sm:text-2xl tracking-[0.25em]',
      slogan: 'text-xs tracking-[0.25em] mt-1.5',
      gap: 'gap-3.5',
    },
    lg: {
      container: 'p-8 sm:p-12 min-h-[320px]',
      symbolSize: 'w-24 h-24 sm:w-28 sm:h-28',
      title: 'text-2xl sm:text-4xl tracking-[0.3em]',
      slogan: 'text-xs sm:text-sm tracking-[0.3em] mt-2.5',
      gap: 'gap-5',
    },
    xl: {
      container: 'p-12 sm:p-16 min-h-[420px]',
      symbolSize: 'w-32 h-32 sm:w-40 sm:h-40',
      title: 'text-3xl sm:text-5xl tracking-[0.35em]',
      slogan: 'text-sm sm:text-base tracking-[0.35em] mt-3',
      gap: 'gap-6',
    },
  }[size];

  const initial = (brandName || 'P')[0].toUpperCase();
  const secondInitial = brandName.length > 1 ? brandName[1].toUpperCase() : '';

  // Render SVG Symbol based on concept type
  const renderSymbol = () => {
    if (aiImageUrl) {
      return (
        <img
          src={aiImageUrl}
          alt={`Symbole ${concept.title}`}
          referrerPolicy="no-referrer"
          className={`${sizeClasses.symbolSize} object-contain rounded-lg shadow-sm`}
        />
      );
    }

    // Vector Geometric Symbols
    switch (conceptType) {
      case 'Monogramme':
        return (
          <div className={`relative ${sizeClasses.symbolSize} flex items-center justify-center`}>
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full drop-shadow-sm"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="50"
                cy="50"
                r="44"
                stroke={colors.primary}
                strokeWidth="2.5"
                strokeDasharray="4 2"
                opacity="0.5"
              />
              <rect
                x="15"
                y="15"
                width="70"
                height="70"
                rx="14"
                stroke={colors.primary}
                strokeWidth="3.5"
                fill="none"
              />
              <text
                x="50"
                y="63"
                textAnchor="middle"
                fill={colors.primary}
                fontSize="42"
                fontWeight="700"
                fontFamily="Outfit, sans-serif"
                style={{ letterSpacing: '-0.05em' }}
              >
                {initial}
              </text>
            </svg>
          </div>
        );

      case 'Symbole abstrait':
        return (
          <div className={`relative ${sizeClasses.symbolSize} flex items-center justify-center`}>
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full drop-shadow-sm"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Prism abstract geometry */}
              <polygon
                points="50,12 88,78 12,78"
                stroke={colors.primary}
                strokeWidth="4"
                fill="none"
                strokeLinejoin="round"
              />
              <polygon
                points="50,28 76,74 24,74"
                stroke={colors.secondary}
                strokeWidth="2.5"
                fill="none"
                opacity="0.8"
                strokeLinejoin="round"
              />
              <circle cx="50" cy="56" r="6" fill={colors.accent || colors.primary} />
            </svg>
          </div>
        );

      case 'Wordmark typographique':
        return (
          <div className={`relative ${sizeClasses.symbolSize} flex items-center justify-center`}>
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full drop-shadow-sm"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="20" y1="50" x2="80" y2="50" stroke={colors.primary} strokeWidth="3" />
              <circle cx="50" cy="50" r="14" fill={colors.background} stroke={colors.primary} strokeWidth="3" />
              <polygon points="50,42 58,54 42,54" fill={colors.primary} />
            </svg>
          </div>
        );

      case 'Lettre + Symbole fusion':
      default:
        return (
          <div className={`relative ${sizeClasses.symbolSize} flex items-center justify-center`}>
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full drop-shadow-sm"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Modern Shield / Crest with intertwined letters */}
              <path
                d="M50 12 L85 26 V54 C85 74 50 88 50 88 C50 88 15 74 15 54 V26 L50 12 Z"
                stroke={colors.primary}
                strokeWidth="3.5"
                fill="none"
                strokeLinejoin="round"
              />
              <text
                x="44"
                y="58"
                textAnchor="middle"
                fill={colors.primary}
                fontSize="32"
                fontWeight="700"
                fontFamily="Outfit, sans-serif"
              >
                {initial}
              </text>
              {secondInitial && (
                <text
                  x="58"
                  y="66"
                  textAnchor="middle"
                  fill={colors.secondary}
                  fontSize="24"
                  fontWeight="600"
                  fontFamily="Cinzel, serif"
                  opacity="0.9"
                >
                  {secondInitial}
                </text>
              )}
            </svg>
          </div>
        );
    }
  };

  const getFontFamilyClass = () => {
    switch (typography.fontFamily) {
      case 'Cinzel':
        return 'font-cinzel';
      case 'Space Grotesk':
        return 'font-space';
      case 'Outfit':
        return 'font-outfit';
      case 'Plus Jakarta Sans':
      default:
        return 'font-jakarta';
    }
  };

  return (
    <div
      id={id}
      className={`relative rounded-xl flex flex-col items-center justify-center text-center overflow-hidden transition-all duration-300 select-none ${sizeClasses.container} ${className}`}
      style={{
        backgroundColor: showBackground ? colors.background : 'transparent',
        border: showBackground ? `1px solid ${colors.secondary}22` : 'none',
      }}
    >
      {/* Subtle radial ambient glow matching primary color */}
      {showBackground && (
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: `radial-gradient(circle at 50% 45%, ${colors.primary}33 0%, transparent 70%)`,
          }}
        />
      )}

      {/* Main Logo Composition */}
      <div className={`relative z-10 flex flex-col items-center ${sizeClasses.gap}`}>
        {/* Symbol */}
        {renderSymbol()}

        {/* Wordmark & Slogan */}
        <div className="flex flex-col items-center max-w-full px-2">
          <span
            className={`block font-bold leading-tight uppercase whitespace-nowrap ${getFontFamilyClass()} ${sizeClasses.title}`}
            style={{
              color: colors.text,
              letterSpacing: typography.letterSpacing || '0.25em',
            }}
          >
            {brandName}
          </span>

          {slogan && (
            <span
              className={`block font-medium uppercase truncate max-w-[280px] sm:max-w-md ${sizeClasses.slogan}`}
              style={{
                color: colors.secondary,
              }}
            >
              {slogan}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
