import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "VITE_FIREBASE_API_KEY",
  authDomain: "VITE_FIREBASE_AUTH_DOMAIN",
  projectId: "VITE_FIREBASE_PROJECT_ID",
  storageBucket: "VITE_FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "VITE_FIREBASE_MESSAGING_SENDER_ID",
  appId: "VITE_FIREBASE_APP_ID",
};

const appFirebase = initializeApp(firebaseConfig);
const auth = getAuth(appFirebase);

const Auth = {
  login: async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  },
  create: async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  },
  getCurrentUser: () => auth.currentUser,
  logout: async () => {
    await signOut(auth);
  },
  getIdToken: async () => {
    const user = auth.currentUser;
    return user ? await user.getIdToken() : null;
  },
};

export default Auth;