import { ColorSchemeId, LetterAnalysis, LogoConcept, LogoStyle, VectorSymbolData } from '../types';
import { COLOR_SCHEMES } from '../data/presets';

export function analyzeNameLetters(name: string): LetterAnalysis {
  const clean = (name || 'PRÉNOM').trim().toUpperCase();
  const first = clean[0] || 'A';
  const cleanLetters = clean.replace(/[^A-Z]/g, '');
  const length = cleanLetters.length || 1;

  // Find strong consonants / repeated
  const counts: Record<string, number> = {};
  for (const char of cleanLetters) {
    counts[char] = (counts[char] || 0) + 1;
  }

  const strongLetters = Object.keys(counts).filter((c) => counts[c] > 1);
  if (cleanLetters.length > 1 && !strongLetters.includes(cleanLetters[1])) {
    strongLetters.push(cleanLetters[1]);
  }
  if (cleanLetters.length > 2 && !strongLetters.includes(cleanLetters[cleanLetters.length - 1])) {
    strongLetters.push(cleanLetters[cleanLetters.length - 1]);
  }

  const monogramPairs = [
    first,
    cleanLetters.length > 1 ? `${first}${cleanLetters[1]}` : first,
    cleanLetters.length > 2 ? `${first}${cleanLetters[cleanLetters.length - 1]}` : first,
  ];

  let dominantSymmetry: 'vertical' | 'horizontal' | 'radial' | 'asymmetric' = 'vertical';
  if (['A', 'M', 'T', 'V', 'W', 'Y', 'U', 'O', 'I', 'X', 'H'].includes(first)) {
    dominantSymmetry = 'vertical';
  } else if (['B', 'C', 'D', 'E', 'K'].includes(first)) {
    dominantSymmetry = 'horizontal';
  } else if (['O', 'X', 'S', 'N', 'Z'].includes(first)) {
    dominantSymmetry = 'radial';
  } else {
    dominantSymmetry = 'asymmetric';
  }

  return {
    name: clean,
    length,
    initials: first,
    strongLetters: strongLetters.slice(0, 3),
    dominantSymmetry,
    monogramPairs,
    vibeSummary: `Analyse phonétique et typographique : structure à ${length} lettres, ancrée autour de l'initiale '${first}'. Potentiel fort pour monogramme géométrique et symbole statutaire.`,
  };
}

export function getPaletteForStyleAndColor(style: LogoStyle, colorSchemeId: ColorSchemeId) {
  if (colorSchemeId === 'auto') {
    switch (style) {
      case 'LUXURY':
      case 'PREMIUM':
        return COLOR_SCHEMES.find((c) => c.id === 'noir_or')!.colors;
      case 'TECHNOLOGY':
      case 'MODERN':
        return COLOR_SCHEMES.find((c) => c.id === 'bleu')!.colors;
      case 'CREATIVE':
        return COLOR_SCHEMES.find((c) => c.id === 'violet')!.colors;
      case 'BUSINESS':
        return COLOR_SCHEMES.find((c) => c.id === 'vert')!.colors;
      case 'SIGNATURE':
        return COLOR_SCHEMES.find((c) => c.id === 'orange')!.colors;
      case 'MINIMAL':
      default:
        return COLOR_SCHEMES.find((c) => c.id === 'noir_blanc')!.colors;
    }
  }

  const found = COLOR_SCHEMES.find((c) => c.id === colorSchemeId);
  return found ? found.colors : COLOR_SCHEMES[0].colors;
}

export function generateGeometricSymbol(
  initial: string,
  conceptType: 'Monogramme' | 'Symbole abstrait' | 'Wordmark typographique' | 'Lettre + Symbole fusion',
  style: LogoStyle
): VectorSymbolData {
  const init = (initial || 'P')[0].toUpperCase();

  switch (conceptType) {
    case 'Monogramme':
      return {
        type: 'monogram',
        monogramText: init,
        viewBox: '0 0 120 120',
        strokeWidth: style === 'MINIMAL' ? 3 : 5,
        symbolAccent: style === 'LUXURY' ? 'crest' : 'hexagon',
      };

    case 'Symbole abstrait':
      return {
        type: 'abstract',
        monogramText: init,
        viewBox: '0 0 120 120',
        strokeWidth: 4,
        symbolAccent: 'prism',
      };

    case 'Wordmark typographique':
      return {
        type: 'path',
        monogramText: init,
        viewBox: '0 0 120 120',
        strokeWidth: 3,
        symbolAccent: 'minimal-bar',
      };

    case 'Lettre + Symbole fusion':
    default:
      return {
        type: 'interlocking',
        monogramText: init,
        viewBox: '0 0 120 120',
        strokeWidth: 4,
        symbolAccent: 'shield',
      };
  }
}

