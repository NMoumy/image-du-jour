import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, bd, googleAuth } from "./init";

export function deconnexion() {
    auth.signOut();
}

export function connexion() {
    signInWithPopup(auth, googleAuth);
}

export function observerEtatConnexion(mutateurUtilisateur) {
    onAuthStateChanged(auth, u => {
        if(u) {
            setDoc(doc(bd, 'utilisateurs', u.uid), {
                nom: u.displayName,
                courriel: u.email,
                avatar: u.photoURL
            }, {merge: true});
        }
        mutateurUtilisateur(u);
    })
}