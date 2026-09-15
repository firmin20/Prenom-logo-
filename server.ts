import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createProceduralConcepts, analyzeNameLetters } from './src/utils/logoEngine.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    time: new Date().toISOString(),
  });
});

// Analyze and generate concepts
app.post('/api/analyze-and-generate-logos', async (req, res) => {
  try {
    const { firstName, business = '', slogan = '', style = 'PREMIUM', colorScheme = 'noir_or' } = req.body;

    if (!firstName || typeof firstName !== 'string' || !firstName.trim()) {
      return res.status(400).json({ error: 'Le prénom est requis.' });
    }

    const cleanName = firstName.trim();
    const proceduralBase = createProceduralConcepts(cleanName, business, slogan, style, colorScheme);
    const letterAnalysis = analyzeNameLetters(cleanName);

    const ai = getGeminiClient();

    if (!ai) {
      // Return procedural concepts directly if API key not available yet
      return res.json({
        success: true,
        source: 'procedural-engine',
        letterAnalysis,
        concepts: proceduralBase,
      });
    }

    // Prepare rich prompt for Gemini 3.8 Flash
    const prompt = `Tu es le Directeur de Création et Brand Architecte en chef de l'agence de design PRÉNOM LOGO AI.
Ton rôle est de créer 4 concepts de logos professionnels, mémorables et statutaires à partir du prénom suivant : "${cleanName}".

INFORMATIONS MARQUE :
- Prénom : "${cleanName}"
- Activité / Entreprise : "${business || 'Marque personnelle / Studio'}"
- Slogan : "${slogan || ''}"
- Style sélectionné : "${style}" (ex: MINIMAL, PREMIUM, LUXURY, MODERN, TECHNOLOGY, CREATIVE, BUSINESS, SIGNATURE)
- Accord de couleurs : "${colorScheme}"

RÈGLES CAPITALES DE DESIGN DE MARQUE :
1. Tu NE DOIS PAS simplement placer des lettres au hasard. Tu dois analyser la structure géométrique du prénom, ses initiales (notamment '${cleanName[0].toUpperCase()}'), ses consonnes clés et sa symétrie.
2. Élabore 4 concepts DISTINCTS :
   - CONCEPT 1 : Monogramme d'autorité (initiale puissante ou double-lettre sculptée)
   - CONCEPT 2 : Symbole abstrait géométrique (forme pure intemporelle évoquant l'élévation ou l'activité)
   - CONCEPT 3 : Wordmark typographique (prénom complet magnifié avec crénage d'orfèvre et accent statutaire)
   - CONCEPT 4 : Blason / Fusion lettre + symbole (écusson moderne ou entrelacement d'initiales)
3. Évite les clichés d'amateurs : pas de dégradés kitsch, pas d'effets 3D baveux, pas d'illustrations complexes. Design épuré, vectorisable, scalable.

Fournis ta réponse sous forme d'un objet JSON strict avec la structure suivante :
{
  "letterAnalysis": {
    "vibeSummary": "Analyse phonétique et typographique synthétique en français",
    "dominantSymmetry": "vertical|horizontal|radial|asymmetric"
  },
  "concepts": [
    {
      "conceptNumber": 1,
      "title": "Nom poétique et statutaire du concept",
      "shortDescription": "Description percutante en une phrase",
      "designExplanation": "Explication approfondie du concept, du choix des formes et de l'alignement avec le prénom et l'activité",
      "recommendedUsage": ["Photo de profil", "Favicon / App Icon", "Carte de visite"],
      "designBrief": {
        "symbol": "Description précise du symbole visuel",
        "composition": "Composition et disposition spatiale",
        "negativeSpace": "Utilisation de l'espace négatif",
        "background": "Description du fond uni",
        "brandDirection": "Direction artistique globale"
      }
    },
    {
      "conceptNumber": 2,
      "title": "...",
      "shortDescription": "...",
      "designExplanation": "...",
      "recommendedUsage": ["..."],
      "designBrief": { "symbol": "...", "composition": "...", "negativeSpace": "...", "background": "...", "brandDirection": "..." }
    },
    {
      "conceptNumber": 3,
      "title": "...",
      "shortDescription": "...",
      "designExplanation": "...",
      "recommendedUsage": ["..."],
      "designBrief": { "symbol": "...", "composition": "...", "negativeSpace": "...", "background": "...", "brandDirection": "..." }
    },
    {
      "conceptNumber": 4,
      "title": "...",
      "shortDescription": "...",
      "designExplanation": "...",
      "recommendedUsage": ["..."],
      "designBrief": { "symbol": "...", "composition": "...", "negativeSpace": "...", "background": "...", "brandDirection": "..." }
    }
  ]
}`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });

      const responseText = response.text?.trim() || '{}';
      const aiData = JSON.parse(responseText);

      // Merge AI insights into the reliable vector procedural structures
      const mergedConcepts = proceduralBase.map((baseConcept, idx) => {
        const aiConcept = aiData.concepts?.[idx];
        if (!aiConcept) return baseConcept;

        return {
          ...baseConcept,
          title: aiConcept.title || baseConcept.title,
          shortDescription: aiConcept.shortDescription || baseConcept.shortDescription,
          designExplanation: aiConcept.designExplanation || baseConcept.designExplanation,
          recommendedUsage: Array.isArray(aiConcept.recommendedUsage) && aiConcept.recommendedUsage.length > 0
            ? aiConcept.recommendedUsage
            : baseConcept.recommendedUsage,
          designBrief: {
            ...baseConcept.designBrief,
            ...(aiConcept.designBrief || {}),
          },
        };
      });

      return res.json({
        success: true,
        source: 'gemini-3.8-flash',
        letterAnalysis: {
          ...letterAnalysis,
          vibeSummary: aiData.letterAnalysis?.vibeSummary || letterAnalysis.vibeSummary,
          dominantSymmetry: aiData.letterAnalysis?.dominantSymmetry || letterAnalysis.dominantSymmetry,
        },
        concepts: mergedConcepts,
      });
    } catch (aiErr) {
      console.warn('Gemini API call failed, falling back to procedural design engine:', aiErr);
      return res.json({
        success: true,
        source: 'procedural-fallback',
        letterAnalysis,
        concepts: proceduralBase,
      });
    }
  } catch (err: any) {
    console.error('Error generating logos:', err);
    return res.status(500).json({
      error: 'Une erreur est survenue lors de la création de votre logo. Veuillez réessayer.',
      details: err.message,
    });
  }
});

