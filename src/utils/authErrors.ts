/**
 * Firebase Authentication error mapping and validation utilities.
 * Maps technical Firebase error codes to clear, actionable French explanations.
 */

export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  // RFC 5322 compliant regex simplified
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email.trim());
}

export function mapFirebaseAuthError(err: any): string {
  if (!err) return "Une erreur inattendue est survenue lors de l'authentification.";

  const code: string = err.code || '';
  const message: string = err.message || '';

  switch (code) {
    case 'auth/email-already-in-use':
      return 'Cette adresse e-mail possède déjà un compte. Connectez-vous plutôt.';

    case 'auth/invalid-email':
      return "Cette adresse e-mail n'est pas valide.";

    case 'auth/weak-password':
      return 'Le mot de passe doit comporter au moins 6 caractères.';

    case 'auth/invalid-credential':
    case 'auth/invalid-login-credentials':
      return 'Adresse e-mail ou mot de passe incorrect.';

    case 'auth/user-not-found':
      return "Aucun compte n'existe avec cette adresse e-mail. Veuillez créer un compte.";

    case 'auth/wrong-password':
      return 'Le mot de passe saisi est incorrect.';

    case 'auth/operation-not-allowed':
      return "La méthode de connexion sélectionnée (Email/Mot de passe ou Google) n'est pas encore activée dans votre Firebase Console.";

    case 'auth/popup-closed-by-user':
      return 'La fenêtre de connexion Google a été fermée avant la fin de la connexion.';

    case 'auth/popup-blocked':
      return 'Le navigateur a bloqué la fenêtre pop-up Google. Autorisez les pop-ups ou utilisez le formulaire e-mail.';

    case 'auth/unauthorized-domain': {
      const currentHost = typeof window !== 'undefined' ? window.location.hostname : 'votre domaine';
      return `Le domaine actuel (${currentHost}) n'est pas encore autorisé dans Firebase. Rendez-vous dans Firebase Console > Authentication > Settings > Authorized domains pour l'ajouter.`;
    }

    case 'auth/account-exists-with-different-credential':
      return 'Un compte existe déjà avec cette adresse e-mail via mot de passe. Connectez-vous avec votre mot de passe.';

    case 'auth/too-many-requests':
      return 'Trop de tentatives infructueuses ont été détectées. Veuillez patienter quelques minutes avant de réessayer.';

    case 'auth/network-request-failed':
      return 'Impossible de joindre les serveurs Firebase. Veuillez vérifier votre connexion Internet.';

    case 'auth/cancelled-popup-request':
      return 'La requête de connexion a été annulée car une autre est en cours.';

    default:
      if (message && !message.includes('[object Object]')) {
        // Strip Firebase prefix if present
        const cleanMsg = message.replace(/^Firebase:\s*/, '').replace(/\s*\(auth\/[^)]+\)\.?$/, '');
        return cleanMsg || "Une erreur est survenue lors de l'authentification.";
      }
      return "Une erreur est survenue lors de l'authentification. Veuillez réessayer.";
  }
}
