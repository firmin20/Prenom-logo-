export type LogoStyle =
  | 'MINIMAL'
  | 'PREMIUM'
  | 'LUXURY'
  | 'MODERN'
  | 'TECHNOLOGY'
  | 'CREATIVE'
  | 'BUSINESS'
  | 'SIGNATURE';

export type ColorSchemeId =
  | 'noir_blanc'
  | 'noir_or'
  | 'bleu'
  | 'rouge'
  | 'vert'
  | 'violet'
  | 'orange'
  | 'monochrome'
  | 'auto';

export interface ColorSchemeOption {
  id: ColorSchemeId;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
  gradient?: string;
}

export interface StyleOption {
  id: LogoStyle;
  name: string;
  tagline: string;
  description: string;
  keywords: string[];
  visualPreview: {
    symbolShape: 'circle' | 'square' | 'shield' | 'hexagon' | 'minimal' | 'serif' | 'tech';
    accentColor: string;
    bgColor: string;
  };
}

export interface LetterAnalysis {
  name: string;
  length: number;
  initials: string;
  strongLetters: string[];
  dominantSymmetry: 'vertical' | 'horizontal' | 'radial' | 'asymmetric';
  monogramPairs: string[];
  vibeSummary: string;
}

export interface VectorSymbolData {
  type: 'monogram' | 'geometric' | 'abstract' | 'crest' | 'interlocking' | 'path' | 'circular_badge' | 'sketch_vector';
  pathData?: string;
  shapes?: Array<{
    type: 'rect' | 'circle' | 'path' | 'polygon' | 'line';
    props: Record<string, string | number>;
  }>;
  monogramText?: string;
  symbolAccent?: string;
  viewBox?: string;
  strokeWidth?: number;
  customSvgContent?: string;
}

export interface LogoConcept {
  id: string;
  conceptNumber: 1 | 2 | 3 | 4;
  conceptType: 'Monogramme' | 'Symbole abstrait' | 'Wordmark typographique' | 'Lettre + Symbole fusion';
  title: string;
  style: LogoStyle;
  shortDescription: string;
  designExplanation: string;
  brandName: string;
  slogan?: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
  typography: {
    fontFamily: 'Outfit' | 'Cinzel' | 'Plus Jakarta Sans' | 'Space Grotesk';
    fontWeight: '300' | '400' | '600' | '700' | '800';
    letterSpacing: string;
    uppercase: boolean;
    styleTag: string;
  };
  symbolData: VectorSymbolData;
  recommendedUsage: string[];
  designBrief: {
    symbol: string;
    composition: string;
    negativeSpace: string;
    background: string;
    brandDirection: string;
  };
  aiImageUrl?: string;
  brandKit?: BrandKitData;
  source?: 'name' | 'sketch';
  originalSketch?: string;
  sketchMode?: 'fidele' | 'reinterpretation';
  phoneNumber?: string;
  circularBadgeText?: string;
}

export interface SketchAnalysisResult {
  rawSummary: string;
  compositionType: 'circular' | 'emblem' | 'horizontal' | 'stacked' | 'monogram' | 'geometric_icon';
  detectedText: {
    brandName?: string;
    brandNameConfidence?: number;
    slogan?: string;
    sloganConfidence?: number;
    phoneNumber?: string;
    phoneConfidence?: number;
    secondaryText?: string;
    secondaryConfidence?: number;
    uncertainWords?: string[];
  };
  detectedSymbols: string[];
  dominantColors: string[];
  styleSuggestion: LogoStyle;
  intentionalElements: string[];
  discardedNoise: string[];
  creativeNotes: string;
}

export interface SketchGenerationPayload {
  sketchImage: string;
  analysis?: SketchAnalysisResult;
  confirmedInfo: {
    brandName: string;
    activity?: string;
    slogan?: string;
    phoneNumber?: string;
  };
  generationMode: 'fidele' | 'reinterpretation';
  style: LogoStyle;
  colorHandling: 'preserve' | 'custom';
  customColor: ColorSchemeId;
}

export interface BrandKitData {
  primaryLogoConcept: string;
  secondaryLayout: 'horizontal' | 'badge' | 'stacked';
  faviconSymbol: string;
  monochromeDark: {
    bg: string;
    mark: string;
    text: string;
  };
  monochromeLight: {
    bg: string;
    mark: string;
    text: string;
  };
  palette: Array<{
    name: string;
    hex: string;
    role: string;
  }>;
  typographySpecs: {
    headingFont: string;
    subheadFont: string;
    bodyFont: string;
    rationale: string;
  };
}

export interface GenerateRequestPayload {
  firstName: string;
  business?: string;
  slogan?: string;
  style: LogoStyle;
  colorScheme: ColorSchemeId;
  refinementPrompt?: string;
  conceptToRefine?: number;
}

export interface DownloadSizeOption {
  id:
    | '4k_ultra'
    | 'presentation_pro'
    | 'presentation_4k'
    | 'high_res'
    | 'profile'
    | 'instagram'
    | 'facebook'
    | 'website'
    | 'business_card';
  label: string;
  dimensions: string;
  width: number;
  height: number;
  description: string;
  badge?: string;
  isPresentation?: boolean;
}

export type PlanType = 'free' | 'pro';

export interface UserProfile {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  plan: PlanType;
  createdAt: string;
  generationsCount?: number;
}

export interface SavedLogoItem {
  id: string;
  userId: string;
  concept: LogoConcept;
  createdAt: string;
  notes?: string;
  source?: 'name' | 'sketch';
  originalSketch?: string;
  sketchAnalysis?: SketchAnalysisResult;
}

export type AppView =
  | 'home'
  | 'app'
  | 'sketch'
  | 'my-logos'
  | 'account'
  | 'subscription'
  | 'login'
  | 'register'
  | 'forgot-password'
  | 'terms'
  | 'privacy'
  | 'contact';