export function createProceduralConcepts(
  firstName: string,
  business: string = '',
  slogan: string = '',
  style: LogoStyle = 'PREMIUM',
  colorSchemeId: ColorSchemeId = 'noir_or'
): LogoConcept[] {
  const analysis = analyzeNameLetters(firstName);
  const colors = getPaletteForStyleAndColor(style, colorSchemeId);
  const brandName = (firstName || 'PRÉNOM').trim().toUpperCase();
  const init = analysis.initials;
  const secondLetter = analysis.name[1] || 'O';
  const pair = `${init}${secondLetter}`;

  const fonts: Record<LogoStyle, { fontFamily: 'Outfit' | 'Cinzel' | 'Plus Jakarta Sans' | 'Space Grotesk'; fontWeight: '300' | '400' | '600' | '700' | '800'; letterSpacing: string; uppercase: boolean; styleTag: string }> = {
    LUXURY: { fontFamily: 'Cinzel', fontWeight: '700', letterSpacing: '0.25em', uppercase: true, styleTag: 'Serif Statutaire Haut de Gamme' },
    PREMIUM: { fontFamily: 'Outfit', fontWeight: '600', letterSpacing: '0.2em', uppercase: true, styleTag: 'Sans-Serif Géométrique Équilibrée' },
    MINIMAL: { fontFamily: 'Plus Jakarta Sans', fontWeight: '400', letterSpacing: '0.28em', uppercase: true, styleTag: 'Suisse Néo-Grotesque Ultra Pure' },
    MODERN: { fontFamily: 'Outfit', fontWeight: '700', letterSpacing: '0.15em', uppercase: true, styleTag: 'Moderne Tranché Haute Visibilité' },
    TECHNOLOGY: { fontFamily: 'Space Grotesk', fontWeight: '600', letterSpacing: '0.18em', uppercase: true, styleTag: 'Tech Modulaire Précise' },
    CREATIVE: { fontFamily: 'Outfit', fontWeight: '600', letterSpacing: '0.22em', uppercase: true, styleTag: 'Typographie Créative & Rythmée' },
    BUSINESS: { fontFamily: 'Plus Jakarta Sans', fontWeight: '700', letterSpacing: '0.16em', uppercase: true, styleTag: 'Corporate Rigoureux & Pérenne' },
    SIGNATURE: { fontFamily: 'Cinzel', fontWeight: '600', letterSpacing: '0.24em', uppercase: true, styleTag: 'Distinction Personnelle & Caractère' },
  };

  const typography = fonts[style] || fonts.PREMIUM;

  const concept1: LogoConcept = {
    id: `concept-1-${Date.now()}`,
    conceptNumber: 1,
    conceptType: 'Monogramme',
    title: `Monogramme Architectural [${init}]`,
    style,
    shortDescription: `Construction géométrique puissante articulée autour de l'initiale '${init}'.`,
    designExplanation: `Ce concept privilégie la force iconique immédiate. L'initiale '${init}' est stylisée avec des proportions d'or, formant un emblème autonome idéal pour les favicons, photos de profil et broderies.`,
    brandName,
    slogan: slogan || (business ? business : undefined),
    colors,
    typography,
    symbolData: generateGeometricSymbol(init, 'Monogramme', style),
    recommendedUsage: ['Photo de profil WhatsApp / LinkedIn', 'Favicon & App Icon', 'Sceau de cire / Gravure', 'En-tête de document'],
    designBrief: {
      symbol: `Monogramme géométrique épuré centré sur la lettre ${init}`,
      composition: 'Symbole centré au-dessus de la typographie de marque espacée',
      negativeSpace: 'Découpes nettes à 45 degrés dans les fûts de la lettre',
      background: 'Fond sombre mat uni sans texture photographique',
      brandDirection: 'Élégance statutaire et mémorabilité immédiate',
    },
    brandKit: {
      primaryLogoConcept: `Monogramme ${init} centré`,
      secondaryLayout: 'horizontal',
      faviconSymbol: init,
      monochromeDark: { bg: '#080B10', mark: '#FFFFFF', text: '#FFFFFF' },
      monochromeLight: { bg: '#F8FAFC', mark: '#0F172A', text: '#0F172A' },
      palette: [
        { name: 'Primaire Prestige', hex: colors.primary, role: 'Symbole & Accents majeurs' },
        { name: 'Fond Profond', hex: colors.background, role: 'Arrière-plan signature' },
        { name: 'Texte Clair', hex: colors.text, role: 'Typographie du prénom' },
        { name: 'Nuance Support', hex: colors.secondary, role: 'Slogans et bordures' },
      ],
      typographySpecs: {
        headingFont: typography.fontFamily,
        subheadFont: 'Plus Jakarta Sans',
        bodyFont: 'Plus Jakarta Sans',
        rationale: 'Harmonie géométrique assurant une lisibilité maximale à toutes échelles.',
      },
    },
  };

  const concept2: LogoConcept = {
    id: `concept-2-${Date.now()}`,
    conceptNumber: 2,
    conceptType: 'Symbole abstrait',
    title: `Symbole Épure Minimal [${init} + Prisme]`,
    style,
    shortDescription: `Symbole abstrait contemporain inspiré des fûts de la lettre '${init}'.`,
    designExplanation: `Inspiré du design d'identité scandinave et suisse. Le symbole transcende la simple lettre en un signe distinctif intemporel, évoquant l'élévation, la rigueur et l'excellence.`,
    brandName,
    slogan: slogan || (business ? business : undefined),
    colors,
    typography: {
      ...typography,
      letterSpacing: '0.3em',
    },
    symbolData: generateGeometricSymbol(init, 'Symbole abstrait', style),
    recommendedUsage: ['Site web / En-tête', 'Cartes de visite de prestige', 'Goodies & Packaging', 'Présentations investisseurs'],
    designBrief: {
      symbol: `Symbole abstrait triangulaire/prismatique intégrant l'essence de ${init}`,
      composition: 'Logo centré avec respiration généreuse',
      negativeSpace: 'Jeux de lignes continues et d’espaces d’air purs',
      background: 'Fond monochrome uni haute densité',
      brandDirection: 'Minimalisme d’avant-garde sans artifices',
    },
    brandKit: {
      primaryLogoConcept: `Prisme abstrait ${init}`,
      secondaryLayout: 'horizontal',
      faviconSymbol: `${init}`,
      monochromeDark: { bg: '#080B10', mark: '#FFFFFF', text: '#FFFFFF' },
      monochromeLight: { bg: '#F8FAFC', mark: '#0F172A', text: '#0F172A' },
      palette: [
        { name: 'Signature', hex: colors.primary, role: 'Symbole central' },
        { name: 'Secondaire', hex: colors.secondary, role: 'Éléments secondaires' },
        { name: 'Noir Ébène', hex: colors.background, role: 'Toile de fond' },
        { name: 'Blanc Pur', hex: colors.text, role: 'Nom de marque' },
      ],
      typographySpecs: {
        headingFont: typography.fontFamily,
        subheadFont: 'Outfit',
        bodyFont: 'Plus Jakarta Sans',
        rationale: 'Espacement large des capitales pour une présence aérée et prestigieuse.',
      },
    },
  };

  const concept3: LogoConcept = {
    id: `concept-3-${Date.now()}`,
    conceptNumber: 3,
    conceptType: 'Wordmark typographique',
    title: `Wordmark Typographique [${brandName}]`,
    style,
    shortDescription: `Identité typographique pure avec traitement sur-mesure du lettrage.`,
    designExplanation: `Ce concept met l'accent sur le prénom dans son intégralité. Chaque lettre bénéficie d'un crénage millimétré, complété par un séparateur ou accent statutaire qui ancre la signature de marque.`,
    brandName,
    slogan: slogan || (business ? business : undefined),
    colors,
    typography: {
      ...typography,
      fontWeight: '800',
      letterSpacing: '0.35em',
    },
    symbolData: generateGeometricSymbol(init, 'Wordmark typographique', style),
    recommendedUsage: ['Enseigne & Façade', 'Bannière de site internet', 'Signature d’e-mail', 'Signature de document officiel'],
    designBrief: {
      symbol: `Barre de mesure statutaire et lettrage sculpté de ${brandName}`,
      composition: 'Disposition horizontale majestueuse',
      negativeSpace: 'Rythme harmonique entre les fûts typographiques',
      background: 'Fond sombre épuré',
      brandDirection: 'Maison de marque haut de gamme et autorité',
    },
    brandKit: {
      primaryLogoConcept: `Wordmark intégral ${brandName}`,
      secondaryLayout: 'stacked',
      faviconSymbol: init,
      monochromeDark: { bg: '#080B10', mark: '#FFFFFF', text: '#FFFFFF' },
      monochromeLight: { bg: '#F8FAFC', mark: '#0F172A', text: '#0F172A' },
      palette: [
        { name: 'Or / Accent', hex: colors.primary, role: 'Accent typographique' },
        { name: 'Fond Profond', hex: colors.background, role: 'Fond de scène' },
        { name: 'Texte Lumineux', hex: colors.text, role: 'Prénom en majesté' },
        { name: 'Gris Ardoise', hex: colors.secondary, role: 'Slogan discret' },
      ],
      typographySpecs: {
        headingFont: typography.fontFamily,
        subheadFont: 'Space Grotesk',
        bodyFont: 'Plus Jakarta Sans',
        rationale: 'Impact immédiat digne des grandes maisons de luxe et cabinets de conseil.',
      },
    },
  };

  const concept4: LogoConcept = {
    id: `concept-4-${Date.now()}`,
    conceptNumber: 4,
    conceptType: 'Lettre + Symbole fusion',
    title: `Fusion Écusson & Lettres [${pair}]`,
    style,
    shortDescription: `Fusion organique des lettres clés '${init}' et '${secondLetter}' dans un blason moderne.`,
    designExplanation: `Une alliance magistrale entre la tradition héraldique et la géométrie contemporaine. Les lettres clés s'entrelacent dans un cadre protecteur, garantissant une identification immédiate sur tous supports.`,
    brandName,
    slogan: slogan || (business ? business : undefined),
    colors,
    typography,
    symbolData: generateGeometricSymbol(pair, 'Lettre + Symbole fusion', style),
    recommendedUsage: ['Écusson de vêtement / Broderie', 'Tampon officiel / Factures', 'Badge réseau social', 'Carte de membre'],
    designBrief: {
      symbol: `Blason géométrique moderne fusionnant les lettres ${pair}`,
      composition: 'Emblème symétrique encadrant la marque',
      negativeSpace: 'Espace intérieur ciselé créant un relief subtil',
      background: 'Noir mat sans artefacts',
      brandDirection: 'Exclusivité, appartenance et prestige',
    },
    brandKit: {
      primaryLogoConcept: `Blason fusion ${pair}`,
      secondaryLayout: 'badge',
      faviconSymbol: pair,
      monochromeDark: { bg: '#080B10', mark: '#FFFFFF', text: '#FFFFFF' },
      monochromeLight: { bg: '#F8FAFC', mark: '#0F172A', text: '#0F172A' },
      palette: [
        { name: 'Blason', hex: colors.primary, role: 'Contours et symbole' },
        { name: 'Fond Sombre', hex: colors.background, role: 'Arrière-plan principal' },
        { name: 'Texte Emblème', hex: colors.text, role: 'Typographie de signature' },
        { name: 'Accents', hex: colors.secondary, role: 'Détails techniques' },
      ],
      typographySpecs: {
        headingFont: typography.fontFamily,
        subheadFont: 'Outfit',
        bodyFont: 'Plus Jakarta Sans',
        rationale: 'Structure solide combinant force institutionnelle et modernité.',
      },
    },
  };

  return [concept1, concept2, concept3, concept4];
}
