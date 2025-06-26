import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "aithor-87004.firebaseapp.com",
  projectId: "aithor-87004",
  storageBucket: "aithor-87004.appspot.com",
  messagingSenderId: "1005070637076",
  appId: "1:1005070637076:web:cebbebf574903d2eff2f01",
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
};

export default Auth;