// Refine concept endpoint
app.post('/api/refine-concept', async (req, res) => {
  try {
    const { concept, userInstruction } = req.body;
    if (!concept || !userInstruction) {
      return res.status(400).json({ error: 'Concept et instruction de modification requis.' });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Local modification
      const modified = { ...concept };
      modified.shortDescription = `${modified.shortDescription} (Ajusté : ${userInstruction})`;
      modified.designExplanation = `${modified.designExplanation} Adaptation spécifique : ${userInstruction}.`;
      return res.json({ success: true, concept: modified });
    }

    const prompt = `Tu es le Directeur Artistique de PRÉNOM LOGO AI.
L'utilisateur souhaite affiner son concept de logo existant :
CONCEPT ACTUEL :
- Titre : "${concept.title}"
- Prénom : "${concept.brandName}"
- Type : "${concept.conceptType}"
- Description : "${concept.shortDescription}"
- Style : "${concept.style}"

DEMANDE DE MODIFICATION DE L'UTILISATEUR :
"${userInstruction}"

Réponds en JSON avec le concept réajusté tout en préservant l'ADN fondamental du logo :
{
  "title": "Nouveau titre optimisé",
  "shortDescription": "Nouvelle description percutante reflétant la modification",
  "designExplanation": "Nouvelle explication détaillée intégrant le souhait de l'utilisateur",
  "designBrief": {
    "symbol": "Précision ajustée du symbole",
    "composition": "Nouvelle composition",
    "negativeSpace": "Ajustement d'espace négatif",
    "brandDirection": "Nouvelle orientation"
  }
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text?.trim() || '{}');
    const updatedConcept = {
      ...concept,
      title: parsed.title || concept.title,
      shortDescription: parsed.shortDescription || concept.shortDescription,
      designExplanation: parsed.designExplanation || concept.designExplanation,
      designBrief: {
        ...concept.designBrief,
        ...(parsed.designBrief || {}),
      },
    };

    return res.json({ success: true, concept: updatedConcept });
  } catch (err: any) {
    console.error('Error refining concept:', err);
    return res.status(500).json({ error: 'Impossible d’affiner le concept.', details: err.message });
  }
});

// Optional AI image generation endpoint
app.post('/api/generate-ai-image', async (req, res) => {
  try {
    const { prompt, conceptTitle } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.status(400).json({
        error: 'Clé API Gemini requise pour la génération d’image matricielle.',
      });
    }

    const structuredImagePrompt = `Professional vector logo mark for brand "${conceptTitle}". ${prompt}. Minimalist, iconic, high-end branding agency craft, clean lines, balanced negative space, centered composition, solid dark matte background, isolated vector emblem, 8k resolution, flat graphic design, strictly no 3d mockup, no perspective, no photorealistic desk, no business card, no walls.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite-image',
      contents: {
        parts: [{ text: structuredImagePrompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: '1:1',
        },
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData?.data) {
        const imageUrl = `data:image/png;base64,${part.inlineData.data}`;
        return res.json({ success: true, imageUrl });
      }
    }

    return res.status(500).json({ error: 'Aucune image générée par le modèle.' });
  } catch (err: any) {
    console.warn('AI image generation failed (may require paid quota):', err.message);
    return res.status(500).json({
      error: 'La génération d’image IA est temporairement indisponible ou nécessite un quota payant. Le rendu vectoriel ultra-net haute définition reste 100% fonctionnel et téléchargeable.',
      details: err.message,
    });
  }
});

// Vite middleware for development vs static build in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PRÉNOM LOGO AI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
