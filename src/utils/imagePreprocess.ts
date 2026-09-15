/**
 * Image preprocessing utility for Sketch-to-Logo analysis.
 * Automatically prepares a high-contrast, clean reference image for AI analysis
 * while strictly preserving the user's original image untouched.
 */

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

export function optimizeSketchForAI(originalDataUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return resolve(originalDataUrl);
        }

        // Limit size for fast AI vision upload (max 1200px)
        const maxDim = 1200;
        let width = img.width;
        let height = img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Draw image
        ctx.drawImage(img, 0, 0, width, height);

        const imgData = ctx.getImageData(0, 0, width, height);
        const data = imgData.data;

        // Boost contrast and reduce paper background haze for clearer OCR/symbol extraction
        // Contrast factor
        const contrast = 35; // -100 to 100
        const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));

        for (let i = 0; i < data.length; i += 4) {
          // Convert slightly towards high-clarity greyscale contrast
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

          // Apply contrast curve
          let adjusted = factor * (brightness - 128) + 128;
          // Paper noise thresholding: push very light grey paper to clean white
          if (adjusted > 210) {
            adjusted = Math.min(255, adjusted + 30);
          } else if (adjusted < 90) {
            adjusted = Math.max(0, adjusted - 20);
          }

          data[i] = adjusted;
          data[i + 1] = adjusted;
          data[i + 2] = adjusted;
        }

        ctx.putImageData(imgData, 0, 0);
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      } catch (e) {
        console.warn('Canvas pre-processing fallback to original image:', e);
        resolve(originalDataUrl);
      }
    };

    img.onerror = () => resolve(originalDataUrl);
    img.src = originalDataUrl;
  });
}
