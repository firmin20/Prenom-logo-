import { LogoConcept } from '../types';

export interface ExportOptions {
  width: number;
  height: number;
  transparent?: boolean;
  filename?: string;
  isPresentation?: boolean;
}

/**
 * Reusable helper to draw the logo symbol on any canvas context at (centerX, centerY) with specified scale.
 */
export function drawLogoSymbol(
  ctx: CanvasRenderingContext2D,
  concept: LogoConcept,
  centerX: number,
  centerY: number,
  scale: number
): void {
  ctx.save();
  ctx.translate(centerX, centerY);

  const primaryColor = concept.colors.primary;
  const secondaryColor = concept.colors.secondary;
  const initial = (concept.brandName || 'P')[0].toUpperCase();
  const secondInitial = concept.brandName.length > 1 ? concept.brandName[1].toUpperCase() : '';

  if (concept.conceptType === 'Monogramme') {
    // Outer dashed guideline circle
    ctx.beginPath();
    ctx.arc(0, 0, 110 * scale, 0, Math.PI * 2);
    ctx.strokeStyle = `${primaryColor}55`;
    ctx.lineWidth = 3 * scale;
    ctx.setLineDash([8 * scale, 6 * scale]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Rounded rectangle frame
    const rSize = 160 * scale;
    const rRadius = 28 * scale;
    ctx.beginPath();
    ctx.roundRect(-rSize / 2, -rSize / 2, rSize, rSize, rRadius);
    ctx.strokeStyle = primaryColor;
    ctx.lineWidth = 7 * scale;
    ctx.stroke();

    // Monogram initial
    ctx.fillStyle = primaryColor;
    ctx.font = `bold ${100 * scale}px Outfit, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(initial, 0, 5 * scale);
  } else if (concept.conceptType === 'Symbole abstrait') {
    // Prism triangle
    const triH = 140 * scale;
    const triW = 150 * scale;

    ctx.beginPath();
    ctx.moveTo(0, -triH / 2);
    ctx.lineTo(triW / 2, triH / 2);
    ctx.lineTo(-triW / 2, triH / 2);
    ctx.closePath();
    ctx.strokeStyle = primaryColor;
    ctx.lineWidth = 8 * scale;
    ctx.lineJoin = 'round';
    ctx.stroke();

    // Inner triangle
    const innerH = 90 * scale;
    const innerW = 100 * scale;
    ctx.beginPath();
    ctx.moveTo(0, -innerH / 2 + 15 * scale);
    ctx.lineTo(innerW / 2, innerH / 2 + 15 * scale);
    ctx.lineTo(-innerW / 2, innerH / 2 + 15 * scale);
    ctx.closePath();
    ctx.strokeStyle = secondaryColor;
    ctx.lineWidth = 5 * scale;
    ctx.stroke();

    // Core circle
    ctx.beginPath();
    ctx.arc(0, 12 * scale, 14 * scale, 0, Math.PI * 2);
    ctx.fillStyle = primaryColor;
    ctx.fill();
  } else if (concept.conceptType === 'Wordmark typographique') {
    // Elegant line + central diamond
    ctx.beginPath();
    ctx.moveTo(-120 * scale, 0);
    ctx.lineTo(120 * scale, 0);
    ctx.strokeStyle = primaryColor;
    ctx.lineWidth = 5 * scale;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, 32 * scale, 0, Math.PI * 2);
    ctx.fillStyle = concept.colors.background || '#090B10';
    ctx.fill();
    ctx.strokeStyle = primaryColor;
    ctx.lineWidth = 6 * scale;
    ctx.stroke();

    // Diamond inside
    ctx.beginPath();
    ctx.moveTo(0, -14 * scale);
    ctx.lineTo(14 * scale, 0);
    ctx.lineTo(0, 14 * scale);
    ctx.lineTo(-14 * scale, 0);
    ctx.closePath();
    ctx.fillStyle = primaryColor;
    ctx.fill();
  } else {
    // Shield / Crest fusion
    ctx.beginPath();
    const shW = 140 * scale;
    const shH = 170 * scale;
    ctx.moveTo(0, -shH / 2);
    ctx.lineTo(shW / 2, -shH / 2 + 30 * scale);
    ctx.lineTo(shW / 2, 10 * scale);
    ctx.quadraticCurveTo(shW / 2, shH / 2, 0, shH / 2 + 15 * scale);
    ctx.quadraticCurveTo(-shW / 2, shH / 2, -shW / 2, 10 * scale);
    ctx.lineTo(-shW / 2, -shH / 2 + 30 * scale);
    ctx.closePath();
    ctx.strokeStyle = primaryColor;
    ctx.lineWidth = 7 * scale;
    ctx.lineJoin = 'round';
    ctx.stroke();

    ctx.fillStyle = primaryColor;
    ctx.font = `bold ${68 * scale}px Outfit, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(initial, -12 * scale, -5 * scale);

    if (secondInitial) {
      ctx.fillStyle = secondaryColor;
      ctx.font = `600 ${52 * scale}px Cinzel, serif`;
      ctx.fillText(secondInitial, 16 * scale, 12 * scale);
    }
  }

  ctx.restore();
}

/**
 * Draws the brand name and slogan with simulated kerning on the canvas.
 */
export function drawBrandTypography(
  ctx: CanvasRenderingContext2D,
  concept: LogoConcept,
  centerX: number,
  centerY: number,
  scale: number
): void {
  const brandName = concept.brandName.toUpperCase();
  ctx.fillStyle = concept.colors.text || '#FFFFFF';
  const fontFamily = concept.typography.fontFamily || 'Plus Jakarta Sans';
  const fontSize = 48 * scale;
  ctx.font = `bold ${fontSize}px '${fontFamily}', sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Letter spacing simulation for canvas
  const letterSpacing = 12 * scale;
  let totalWidth = 0;
  for (let i = 0; i < brandName.length; i++) {
    totalWidth += ctx.measureText(brandName[i]).width + (i < brandName.length - 1 ? letterSpacing : 0);
  }

  let startX = centerX - totalWidth / 2;
  for (let i = 0; i < brandName.length; i++) {
    const char = brandName[i];
    ctx.fillText(char, startX + ctx.measureText(char).width / 2, centerY);
    startX += ctx.measureText(char).width + letterSpacing;
  }

  // Draw Slogan if present
  if (concept.slogan) {
    const sloganY = centerY + 45 * scale;
    ctx.fillStyle = concept.colors.secondary || '#94A3B8';
    ctx.font = `500 ${18 * scale}px 'Plus Jakarta Sans', sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText(concept.slogan.toUpperCase(), centerX, sloganY);
  }
}

