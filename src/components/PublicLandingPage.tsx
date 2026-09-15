import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Shield,
  Layers,
  Award,
  CheckCircle2,
  ChevronDown,
  User,
  Briefcase,
  Rocket,
  Palette,
  Eye,
  Download,
  Lock,
  RefreshCw,
  FolderLock,
  Zap,
  Check,
  HelpCircle,
  Clock,
  Layout,
  Crown,
  Monitor,
} from 'lucide-react';
import { LogoRenderer } from './LogoRenderer';
import { createProceduralConcepts } from '../utils/logoEngine';

interface PublicLandingPageProps {
  onStartSignUp: () => void;
  onOpenSignIn: () => void;
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
  onOpenContact: () => void;
}

export const PublicLandingPage: React.FC<PublicLandingPageProps> = ({
  onStartSignUp,
  onOpenSignIn,
  onOpenTerms,
  onOpenPrivacy,
  onOpenContact,
}) => {
  // Pre-generate rich demonstration logos for FIRMIN, NOVA, ELYA, MAVEN, KAM'S
  const demoGallery = React.useMemo(() => {
    return [
      {
        name: 'FIRMIN',
        style: 'PREMIUM',
        concept: createProceduralConcepts('FIRMIN', 'Digital Studio', 'L’excellence numérique', 'PREMIUM', 'noir_or')[0],
      },
      {
        name: 'NOVA',
        style: 'TECHNOLOGY',
        concept: createProceduralConcepts('NOVA', 'Next Intelligence', 'Innover pour demain', 'TECHNOLOGY', 'bleu')[1],
      },
      {
        name: 'ELYA',
        style: 'LUXURY',
        concept: createProceduralConcepts('ELYA', 'Haute Parfumerie', 'Essence intemporelle', 'LUXURY', 'monochrome')[0],
      },
      {
        name: 'MAVEN',
        style: 'BUSINESS',
        concept: createProceduralConcepts('MAVEN', 'Strategic Capital', 'Clarté décisionnelle', 'BUSINESS', 'noir_blanc')[2],
      },
      {
        name: "KAM'S",
        style: 'MINIMAL',
        concept: createProceduralConcepts("KAM'S", 'Creative Atelier', 'Simplicité sculptée', 'MINIMAL', 'noir_or')[3],
      },
    ];
  }, []);

  const heroConcept = demoGallery[0].concept;

  // FAQ open state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqItems = [
    {
      q: "Qu'est-ce que PRÉNOM LOGO AI ?",
      a: "PRÉNOM LOGO AI est un générateur intelligent de branding qui décompose et sublime la géométrie de votre prénom (initiales, crénage, symétrie, sonorité) pour concevoir une véritable identité de marque prête à l'emploi.",
    },
    {
      q: 'Dois-je savoir utiliser un logiciel de design ?',
      a: "Absolument aucun. Ni Photoshop, ni Illustrator, ni connaissances en graphisme ne sont nécessaires. L'IA analyse votre prénom et génère directement des concepts vectoriels équilibrés selon les règles de l'art.",
    },
    {
      q: 'Pourquoi dois-je créer un compte ?',
      a: "La création de compte garantit que vos créations vous appartiennent exclusivement. Vos logos sont enregistrés dans votre espace privé sécurisé, consultables à tout moment et protégés contre tout accès tiers.",
    },
    {
      q: 'Combien de logos puis-je créer ?',
      a: "Dès votre inscription gratuite, vous accédez à plusieurs générations complètes de 4 concepts distincts. Le plan Pro débloque des générations illimitées ainsi que les exports Ultra 4K et vectoriels.",
    },
    {
      q: 'Puis-je modifier un logo ?',
      a: "Oui ! Chaque concept peut être affiné via l'assistant de retouche IA (pour ajuster le symbole, la graisse du texte ou les proportions) et personnalisé selon vos préférences.",
    },
    {
      q: 'Puis-je télécharger mon logo ?',
      a: "Oui, vous pouvez exporter vos logos en haute définition (1080×1080), en Ultra Haute Définition 4K (3840×3840), en fond transparent pour intégration sur vos documents, en slides de présentation (16:9) et en vectoriel SVG.",
    },
    {
      q: 'Mes créations sont-elles privées ?',
      a: "Absolument. Vos logos sont stockés dans votre dossier utilisateur privé Firestore, protégé par des règles d'accès strictes. Aucun autre utilisateur ne peut voir ou réutiliser vos créations.",
    },
    {
      q: 'Puis-je utiliser mon logo pour mon entreprise ?',
      a: "Oui, tous les logos générés et téléchargés vous appartiennent. Vous bénéficiez des droits d'exploitation commerciale complets pour votre entreprise, vos réseaux sociaux, vos factures et cartes de visite.",
    },
  ];

  const profiles = [
    {
      icon: User,
      title: 'Marque personnelle',
      desc: 'Pour affirmer une identité forte, mémorable et élégante autour de votre propre prénom.',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
    },
    {
      icon: Rocket,
      title: 'Entrepreneur',
      desc: 'Pour lancer votre nouvelle activité avec un branding digne d’une agence dès le premier jour.',
      color: 'text-sky-400',
      bg: 'bg-sky-500/10',
      border: 'border-sky-500/20',
    },
    {
      icon: Palette,
      title: 'Créateur de contenu',
      desc: 'Pour disposer d’un avatar reconnaissable au premier coup d’œil sur YouTube, Instagram et TikTok.',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
    },
    {
      icon: Briefcase,
      title: 'Freelance & Consultant',
      desc: 'Pour présenter une image rassurante et professionnelle à vos clients et partenaires.',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
    },
    {
      icon: Shield,
      title: 'Petite entreprise & Studio',
      desc: 'Pour créer rapidement une identité visuelle cohérente sans passer par un budget d’agence.',
      color: 'text-rose-400',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/20',
    },
  ];

  const logoStyles = [
    { title: 'Monogramme', desc: 'Initiales sculptées et entrelacées avec autorité et prestige.', icon: 'M' },
    { title: 'Logo minimaliste', desc: 'Lignes épurées, équilibre de blanc tournant et pureté visuelle.', icon: '—' },
    { title: 'Wordmark', desc: 'Typographie du prénom magnifiée avec espacement optique d’orfèvre.', icon: 'Aa' },
    { title: 'Logo premium', desc: 'Accents dorés, géométrie noble et contrastes luxueux.', icon: '★' },
    { title: 'Logo tech', desc: 'Formes d’avant-garde, dynamisme angulaire et précision futuriste.', icon: '◇' },
    { title: 'Logo business', desc: 'Stature institutionnelle, symétrie parfaite et crédibilité corporate.', icon: '◼' },
    { title: 'Logo créatif', desc: 'Courbes expressives, originalité formelle et impact distinctif.', icon: '✦' },
    { title: 'Signature', desc: 'Élégance statutaire évoquant le cachet d’un créateur ou d’une maison.', icon: '✍' },
  ];

  return (
    <div className="flex flex-col text-slate-200">
      {/* ===================================================
          1. HERO SECTION
         =================================================== */}
      <section className="relative pt-10 pb-20 sm:pt-16 sm:pb-28 overflow-hidden">
        {/* Background ambient light */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[950px] h-[400px] bg-gradient-to-tr from-amber-600/15 via-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6 sm:space-y-8">
            {/* Tag badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs font-medium text-amber-300 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>Générateur SaaS de Logos par Intelligence Artificielle</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] font-outfit">
              Votre prénom peut <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-white via-amber-100 to-amber-400 bg-clip-text text-transparent">
                devenir une marque.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
              Transformez votre prénom en un logo professionnel, moderne et mémorable grâce à l'intelligence artificielle.
            </p>

            {/* Primary & Secondary Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                id="hero-start-cta"
                onClick={onStartSignUp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-extrabold text-base tracking-wide shadow-[0_0_35px_rgba(245,158,11,0.3)] hover:shadow-[0_0_45px_rgba(245,158,11,0.5)] transition-all duration-200 active:scale-[0.98] cursor-pointer"
              >
                <Sparkles className="w-5 h-5 fill-slate-950" />
                <span>✨ Créer mon logo</span>
              </button>

              <a
                href="#comment-ca-marche"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-slate-200 font-semibold text-sm transition-all duration-200 cursor-pointer"
              >
                <span>Voir comment ça marche</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>

            {/* Reassuring line */}
            <p className="text-xs sm:text-sm text-slate-400 font-medium pt-2">
              Création rapide • Plusieurs concepts • Personnalisation par IA
            </p>
          </div>

          {/* Hero Visual Card (Exemple Firmin) */}
          <div className="mt-14 sm:mt-20 max-w-4xl mx-auto">
            <div className="relative rounded-3xl bg-[#0C101A]/90 border border-white/[0.1] p-6 sm:p-8 backdrop-blur-xl shadow-2xl overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-white/[0.08] gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-300 font-bold">
                    ★
                  </div>
                  <div>
                    <h2 className="text-white text-sm font-bold tracking-wide font-outfit">
                      Direction Artistique Instantanée
                    </h2>
                    <p className="text-xs text-slate-400">
                      Exemple d'identité sculptée pour le prénom « FIRMIN »
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium">
                    Prêt pour impression & web
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-6">
                <div className="md:col-span-6 flex justify-center">
                  <div className="w-full max-w-[340px] aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/[0.08]">
                    <LogoRenderer concept={heroConcept} />
                  </div>
                </div>

                <div className="md:col-span-6 space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                      Analyse Géométrique
                    </span>
                    <h3 className="text-xl font-bold text-white font-outfit">
                      Symétrie axiale & Monogramme d'autorité
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    L'algorithme a extrait l'initiale majeure « F » et son ancrage angulaire pour forger un monogramme statutaire, équilibré par une typographie serif intemporelle.
                  </p>

                  <div className="pt-2 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>4 directions graphiques différentes générées</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Export Ultra 4K, 16:9 Présentation & Vectoriel SVG</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Espace sécurisé pour retrouver vos créations</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={onStartSignUp}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Créer mon logo avec mon prénom</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          2. SECTION "QU'EST-CE QUE PRÉNOM LOGO AI ?"
         =================================================== */}
      <section className="py-16 sm:py-24 border-t border-white/[0.08] bg-[#070A12] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block">
              Présentation
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-outfit">
              Qu'est-ce que PRÉNOM LOGO AI ?
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              PRÉNOM LOGO AI est un générateur de logos intelligent qui transforme un prénom en concept d'identité visuelle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            <div className="rounded-2xl bg-[#0C111E] border border-white/[0.08] p-8 space-y-6">
              <h3 className="text-xl font-bold text-white font-outfit flex items-center gap-2.5">
                <Zap className="w-5 h-5 text-amber-400" />
                <span>Ce que l'application analyse :</span>
              </h3>

              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-amber-500/10 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <strong className="text-white">Les lettres du prénom :</strong> Étude de la longueur, des consonnes structurantes et du rythme visuel.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-amber-500/10 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <strong className="text-white">Les initiales & combinaisons :</strong> Recherche de monogrammes puissants et d'entrelacements géométriques.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-amber-500/10 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <strong className="text-white">Le style et les couleurs :</strong> Harmonie entre le style choisi (Minimal, Luxury, Tech, etc.) et les contrastes de teintes.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-amber-500/10 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <strong className="text-white">L'activité renseignée :</strong> Prise en compte de votre domaine (tech, artisanat, conseil, création) pour un résultat pertinent.
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-[#121829] to-[#0A0D15] border border-amber-500/20 p-8 space-y-6 text-slate-300">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Le résultat
              </span>
              <h3 className="text-2xl font-bold text-white font-outfit">
                Plusieurs directions graphiques sur mesure
              </h3>
              <p className="text-sm leading-relaxed">
                L'IA ne propose pas un simple clipart. Elle génère 4 approches distinctes — du monogramme d'autorité au wordmark typographique soigné — avec un dossier de présentation complet.
              </p>
              <div className="pt-2">
                <button
                  onClick={onStartSignUp}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Essayer avec mon prénom</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          3. SECTION "COMMENT ÇA MARCHE ?"
         =================================================== */}
      <section id="comment-ca-marche" className="py-16 sm:py-24 border-t border-white/[0.08] bg-[#090C16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
              Simplicité & Rapidité
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-outfit">
              Comment ça marche ?
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base">
              Compréhensible en quelques secondes : 4 étapes fluides de votre prénom à votre identité finale.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: '01',
                title: 'Entrez votre prénom',
                desc: 'Indiquez votre prénom, ainsi que votre activité ou votre slogan si vous le souhaitez.',
                color: 'text-amber-400',
              },
              {
                num: '02',
                title: 'Choisissez votre style',
                desc: 'Sélectionnez l’univers graphique désiré (Minimal, Premium, Luxury, Tech, Business, etc.).',
                color: 'text-sky-400',
              },
              {
                num: '03',
                title: "L'IA crée vos concepts",
                desc: 'En quelques secondes, découvrez 4 propositions de logos originales et percutantes.',
                color: 'text-purple-400',
              },
              {
                num: '04',
                title: 'Personnalisez et téléchargez',
                desc: 'Ajustez avec l’IA et téléchargez en Ultra 4K, 16:9 Présentation, PNG transparent ou SVG.',
                color: 'text-emerald-400',
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-[#0D1220] border border-white/[0.08] p-6 flex flex-col justify-between hover:border-white/[0.18] transition-all group"
              >
                <div>
                  <span className={`text-3xl font-black font-mono ${step.color} block mb-4`}>
                    {step.num}
                  </span>
                  <h3 className="text-base font-bold text-white font-outfit mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          4. SECTION "POUR QUI ?"
         =================================================== */}
      <section className="py-16 sm:py-24 border-t border-white/[0.08] bg-[#070A12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
              Cas d'usage
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-outfit">
              Pour qui est fait PRÉNOM LOGO AI ?
            </h2>
            <p className="mt-3 text-slate-400 text-sm">
              Conçu pour toutes les personnes souhaitant affirmer leur identité sans complexité technique.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {profiles.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#0B0F1B] border border-white/[0.08] p-6 hover:border-white/[0.16] transition-colors"
                >
                  <div className={`w-11 h-11 rounded-xl ${p.bg} border ${p.border} ${p.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white font-outfit mb-2">{p.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================
          5. SECTION "CE QUE VOUS POUVEZ CRÉER"
         =================================================== */}
      <section className="py-16 sm:py-24 border-t border-white/[0.08] bg-[#090D17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
              Styles & Univers
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-outfit">
              Ce que vous pouvez créer
            </h2>
            <p className="mt-3 text-slate-400 text-sm">
              Une diversité de registres visuels pour correspondre précisément à votre personnalité.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {logoStyles.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-[#0D1222] border border-white/[0.08] p-6 hover:border-amber-500/30 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-center justify-center text-base font-black mb-4 font-cinzel group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-base font-bold text-white font-outfit mb-1.5">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] text-amber-400/80 font-medium flex items-center gap-1">
                  <span>Prêt en export HD & 4K</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          6. SECTION "POURQUOI L'UTILISER ?"
         =================================================== */}
      <section className="py-16 sm:py-24 border-t border-white/[0.08] bg-[#070A12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-[#101626] to-[#0A0E18] border border-white/[0.1] p-8 sm:p-12 text-center space-y-8 shadow-2xl">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block">
                Zéro friction créative
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-outfit">
                Pourquoi utiliser PRÉNOM LOGO AI ?
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left max-w-2xl mx-auto pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-sm font-semibold text-white">Pas besoin d'être graphiste.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-sm font-semibold text-white">Pas besoin de savoir utiliser Photoshop.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-sm font-semibold text-white">Pas besoin de commencer avec une idée précise.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-sm font-semibold text-white">Vous donnez simplement votre prénom.</p>
              </div>
            </div>

            <p className="text-sm sm:text-base text-amber-200/90 font-medium">
              « L'intelligence artificielle vous aide à explorer plusieurs directions et sculpte votre identité en quelques secondes. »
            </p>

            <div>
              <button
                onClick={onStartSignUp}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm tracking-wide shadow-lg transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Commencer gratuitement</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          7. SECTION EXEMPLES PUBLICS (GALERIE DÉMO)
         =================================================== */}
      <section id="exemples" className="py-16 sm:py-24 border-t border-white/[0.08] bg-[#090C16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
              Galerie Publique
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-outfit">
              Exemples de logos créés
            </h2>
            <p className="mt-3 text-slate-400 text-sm">
              Découvrez comment de simples prénoms sont transformés en marques de référence.
            </p>
            <div className="mt-3 inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 font-medium">
              Démonstrations interactives • Créez le vôtre en un clic
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {demoGallery.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-[#0D1220] border border-white/[0.08] p-4 flex flex-col justify-between hover:border-amber-500/30 transition-all group"
              >
                <div className="aspect-square w-full rounded-xl overflow-hidden mb-4 border border-white/[0.06] shadow-md">
                  <LogoRenderer concept={item.concept} />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white font-outfit">{item.name}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.05] text-slate-400 font-mono">
                      {item.style}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{item.concept.shortDescription}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA under examples */}
          <div className="mt-14 text-center">
            <button
              onClick={onStartSignUp}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm tracking-wide shadow-xl transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Créer mon propre logo</span>
            </button>
            <p className="text-xs text-slate-500 mt-2">Inscription requise pour accéder au générateur privé</p>
          </div>
        </div>
      </section>

      {/* ===================================================
          8. SECTION FONCTIONNALITÉS
         =================================================== */}
      <section id="fonctionnalites" className="py-16 sm:py-24 border-t border-white/[0.08] bg-[#070A12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
              Fonctionnalités Clés
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-outfit">
              Tout pour forger votre identité
            </h2>
            <p className="mt-3 text-slate-400 text-sm">
              Un moteur de branding complet qui va bien au-delà d'un simple éditeur d'icônes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Sparkles,
                title: 'Génération de plusieurs concepts',
                desc: '4 directions artistiques autonomes : monogramme, symbole géométrique, wordmark et blason.',
              },
              {
                icon: Palette,
                title: 'Choix du style',
                desc: '8 styles esthétiques prédéfinis pour calibrer la personnalité exacte de votre marque.',
              },
              {
                icon: Layers,
                title: 'Choix des couleurs',
                desc: 'Nuanciers raffinés (Or & Noir, Monochrome, Bleu Prestige, etc.) avec adaptation automatique.',
              },
              {
                icon: Zap,
                title: 'Personnalisation avec l’IA',
                desc: 'Affinez n’importe quel concept par une simple consigne en français avec réévaluation en temps réel.',
              },
              {
                icon: RefreshCw,
                title: 'Création de variantes',
                desc: 'Déclinez instantanément votre logo sur fond clair, fond sombre et en version simplifiée.',
              },
              {
                icon: Eye,
                title: 'Prévisualisation professionnelle',
                desc: 'Mises en situation réalistes sur smartphone, carte de visite, site web et enseigne.',
              },
              {
                icon: Download,
                title: 'Téléchargement multi-formats',
                desc: 'Exports en Haute Résolution, Ultra 4K (3840×3840), Slides 16:9, PNG transparent et SVG.',
              },
              {
                icon: FolderLock,
                title: 'Historique des créations',
                desc: 'Retrouvez tous vos logos sauvegardés dans votre espace personnel cloud sécurisé.',
              },
              {
                icon: User,
                title: 'Espace personnel dédié',
                desc: 'Gestion de compte, abonnement et stockage individuel isolé par des règles de base de données.',
              },
            ].map((f, idx) => {
              const Icon = f.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#0B0F1B] border border-white/[0.08] p-6 hover:border-amber-500/20 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white font-outfit mb-2">{f.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================
          9. SECTION HISTORIQUE & ESPACE PERSONNEL
         =================================================== */}
      <section className="py-16 sm:py-24 border-t border-white/[0.08] bg-[#090D17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto rounded-3xl bg-[#0C111E] border border-white/[0.08] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-lg">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block">
                Espace Privé & Sécurisé
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-outfit">
                Retrouvez vos logos à tout moment.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Chaque utilisateur dispose de son propre espace de stockage privé. Vos logos créés sont sauvegardés de manière permanente et ne sont jamais visibles par d'autres utilisateurs grâce à notre cloisonnement strict de sécurité.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                <Lock className="w-4 h-4" />
                <span>Cloisonnement individuel certifié par règles Firestore</span>
              </div>
            </div>

            <div className="w-full md:w-auto shrink-0">
              <button
                onClick={onStartSignUp}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.15] text-white font-bold text-xs transition-colors cursor-pointer"
              >
                <User className="w-4 h-4 text-amber-400" />
                <span>Créer mon compte pour sauvegarder</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          10. SECTION TARIFS (PLANS GRATUIT & PRO)
         =================================================== */}
      <section id="tarifs" className="py-16 sm:py-24 border-t border-white/[0.08] bg-[#070A12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
              Tarification Transparente
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-outfit">
              Choisissez votre formule
            </h2>
            <p className="mt-3 text-slate-400 text-sm">
              Commencez gratuitement dès aujourd'hui et passez au niveau supérieur pour vos besoins professionnels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* PLAN GRATUIT */}
            <div className="rounded-3xl bg-[#0B0F1B] border border-white/[0.08] p-8 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white font-outfit">PLAN GRATUIT</h3>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-white/[0.05] text-slate-400 font-mono">
                    Découverte
                  </span>
                </div>

                <div>
                  <span className="text-4xl font-black text-white font-outfit">0 €</span>
                  <span className="text-xs text-slate-400 ml-2">Pour toujours</span>
                </div>

                <p className="text-xs text-slate-400">
                  Idéal pour découvrir le potentiel de votre prénom et générer vos premiers logos.
                </p>

                <div className="space-y-3 pt-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Génération de 4 concepts par prénom</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Téléchargement format standard (1080×1080)</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Prévisualisation smartphone & web</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Espace privé pour retrouver vos créations</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={onStartSignUp}
                  className="w-full py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Commencer gratuitement
                </button>
              </div>
            </div>

            {/* PLAN PRO */}
            <div className="rounded-3xl bg-gradient-to-b from-[#12192B] to-[#0A0D15] border border-amber-500/40 p-8 flex flex-col justify-between relative shadow-2xl">
              <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-[10px] tracking-wider uppercase shadow-md">
                Recommandé
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-amber-300 font-outfit flex items-center gap-2">
                    <Crown className="w-4 h-4 text-amber-400" />
                    <span>PLAN PRO</span>
                  </h3>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                    Prix à venir
                  </span>
                </div>

                <div>
                  <span className="text-3xl sm:text-4xl font-black text-white font-outfit">
                    Offre Spéciale
                  </span>
                  <span className="text-xs text-amber-300 block mt-1">Accès prioritaire aux fonctionnalités</span>
                </div>

                <p className="text-xs text-slate-300">
                  Pour les professionnels, créateurs et entreprises exigeant une qualité d'impression maximale.
                </p>

                <div className="space-y-3 pt-2 text-xs text-slate-200">
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-amber-400 shrink-0" />
                    <span><strong>Générations et retouches illimitées</strong></span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-amber-400 shrink-0" />
                    <span><strong>Export Ultra Haute Résolution 4K (3840×3840)</strong></span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-amber-400 shrink-0" />
                    <span><strong>Fichiers vectoriels éditables (SVG)</strong></span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-amber-400 shrink-0" />
                    <span><strong>Slides de présentation 16:9 (Pitch Deck)</strong></span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-amber-400 shrink-0" />
                    <span><strong>PNG transparents & Kit de marque complet</strong></span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={onStartSignUp}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs tracking-wide shadow-lg transition-all cursor-pointer"
                >
                  Rejoindre la liste Pro
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          11. SECTION FAQ
         =================================================== */}
      <section id="faq" className="py-16 sm:py-24 border-t border-white/[0.08] bg-[#090D17]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
              Questions Fréquentes
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-outfit">
              Foire Aux Questions
            </h2>
            <p className="mt-3 text-slate-400 text-sm">
              Tout ce que vous devez savoir avant de créer votre logo.
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-[#0C101C] border border-white/[0.08] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm font-bold text-white hover:text-amber-300 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{item.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      openFaqIndex === idx ? 'rotate-180 text-amber-400' : ''
                    }`}
                  />
                </button>
                {openFaqIndex === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-white/[0.04]">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          12. FINAL CALL TO ACTION
         =================================================== */}
      <section className="py-20 border-t border-white/[0.08] bg-gradient-to-b from-[#070A12] to-[#04060A] text-center relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-outfit">
            Prêt à transformer votre prénom en marque ?
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Créez votre compte en moins d'une minute et accédez directement à votre générateur de logos personnalisé.
          </p>
          <div className="pt-2">
            <button
              onClick={onStartSignUp}
              className="inline-flex items-center gap-2.5 px-9 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-extrabold text-base tracking-wide shadow-[0_0_35px_rgba(245,158,11,0.3)] transition-all cursor-pointer"
            >
              <Sparkles className="w-5 h-5 fill-slate-950" />
              <span>✨ Créer mon logo maintenant</span>
            </button>
          </div>
          <div className="pt-4 flex items-center justify-center gap-6 text-xs text-slate-500">
            <button onClick={onOpenTerms} className="hover:text-slate-300 transition-colors cursor-pointer">
              Conditions d'utilisation
            </button>
            <span>•</span>
            <button onClick={onOpenPrivacy} className="hover:text-slate-300 transition-colors cursor-pointer">
              Politique de confidentialité
            </button>
            <span>•</span>
            <button onClick={onOpenContact} className="hover:text-slate-300 transition-colors cursor-pointer">
              Contact & Support
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
