import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  getDoc,
  addDoc,
  doc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

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

export const addCollectionAndDocuments = async (collectionKey, objects) => {
  const colRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objects.forEach((object) => {
    const docRef = doc(colRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const categoriesRef = collection(db, "categories");
  const q = query(categoriesRef);

  const querySnapShot = await getDocs(q);

  const categoriesMap = querySnapShot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();

    acc[title.toLowerCase()] = items;

    return acc;
  }, {});

  return categoriesMap;
};

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

export const signOutAuthUser = async () => {
  try {
    return await signOut(auth);
  } catch (error) {
    console.log(error);
  }
};

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const alertFirebaseErrorMessage = (errorCode) => {
  switch (errorCode) {
    // sign in error
    case "auth/invalid-credential":
      alert("wrong email or password");
      break;
    case "auth/weak-password":
      alert("weak password");
      break;
    // sign up error
    case "auth/email-already-in-use":
      alert("email already in use");
      break;
    case "auth/weak-password":
      alert("weak password");
      break;
    // close popup
    case "auth/popup-closed-by-user":
      console.log("popup window closed by user");
      break;
    default:
      console.log(errorCode);
      break;
  }
};
