import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import {
  auth,
  db,
  googleProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  fbSignOut,
  sendPasswordResetEmail,
  updateProfile,
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
} from '../services/firebase';
import { UserProfile, SavedLogoItem, LogoConcept, PlanType } from '../types';
import { mapFirebaseAuthError } from '../utils/authErrors';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  authError: string | null;
  clearAuthError: () => void;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<void>;
  signInGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  savedLogos: SavedLogoItem[];
  loadingLogos: boolean;
  saveLogo: (concept: LogoConcept) => Promise<string>;
  deleteSavedLogo: (logoId: string) => Promise<void>;
  upgradePlan: (newPlan: PlanType) => Promise<void>;
  refreshSavedLogos: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [savedLogos, setSavedLogos] = useState<SavedLogoItem[]>([]);
  const [loadingLogos, setLoadingLogos] = useState(false);

  const clearAuthError = () => setAuthError(null);

  // Fetch or initialize user profile document in Firestore
  const fetchOrCreateUserProfile = async (firebaseUser: User, extraName?: { firstName?: string; lastName?: string }) => {
    try {
      const userRef = doc(db, 'users', firebaseUser.uid);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        const data = snap.data() as UserProfile;
        setUserProfile(data);
      } else {
        const nameParts = (firebaseUser.displayName || '').trim().split(' ');
        const derivedFirst = extraName?.firstName || nameParts[0] || 'Créateur';
        const derivedLast = extraName?.lastName || nameParts.slice(1).join(' ') || '';

        const newProfile: UserProfile = {
          userId: firebaseUser.uid,
          firstName: derivedFirst,
          lastName: derivedLast,
          email: firebaseUser.email || '',
          plan: 'free',
          createdAt: new Date().toISOString(),
          generationsCount: 0,
        };

        // Use { merge: true } to guarantee non-destructive profile creation
        await setDoc(userRef, newProfile, { merge: true });
        setUserProfile(newProfile);
      }
    } catch (err: any) {
      console.error('Error fetching/creating user profile:', err);
      // Fallback local representation if network issue
      setUserProfile({
        userId: firebaseUser.uid,
        firstName: extraName?.firstName || firebaseUser.displayName || 'Créateur',
        lastName: extraName?.lastName || '',
        email: firebaseUser.email || '',
        plan: 'free',
        createdAt: new Date().toISOString(),
      });
    }
  };

  // Load saved logos from subcollection /users/{userId}/logos
  const loadUserLogos = async (userId: string) => {
    setLoadingLogos(true);
    try {
      const logosRef = collection(db, 'users', userId, 'logos');
      const snap = await getDocs(logosRef);
      const list: SavedLogoItem[] = [];
      snap.forEach((docItem) => {
        const data = docItem.data();
        list.push({
          id: docItem.id,
          userId,
          concept: data.concept || data,
          createdAt: data.createdAt || new Date().toISOString(),
          notes: data.notes || '',
        });
      });
      // Sort newest first
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setSavedLogos(list);
    } catch (err: any) {
      console.error('Error loading user logos:', err);
    } finally {
      setLoadingLogos(false);
    }
  };

  // Auth state listener & redirect handler
  useEffect(() => {
    // Process redirect results from mobile browsers
    getRedirectResult(auth)
      .then(async (result) => {
        if (result && result.user) {
          await fetchOrCreateUserProfile(result.user);
          await loadUserLogos(result.user.uid);
        }
      })
      .catch((err) => {
        console.warn('Redirect auth result info:', err);
        const mapped = mapFirebaseAuthError(err);
        setAuthError(mapped);
      });

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchOrCreateUserProfile(currentUser);
        await loadUserLogos(currentUser.uid);
      } else {
        setUserProfile(null);
        setSavedLogos([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sign up with Email & Password
  const signUpWithEmail = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    setAuthError(null);
    try {
      const cleanEmail = email.trim();
      const cleanFirst = firstName.trim();
      const cleanLast = lastName.trim();

      const cred = await createUserWithEmailAndPassword(auth, cleanEmail, password);
      await updateProfile(cred.user, {
        displayName: `${cleanFirst} ${cleanLast}`.trim(),
      });
      await fetchOrCreateUserProfile(cred.user, { firstName: cleanFirst, lastName: cleanLast });
    } catch (err: any) {
      console.error('Sign up error:', err);
      const mapped = mapFirebaseAuthError(err);
      setAuthError(mapped);
      throw new Error(mapped);
    }
  };

  // Sign in with Email & Password
  const signInWithEmail = async (email: string, password: string) => {
    setAuthError(null);
    try {
      const cleanEmail = email.trim();
      const cred = await signInWithEmailAndPassword(auth, cleanEmail, password);
      await fetchOrCreateUserProfile(cred.user);
      await loadUserLogos(cred.user.uid);
    } catch (err: any) {
      console.error('Sign in error:', err);
      const mapped = mapFirebaseAuthError(err);
      setAuthError(mapped);
      throw new Error(mapped);
    }
  };

  // Sign in with Google
  const signInGoogle = async () => {
    setAuthError(null);
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      await fetchOrCreateUserProfile(cred.user);
      await loadUserLogos(cred.user.uid);
    } catch (err: any) {
      console.error('Google Sign In error:', err);
      // Fallback to redirect if popup blocked on mobile
      if (err?.code === 'auth/popup-blocked') {
        try {
          await signInWithRedirect(auth, googleProvider);
          return;
        } catch (redirectErr: any) {
          const mapped = mapFirebaseAuthError(redirectErr);
          setAuthError(mapped);
          throw new Error(mapped);
        }
      }
      const mapped = mapFirebaseAuthError(err);
      setAuthError(mapped);
      throw new Error(mapped);
    }
  };

  // Password reset email
  const sendPasswordReset = async (email: string) => {
    setAuthError(null);
    try {
      await sendPasswordResetEmail(auth, email.trim());
    } catch (err: any) {
      console.error('Password reset error:', err);
      const mapped = mapFirebaseAuthError(err);
      setAuthError(mapped);
      throw new Error(mapped);
    }
  };

  // Sign out
  const signOutUser = async () => {
    try {
      await fbSignOut(auth);
      setUser(null);
      setUserProfile(null);
      setSavedLogos([]);
    } catch (err: any) {
      console.error('Sign out error:', err);
    }
  };

  // Save Logo to user's private collection in Firestore
  const saveLogo = async (concept: LogoConcept): Promise<string> => {
    if (!user) throw new Error('Utilisateur non connecté.');

    const logoId = concept.id || `logo_${Date.now()}`;
    const logoRef = doc(db, 'users', user.uid, 'logos', logoId);

    const logoPayload = {
      id: logoId,
      userId: user.uid,
      concept,
      brandName: concept.brandName,
      style: concept.style,
      conceptType: concept.conceptType,
      createdAt: new Date().toISOString(),
    };

    await setDoc(logoRef, logoPayload);

    // Refresh list locally
    setSavedLogos((prev) => [
      {
        id: logoId,
        userId: user.uid,
        concept,
        createdAt: logoPayload.createdAt,
      },
      ...prev.filter((item) => item.id !== logoId),
    ]);

    return logoId;
  };

  // Delete saved logo
  const deleteSavedLogo = async (logoId: string) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'logos', logoId));
      setSavedLogos((prev) => prev.filter((item) => item.id !== logoId));
    } catch (err) {
      console.error('Error deleting logo:', err);
      throw err;
    }
  };

  // Upgrade Plan
  const upgradePlan = async (newPlan: PlanType) => {
    if (!user || !userProfile) return;
    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, { ...userProfile, plan: newPlan }, { merge: true });
      setUserProfile((prev) => (prev ? { ...prev, plan: newPlan } : null));
    } catch (err) {
      console.error('Error upgrading plan:', err);
      throw err;
    }
  };

  const refreshSavedLogos = async () => {
    if (user) {
      await loadUserLogos(user.uid);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        authError,
        clearAuthError,
        signInWithEmail,
        signUpWithEmail,
        signInGoogle,
        signOutUser,
        sendPasswordReset,
        savedLogos,
        loadingLogos,
        saveLogo,
        deleteSavedLogo,
        upgradePlan,
        refreshSavedLogos,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
