import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import firebaseConfig from "./fb-config";

// Initialiser l'appli Firebase
const app = initializeApp(firebaseConfig);

// Obtenir une connexion à la BD Firestore
export const bd = getFirestore(app);

// Initialiser le service d'authentification Firebase 
export const auth = getAuth(app);

// Initialiser le service du "provider" Google (authentification fédérée)
export const googleAuth = new GoogleAuthProvider();

// Initialiser le service Storage
export const stockage = getStorage(app);

// Noms des collections Firestore utilisées dans l'appli
export const collUtilisateurs = 'utilisateurs';
export const collImages = 'images';
export const collComs = 'commentaires';