/**
 * Renders an executive 16:9 presentation slide board optimized for Keynote, PowerPoint, and Pitch Decks.
 */
function renderPresentationSlide(
  ctx: CanvasRenderingContext2D,
  concept: LogoConcept,
  width: number,
  height: number
): void {
  const scale = height / 1080; // normalized to 1080p base

  // 1. Executive Presentation Dark Background
  ctx.fillStyle = concept.colors.background || '#090B12';
  ctx.fillRect(0, 0, width, height);

  // Subtle radial ambient spotlight behind logo showcase
  const spotGrad = ctx.createRadialGradient(
    width * 0.35,
    height * 0.5,
    50 * scale,
    width * 0.35,
    height * 0.5,
    width * 0.45
  );
  spotGrad.addColorStop(0, `${concept.colors.primary}22`);
  spotGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = spotGrad;
  ctx.fillRect(0, 0, width, height);

  // Outer framing border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 2 * scale;
  ctx.strokeRect(32 * scale, 32 * scale, width - 64 * scale, height - 64 * scale);

  // 2. Slide Top Header Bar
  const headerY = 70 * scale;
  ctx.fillStyle = '#94A3B8';
  ctx.font = `600 ${13 * scale}px 'Plus Jakarta Sans', sans-serif`;
  ctx.textAlign = 'left';
  ctx.fillText('PRÉNOM LOGO AI  •  DOSSIER DE PRÉSENTATION DE MARQUE', 55 * scale, headerY);

  // Header Badge (Concept Info)
  ctx.textAlign = 'right';
  ctx.fillStyle = concept.colors.primary;
  ctx.font = `bold ${13 * scale}px 'Plus Jakarta Sans', sans-serif`;
  ctx.fillText(
    `CONCEPT 0${concept.conceptNumber}  |  STYLE ${concept.style.toUpperCase()}`,
    width - 55 * scale,
    headerY
  );

  // Header dividing line with gold/primary accent gradient
  const lineGrad = ctx.createLinearGradient(55 * scale, 0, width - 55 * scale, 0);
  lineGrad.addColorStop(0, `${concept.colors.primary}66`);
  lineGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.15)');
  lineGrad.addColorStop(1, `${concept.colors.primary}66`);
  ctx.strokeStyle = lineGrad;
  ctx.lineWidth = 1.5 * scale;
  ctx.beginPath();
  ctx.moveTo(55 * scale, headerY + 18 * scale);
  ctx.lineTo(width - 55 * scale, headerY + 18 * scale);
  ctx.stroke();

  // 3. Left Stage: Primary Logo Showcase (Focal stage)
  const leftCenterX = width * 0.35;
  const leftCenterY = height * 0.45;
  const logoScale = (height * 0.45) / 800;

  // Background pedestal card for logo
  const cardW = width * 0.52;
  const cardH = height * 0.72;
  const cardX = 55 * scale;
  const cardY = headerY + 36 * scale;

  ctx.fillStyle = 'rgba(255, 255, 255, 0.018)';
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardW, cardH, 24 * scale);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
  ctx.lineWidth = 1.5 * scale;
  ctx.stroke();

  // Render main logo & typography on left stage
  drawLogoSymbol(ctx, concept, leftCenterX, leftCenterY, logoScale * 1.25);
  drawBrandTypography(ctx, concept, leftCenterX, leftCenterY + 145 * logoScale * 1.25, logoScale * 1.15);

  // 4. Right Stage: Executive Brand Specifications Card
  const rightX = cardX + cardW + 30 * scale;
  const rightW = width - rightX - 55 * scale;
  const rightY = cardY;
  const rightH = cardH;

  // Right container card
  ctx.fillStyle = 'rgba(13, 18, 31, 0.85)';
  ctx.beginPath();
  ctx.roundRect(rightX, rightY, rightW, rightH, 24 * scale);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1.5 * scale;
  ctx.stroke();

  // Right Card Header
  let curY = rightY + 45 * scale;
  ctx.fillStyle = '#F8FAFC';
  ctx.font = `bold ${20 * scale}px 'Plus Jakarta Sans', sans-serif`;
  ctx.textAlign = 'left';
  ctx.fillText('SPÉCIFICATIONS D’IDENTITÉ', rightX + 32 * scale, curY);

  curY += 28 * scale;
  ctx.fillStyle = '#94A3B8';
  ctx.font = `400 ${12 * scale}px 'Plus Jakarta Sans', sans-serif`;
  ctx.fillText('Guide de cohérence pour pitch deck & supports pro', rightX + 32 * scale, curY);

  // Section 1: Color Palette Breakdown
  curY += 45 * scale;
  ctx.fillStyle = concept.colors.primary;
  ctx.font = `bold ${11 * scale}px 'Plus Jakarta Sans', sans-serif`;
  ctx.fillText('1. PALETTE CHROMATIQUE OFFICIELLE', rightX + 32 * scale, curY);

  const colorsList = [
    { label: 'Primaire', hex: concept.colors.primary },
    { label: 'Secondaire', hex: concept.colors.secondary },
    { label: 'Fond', hex: concept.colors.background },
    { label: 'Texte', hex: concept.colors.text },
  ];

  curY += 16 * scale;
  const swatchH = 46 * scale;
  const swatchGap = 10 * scale;

  colorsList.forEach((col, idx) => {
    const itemY = curY + idx * (swatchH + swatchGap);
    // Swatch box
    ctx.fillStyle = col.hex;
    ctx.beginPath();
    ctx.roundRect(rightX + 32 * scale, itemY, 44 * scale, swatchH, 8 * scale);
    ctx.fill();
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.lineWidth = 1 * scale;
    ctx.stroke();

    // Swatch text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `bold ${12 * scale}px 'Plus Jakarta Sans', sans-serif`;
    ctx.fillText(col.label, rightX + 88 * scale, itemY + 20 * scale);

    ctx.fillStyle = '#94A3B8';
    ctx.font = `500 ${11 * scale}px monospace`;
    ctx.fillText(col.hex.toUpperCase(), rightX + 88 * scale, itemY + 36 * scale);
  });

  // Section 2: Typography Specifications
  curY += colorsList.length * (swatchH + swatchGap) + 26 * scale;
  ctx.fillStyle = concept.colors.primary;
  ctx.font = `bold ${11 * scale}px 'Plus Jakarta Sans', sans-serif`;
  ctx.fillText('2. HIÉRARCHIE TYPOGRAPHIQUE', rightX + 32 * scale, curY);

  curY += 20 * scale;
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold ${15 * scale}px 'Plus Jakarta Sans', sans-serif`;
  ctx.fillText(
    `${concept.typography.fontFamily} (${concept.typography.fontWeight})`,
    rightX + 32 * scale,
    curY
  );

  curY += 18 * scale;
  ctx.fillStyle = '#94A3B8';
  ctx.font = `400 ${11 * scale}px 'Plus Jakarta Sans', sans-serif`;
  ctx.fillText(`Style: ${concept.typography.styleTag}`, rightX + 32 * scale, curY);

  // Section 3: Concept & Usage Recommendation
  curY += 34 * scale;
  ctx.fillStyle = concept.colors.primary;
  ctx.font = `bold ${11 * scale}px 'Plus Jakarta Sans', sans-serif`;
  ctx.fillText('3. USAGES RECOMMANDÉS', rightX + 32 * scale, curY);

  curY += 20 * scale;
  const usageSummary = concept.recommendedUsage.slice(0, 3).join(' • ');
  ctx.fillStyle = '#CBD5E1';
  ctx.font = `500 ${11 * scale}px 'Plus Jakarta Sans', sans-serif`;
  ctx.fillText(usageSummary, rightX + 32 * scale, curY);

  // 5. Slide Footer
  const footerY = height - 48 * scale;
  ctx.fillStyle = '#64748B';
  ctx.font = `500 ${11 * scale}px 'Plus Jakarta Sans', sans-serif`;
  ctx.textAlign = 'left';
  ctx.fillText(
    `SLIDE DE PRÉSENTATION 16:9 (${width} × ${height})  •  OPTIMISÉ KEYNOTE, POWERPOINT & GOOGLE SLIDES`,
    55 * scale,
    footerY
  );

  ctx.textAlign = 'right';
  ctx.fillStyle = '#475569';
  ctx.font = `bold ${10 * scale}px 'Plus Jakarta Sans', sans-serif`;
  ctx.fillText('DOCUMENT OFFICIEL — PROPRIÉTÉ CONFIDENTIELLE', width - 55 * scale, footerY);
}

/**
 * Primary export engine function: renders logo to PNG at any scale (including 4K 3840x3840 and 16:9 Presentation).
 */
export async function exportLogoToPNG(concept: LogoConcept, options: ExportOptions): Promise<void> {
  const { width, height, transparent = false, filename, isPresentation = false } = options;

  // Create canvas
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) {
    throw new Error('Impossible d’initialiser le moteur de rendu 2D.');
  }

  // Ensure high quality rasterization
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // Check if presentation slide format (16:9 ratio or explicit flag)
  const isSlideFormat = isPresentation || Math.abs(width / height - 16 / 9) < 0.05;

  if (isSlideFormat && !transparent) {
    renderPresentationSlide(ctx, concept, width, height);
  } else {
    // Standard / Square / High-Res / 4K Mode
    if (!transparent) {
      ctx.fillStyle = concept.colors.background || '#090B10';
      ctx.fillRect(0, 0, width, height);

      // Subtle radial glow
      const gradient = ctx.createRadialGradient(
        width / 2,
        height * 0.45,
        10,
        width / 2,
        height * 0.45,
        width * 0.5
      );
      gradient.addColorStop(0, `${concept.colors.primary}25`);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    } else {
      ctx.clearRect(0, 0, width, height);
    }

    const centerX = width / 2;
    const centerY = height * 0.42;
    const scale = Math.min(width, height) / 800;

    // Draw symbol using high-precision helper
    drawLogoSymbol(ctx, concept, centerX, centerY, scale);

    // Draw brand name and slogan typography
    drawBrandTypography(ctx, concept, centerX, centerY + 140 * scale, scale);
  }

  // Convert to Blob and Download
  const dataUrl = canvas.toDataURL('image/png', 1.0);
  const link = document.createElement('a');
  const safeName = (concept.brandName || 'logo').toLowerCase().replace(/[^a-z0-9]/g, '_');
  const formatTag = isSlideFormat
    ? 'presentation_16x9'
    : width >= 3840
    ? 'ultra_4k'
    : transparent
    ? 'transparent'
    : 'standard';

  link.download =
    filename || `prenom_logo_${safeName}_concept_${concept.conceptNumber}_${width}x${height}_${formatTag}.png`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Exports logo concept as a clean, scalable vector SVG file.
 */
export function exportLogoToSVG(concept: LogoConcept, transparent = false): void {
  const initial = (concept.brandName || 'P')[0].toUpperCase();
  const secondInitial = concept.brandName.length > 1 ? concept.brandName[1].toUpperCase() : '';
  const primary = concept.colors.primary;
  const secondary = concept.colors.secondary;
  const bg = transparent ? 'none' : concept.colors.background || '#090B10';
  const textColor = concept.colors.text || '#FFFFFF';
  const fontFamily = concept.typography.fontFamily || 'Plus Jakarta Sans';

  let symbolSvg = '';
  if (concept.conceptType === 'Monogramme') {
    symbolSvg = `
      <circle cx="400" cy="336" r="110" fill="none" stroke="${primary}" stroke-width="3" stroke-dasharray="8 6" opacity="0.4" />
      <rect x="320" y="256" width="160" height="160" rx="28" fill="none" stroke="${primary}" stroke-width="7" />
      <text x="400" y="345" fill="${primary}" font-family="${fontFamily}, Outfit, sans-serif" font-size="100" font-weight="bold" text-anchor="middle" dominant-baseline="middle">${initial}</text>
    `;
  } else if (concept.conceptType === 'Symbole abstrait') {
    symbolSvg = `
      <polygon points="400,266 475,406 325,406" fill="none" stroke="${primary}" stroke-width="8" stroke-linejoin="round" />
      <polygon points="400,296 450,386 350,386" fill="none" stroke="${secondary}" stroke-width="5" />
      <circle cx="400" cy="348" r="14" fill="${primary}" />
    `;
  } else if (concept.conceptType === 'Wordmark typographique') {
    symbolSvg = `
      <line x1="280" y1="336" x2="520" y2="336" stroke="${primary}" stroke-width="5" />
      <circle cx="400" cy="336" r="32" fill="${bg === 'none' ? '#090B10' : bg}" stroke="${primary}" stroke-width="6" />
      <polygon points="400,322 414,336 400,350 386,336" fill="${primary}" />
    `;
  } else {
    symbolSvg = `
      <path d="M 400,251 L 470,281 L 470,346 Q 470,421 400,436 Q 330,421 330,346 L 330,281 Z" fill="none" stroke="${primary}" stroke-width="7" stroke-linejoin="round" />
      <text x="388" y="341" fill="${primary}" font-family="${fontFamily}, Outfit, sans-serif" font-size="68" font-weight="bold" text-anchor="middle" dominant-baseline="middle">${initial}</text>
      ${
        secondInitial
          ? `<text x="416" y="358" fill="${secondary}" font-family="Cinzel, serif" font-size="52" font-weight="600" text-anchor="middle" dominant-baseline="middle">${secondInitial}</text>`
          : ''
      }
    `;
  }

  const sloganSvg = concept.slogan
    ? `<text x="400" y="521" fill="${secondary}" font-family="Plus Jakarta Sans, sans-serif" font-size="18" font-weight="500" letter-spacing="4" text-anchor="middle">${concept.slogan.toUpperCase()}</text>`
    : '';

  const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&amp;family=Outfit:wght@400;700;800&amp;family=Plus+Jakarta+Sans:wght@400;600;700&amp;family=Space+Grotesk:wght@500;700&amp;display=swap');
    </style>
  </defs>
  ${!transparent ? `<rect width="800" height="800" fill="${bg}" />` : ''}
  <!-- Symbol -->
  ${symbolSvg}
  <!-- Brand Name Typography -->
  <text x="400" y="476" fill="${textColor}" font-family="${fontFamily}, sans-serif" font-size="48" font-weight="bold" letter-spacing="12" text-anchor="middle">${concept.brandName.toUpperCase()}</text>
  <!-- Slogan -->
  ${sloganSvg}
</svg>`;

  const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const safeName = (concept.brandName || 'logo').toLowerCase().replace(/[^a-z0-9]/g, '_');
  link.download = `prenom_logo_${safeName}_concept_${concept.conceptNumber}_vectoriel.svg`;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
