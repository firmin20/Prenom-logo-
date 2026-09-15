import * as THREE from 'three';

/**
 * Procedural 3D Architectural Letter Glyph System
 * Constructs clean, high-precision vector shapes with proper typography holes for 3D extrusion.
 * Grid scale: width ~0.7-0.9, height = 1.2
 */

export interface GlyphData {
  shape: THREE.Shape;
  width: number;
}

export function createLetterShape(char: string): GlyphData {
  const c = char.toUpperCase();
  const s = new THREE.Shape();
  let width = 0.8;

  switch (c) {
    case 'A': {
      width = 0.85;
      s.moveTo(0, 0);
      s.lineTo(0.35, 1.2);
      s.lineTo(0.5, 1.2);
      s.lineTo(0.85, 0);
      s.lineTo(0.68, 0);
      s.lineTo(0.56, 0.42);
      s.lineTo(0.29, 0.42);
      s.lineTo(0.17, 0);
      s.closePath();

      // Inner triangle hole
      const hole = new THREE.Path();
      hole.moveTo(0.33, 0.58);
      hole.lineTo(0.52, 0.58);
      hole.lineTo(0.425, 0.98);
      hole.closePath();
      s.holes.push(hole);
      break;
    }

    case 'B': {
      width = 0.8;
      s.moveTo(0, 0);
      s.lineTo(0, 1.2);
      s.lineTo(0.48, 1.2);
      s.bezierCurveTo(0.72, 1.2, 0.76, 0.68, 0.48, 0.65);
      s.bezierCurveTo(0.78, 0.62, 0.8, 0, 0.5, 0);
      s.closePath();

      // Top hole
      const h1 = new THREE.Path();
      h1.moveTo(0.18, 0.72);
      h1.lineTo(0.42, 0.72);
      h1.bezierCurveTo(0.58, 0.72, 0.58, 1.05, 0.42, 1.05);
      h1.lineTo(0.18, 1.05);
      h1.closePath();
      s.holes.push(h1);

      // Bottom hole
      const h2 = new THREE.Path();
      h2.moveTo(0.18, 0.15);
      h2.lineTo(0.44, 0.15);
      h2.bezierCurveTo(0.6, 0.15, 0.6, 0.53, 0.44, 0.53);
      h2.lineTo(0.18, 0.53);
      h2.closePath();
      s.holes.push(h2);
      break;
    }

    case 'C': {
      width = 0.82;
      s.moveTo(0.75, 0.95);
      s.lineTo(0.65, 0.82);
      s.bezierCurveTo(0.52, 0.98, 0.35, 0.98, 0.25, 0.85);
      s.bezierCurveTo(0.12, 0.68, 0.12, 0.52, 0.25, 0.35);
      s.bezierCurveTo(0.35, 0.22, 0.52, 0.22, 0.65, 0.38);
      s.lineTo(0.75, 0.25);
      s.bezierCurveTo(0.6, 0.05, 0.32, 0.05, 0.12, 0.25);
      s.bezierCurveTo(-0.04, 0.45, -0.04, 0.75, 0.12, 0.95);
      s.bezierCurveTo(0.32, 1.15, 0.6, 1.15, 0.75, 0.95);
      break;
    }

    case 'D': {
      width = 0.84;
      s.moveTo(0, 0);
      s.lineTo(0, 1.2);
      s.lineTo(0.42, 1.2);
      s.bezierCurveTo(0.8, 1.2, 0.84, 0, 0.42, 0);
      s.closePath();

      const hole = new THREE.Path();
      hole.moveTo(0.18, 0.18);
      hole.lineTo(0.38, 0.18);
      hole.bezierCurveTo(0.64, 0.18, 0.64, 1.02, 0.38, 1.02);
      hole.lineTo(0.18, 1.02);
      hole.closePath();
      s.holes.push(hole);
      break;
    }

    case 'E': {
      width = 0.75;
      s.moveTo(0, 0);
      s.lineTo(0, 1.2);
      s.lineTo(0.72, 1.2);
      s.lineTo(0.72, 1.02);
      s.lineTo(0.18, 1.02);
      s.lineTo(0.18, 0.68);
      s.lineTo(0.62, 0.68);
      s.lineTo(0.62, 0.52);
      s.lineTo(0.18, 0.52);
      s.lineTo(0.18, 0.18);
      s.lineTo(0.72, 0.18);
      s.lineTo(0.72, 0);
      s.closePath();
      break;
    }

    case 'F': {
      width = 0.72;
      s.moveTo(0, 0);
      s.lineTo(0, 1.2);
      s.lineTo(0.72, 1.2);
      s.lineTo(0.72, 1.02);
      s.lineTo(0.18, 1.02);
      s.lineTo(0.18, 0.68);
      s.lineTo(0.62, 0.68);
      s.lineTo(0.62, 0.52);
      s.lineTo(0.18, 0.52);
      s.lineTo(0.18, 0);
      s.closePath();
      break;
    }

    case 'G': {
      width = 0.84;
      s.moveTo(0.78, 0.95);
      s.lineTo(0.66, 0.82);
      s.bezierCurveTo(0.55, 0.98, 0.38, 0.98, 0.26, 0.85);
      s.bezierCurveTo(0.14, 0.68, 0.14, 0.52, 0.26, 0.35);
      s.bezierCurveTo(0.38, 0.22, 0.55, 0.22, 0.66, 0.35);
      s.lineTo(0.66, 0.55);
      s.lineTo(0.45, 0.55);
      s.lineTo(0.45, 0.7);
      s.lineTo(0.82, 0.7);
      s.lineTo(0.82, 0.25);
      s.bezierCurveTo(0.65, 0.05, 0.35, 0.05, 0.12, 0.25);
      s.bezierCurveTo(-0.04, 0.45, -0.04, 0.75, 0.12, 0.95);
      s.bezierCurveTo(0.35, 1.15, 0.65, 1.15, 0.78, 0.95);
      break;
    }

    case 'H': {
      width = 0.8;
      s.moveTo(0, 0);
      s.lineTo(0, 1.2);
      s.lineTo(0.18, 1.2);
      s.lineTo(0.18, 0.68);
      s.lineTo(0.62, 0.68);
      s.lineTo(0.62, 1.2);
      s.lineTo(0.8, 1.2);
      s.lineTo(0.8, 0);
      s.lineTo(0.62, 0);
      s.lineTo(0.62, 0.52);
      s.lineTo(0.18, 0.52);
      s.lineTo(0.18, 0);
      s.closePath();
      break;
    }

    case 'I': {
      width = 0.38;
      s.moveTo(0.04, 0);
      s.lineTo(0.04, 0.16);
      s.lineTo(0.12, 0.16);
      s.lineTo(0.12, 1.04);
      s.lineTo(0.04, 1.04);
      s.lineTo(0.04, 1.2);
      s.lineTo(0.34, 1.2);
      s.lineTo(0.34, 1.04);
      s.lineTo(0.26, 1.04);
      s.lineTo(0.26, 0.16);
      s.lineTo(0.34, 0.16);
      s.lineTo(0.34, 0);
      s.closePath();
      break;
    }

    case 'J': {
      width = 0.65;
      s.moveTo(0.1, 0.4);
      s.bezierCurveTo(0.1, 0.15, 0.25, 0, 0.45, 0);
      s.bezierCurveTo(0.62, 0, 0.65, 0.18, 0.65, 0.35);
      s.lineTo(0.65, 1.2);
      s.lineTo(0.48, 1.2);
      s.lineTo(0.48, 0.4);
      s.bezierCurveTo(0.48, 0.22, 0.4, 0.18, 0.35, 0.18);
      s.bezierCurveTo(0.28, 0.18, 0.25, 0.25, 0.25, 0.38);
      s.closePath();
      break;
    }

    case 'K': {
      width = 0.8;
      s.moveTo(0, 0);
      s.lineTo(0, 1.2);
      s.lineTo(0.18, 1.2);
      s.lineTo(0.18, 0.65);
      s.lineTo(0.55, 1.2);
      s.lineTo(0.78, 1.2);
      s.lineTo(0.32, 0.52);
      s.lineTo(0.8, 0);
      s.lineTo(0.55, 0);
      s.lineTo(0.18, 0.42);
      s.lineTo(0.18, 0);
      s.closePath();
      break;
    }

    case 'L': {
      width = 0.7;
      s.moveTo(0, 0);
      s.lineTo(0, 1.2);
      s.lineTo(0.18, 1.2);
      s.lineTo(0.18, 0.18);
      s.lineTo(0.68, 0.18);
      s.lineTo(0.68, 0);
      s.closePath();
      break;
    }

    case 'M': {
      width = 0.95;
      s.moveTo(0, 0);
      s.lineTo(0, 1.2);
      s.lineTo(0.18, 1.2);
      s.lineTo(0.475, 0.45);
      s.lineTo(0.77, 1.2);
      s.lineTo(0.95, 1.2);
      s.lineTo(0.95, 0);
      s.lineTo(0.78, 0);
      s.lineTo(0.78, 0.85);
      s.lineTo(0.52, 0.2);
      s.lineTo(0.43, 0.2);
      s.lineTo(0.17, 0.85);
      s.lineTo(0.17, 0);
      s.closePath();
      break;
    }

    case 'N': {
      width = 0.82;
      s.moveTo(0, 0);
      s.lineTo(0, 1.2);
      s.lineTo(0.18, 1.2);
      s.lineTo(0.64, 0.32);
      s.lineTo(0.64, 1.2);
      s.lineTo(0.82, 1.2);
      s.lineTo(0.82, 0);
      s.lineTo(0.64, 0);
      s.lineTo(0.18, 0.88);
      s.lineTo(0.18, 0);
      s.closePath();
      break;
    }

    case 'O': {
      width = 0.88;
      s.moveTo(0.44, 0);
      s.bezierCurveTo(0.75, 0, 0.88, 0.3, 0.88, 0.6);
      s.bezierCurveTo(0.88, 0.9, 0.75, 1.2, 0.44, 1.2);
      s.bezierCurveTo(0.13, 1.2, 0, 0.9, 0, 0.6);
      s.bezierCurveTo(0, 0.3, 0.13, 0, 0.44, 0);
      s.closePath();

      const hole = new THREE.Path();
      hole.moveTo(0.44, 0.18);
      hole.bezierCurveTo(0.24, 0.18, 0.18, 0.35, 0.18, 0.6);
      hole.bezierCurveTo(0.18, 0.85, 0.24, 1.02, 0.44, 1.02);
      hole.bezierCurveTo(0.64, 1.02, 0.7, 0.85, 0.7, 0.6);
      hole.bezierCurveTo(0.7, 0.35, 0.64, 0.18, 0.44, 0.18);
      hole.closePath();
      s.holes.push(hole);
      break;
    }

    case 'P': {
      width = 0.78;
      s.moveTo(0, 0);
      s.lineTo(0, 1.2);
      s.lineTo(0.45, 1.2);
      s.bezierCurveTo(0.76, 1.2, 0.78, 0.55, 0.45, 0.55);
      s.lineTo(0.18, 0.55);
      s.lineTo(0.18, 0);
      s.closePath();

      const hole = new THREE.Path();
      hole.moveTo(0.18, 0.72);
      hole.lineTo(0.42, 0.72);
      hole.bezierCurveTo(0.58, 0.72, 0.58, 1.03, 0.42, 1.03);
      hole.lineTo(0.18, 1.03);
      hole.closePath();
      s.holes.push(hole);
      break;
    }

    case 'Q': {
      width = 0.88;
      s.moveTo(0.44, 0);
      s.bezierCurveTo(0.75, 0, 0.88, 0.3, 0.88, 0.6);
      s.bezierCurveTo(0.88, 0.9, 0.75, 1.2, 0.44, 1.2);
      s.bezierCurveTo(0.13, 1.2, 0, 0.9, 0, 0.6);
      s.bezierCurveTo(0.02, 0.32, 0.14, 0.08, 0.35, 0.02);
      s.lineTo(0.55, 0.2);
      s.lineTo(0.7, 0.05);
      s.lineTo(0.85, 0.2);
      s.lineTo(0.7, 0.35);
      s.bezierCurveTo(0.68, 0.15, 0.56, 0, 0.44, 0);
      s.closePath();

      const hole = new THREE.Path();
      hole.moveTo(0.44, 0.2);
      hole.bezierCurveTo(0.24, 0.2, 0.18, 0.35, 0.18, 0.6);
      hole.bezierCurveTo(0.18, 0.85, 0.24, 1.02, 0.44, 1.02);
      hole.bezierCurveTo(0.64, 1.02, 0.7, 0.85, 0.7, 0.6);
      hole.bezierCurveTo(0.7, 0.45, 0.66, 0.32, 0.58, 0.24);
      hole.closePath();
      s.holes.push(hole);
      break;
    }

    case 'R': {
      width = 0.8;
      s.moveTo(0, 0);
      s.lineTo(0, 1.2);
      s.lineTo(0.46, 1.2);
      s.bezierCurveTo(0.78, 1.2, 0.8, 0.6, 0.48, 0.58);
      s.lineTo(0.78, 0);
      s.lineTo(0.58, 0);
      s.lineTo(0.3, 0.55);
      s.lineTo(0.18, 0.55);
      s.lineTo(0.18, 0);
      s.closePath();

      const hole = new THREE.Path();
      hole.moveTo(0.18, 0.72);
      hole.lineTo(0.42, 0.72);
      hole.bezierCurveTo(0.58, 0.72, 0.58, 1.03, 0.42, 1.03);
      hole.lineTo(0.18, 1.03);
      hole.closePath();
      s.holes.push(hole);
      break;
    }

    case 'S': {
      width = 0.76;
      s.moveTo(0.7, 0.95);
      s.lineTo(0.58, 0.85);
      s.bezierCurveTo(0.5, 0.98, 0.35, 1.02, 0.24, 0.92);
      s.bezierCurveTo(0.12, 0.82, 0.15, 0.68, 0.3, 0.62);
      s.lineTo(0.45, 0.56);
      s.bezierCurveTo(0.68, 0.48, 0.78, 0.35, 0.72, 0.18);
      s.bezierCurveTo(0.65, 0.02, 0.42, -0.02, 0.22, 0.05);
      s.lineTo(0.1, 0.25);
      s.lineTo(0.22, 0.35);
      s.bezierCurveTo(0.32, 0.22, 0.5, 0.18, 0.56, 0.26);
      s.bezierCurveTo(0.62, 0.34, 0.58, 0.45, 0.45, 0.5);
      s.lineTo(0.3, 0.56);
      s.bezierCurveTo(0.12, 0.64, 0.02, 0.78, 0.08, 0.98);
      s.bezierCurveTo(0.16, 1.16, 0.44, 1.22, 0.68, 1.12);
      s.closePath();
      break;
    }

    case 'T': {
      width = 0.78;
      s.moveTo(0, 1.2);
      s.lineTo(0.78, 1.2);
      s.lineTo(0.78, 1.02);
      s.lineTo(0.48, 1.02);
      s.lineTo(0.48, 0);
      s.lineTo(0.3, 0);
      s.lineTo(0.3, 1.02);
      s.lineTo(0, 1.02);
      s.closePath();
      break;
    }

    case 'U': {
      width = 0.82;
      s.moveTo(0, 1.2);
      s.lineTo(0.18, 1.2);
      s.lineTo(0.18, 0.45);
      s.bezierCurveTo(0.18, 0.25, 0.28, 0.18, 0.41, 0.18);
      s.bezierCurveTo(0.54, 0.18, 0.64, 0.25, 0.64, 0.45);
      s.lineTo(0.64, 1.2);
      s.lineTo(0.82, 1.2);
      s.lineTo(0.82, 0.45);
      s.bezierCurveTo(0.82, 0.12, 0.64, 0, 0.41, 0);
      s.bezierCurveTo(0.18, 0, 0, 0.12, 0, 0.45);
      s.closePath();
      break;
    }

    case 'V': {
      width = 0.84;
      s.moveTo(0, 1.2);
      s.lineTo(0.18, 1.2);
      s.lineTo(0.42, 0.25);
      s.lineTo(0.66, 1.2);
      s.lineTo(0.84, 1.2);
      s.lineTo(0.52, 0);
      s.lineTo(0.32, 0);
      s.closePath();
      break;
    }

    case 'W': {
      width = 1.05;
      s.moveTo(0, 1.2);
      s.lineTo(0.16, 1.2);
      s.lineTo(0.32, 0.3);
      s.lineTo(0.48, 0.95);
      s.lineTo(0.57, 0.95);
      s.lineTo(0.73, 0.3);
      s.lineTo(0.89, 1.2);
      s.lineTo(1.05, 1.2);
      s.lineTo(0.82, 0);
      s.lineTo(0.65, 0);
      s.lineTo(0.525, 0.65);
      s.lineTo(0.4, 0);
      s.lineTo(0.23, 0);
      s.closePath();
      break;
    }

    case 'X': {
      width = 0.82;
      s.moveTo(0, 1.2);
      s.lineTo(0.2, 1.2);
      s.lineTo(0.41, 0.72);
      s.lineTo(0.62, 1.2);
      s.lineTo(0.82, 1.2);
      s.lineTo(0.52, 0.6);
      s.lineTo(0.82, 0);
      s.lineTo(0.62, 0);
      s.lineTo(0.41, 0.48);
      s.lineTo(0.2, 0);
      s.lineTo(0, 0);
      s.lineTo(0.3, 0.6);
      s.closePath();
      break;
    }

    case 'Y': {
      width = 0.8;
      s.moveTo(0, 1.2);
      s.lineTo(0.2, 1.2);
      s.lineTo(0.4, 0.72);
      s.lineTo(0.4, 0);
      s.lineTo(0.58, 0);
      s.lineTo(0.58, 0.72);
      s.lineTo(0.78, 1.2);
      s.lineTo(0.58, 1.2);
      s.lineTo(0.49, 0.92);
      s.lineTo(0.4, 1.2);
      s.closePath();
      break;
    }

    case 'Z': {
      width = 0.78;
      s.moveTo(0, 1.2);
      s.lineTo(0.78, 1.2);
      s.lineTo(0.78, 1.02);
      s.lineTo(0.26, 0.18);
      s.lineTo(0.78, 0.18);
      s.lineTo(0.78, 0);
      s.lineTo(0, 0);
      s.lineTo(0, 0.18);
      s.lineTo(0.52, 1.02);
      s.lineTo(0, 1.02);
      s.closePath();
      break;
    }

    case ' ': {
      width = 0.4;
      // Space is blank
      break;
    }

    case 'É':
    case 'È':
    case 'Ê':
    case 'Ë': {
      // E with accent
      const baseE = createLetterShape('E');
      width = baseE.width;
      return baseE;
    }

    default: {
      // Standard architectural column block for unmapped glyphs or numbers
      width = 0.7;
      s.moveTo(0, 0);
      s.lineTo(0, 1.2);
      s.lineTo(0.7, 1.2);
      s.lineTo(0.7, 0);
      s.closePath();
      break;
    }
  }

  return { shape: s, width };
}

/**
 * Creates 3D Extruded Geometry for a single letter glyph
 */
export function createGlyphGeometry(char: string, depth = 0.28): {
  geometry: THREE.BufferGeometry;
  width: number;
} {
  const { shape, width } = createLetterShape(char);

  if (char === ' ') {
    return { geometry: new THREE.BufferGeometry(), width };
  }

  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    depth,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: 0.035,
    bevelThickness: 0.04,
  };

  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geometry.computeVertexNormals();

  return { geometry, width };
}
