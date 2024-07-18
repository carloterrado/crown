import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { getFirestore, getDoc, addDoc, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCgLDg8TzWh2rcBrxJAsxn2Lg6oPHLR-IM",
  authDomain: "crown-db-bc06b.firebaseapp.com",
  projectId: "crown-db-bc06b",
  storageBucket: "crown-db-bc06b.appspot.com",
  messagingSenderId: "952400738209",
  appId: "1:952400738209:web:95502507a7b089263e7de0",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInUserWithEmailAndPassword = (email, password) => {
  if (!email || !password) return;
  return signInWithEmailAndPassword(auth, email, password);
};

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  try {
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
      const { email, displayName } = userAuth;
      const createdAt = new Date();

      await setDoc(userDocRef, { email, displayName, createdAt });
    }
    return userDocRef;
  } catch (error) {
    console.log(error.message);
  }
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
