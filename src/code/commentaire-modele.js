import { bd, collImages, collComs } from "./init";
import { collection, orderBy, query, onSnapshot, deleteDoc, doc, setDoc, updateDoc, getDoc} from "firebase/firestore";

/************************** observer les commentaires **************************/

export async function obsever(jour, mutateurCommentaires) {
  return onSnapshot(
    query(
      collection(bd, collImages, jour, collComs),
      orderBy('timestamp', 'desc')
    ),
    resultat => {
      const comsFs = resultat.docs.map(
        doc => ({id: doc.id, ...doc.data()})
      );
      mutateurCommentaires(comsFs);
    }
  )
}

/************************** supprimer un commentaire **************************/

export async function supprimer(jour, idCom) {
  const refCom = doc(bd, collImages, jour, collComs, idCom);
  await deleteDoc(refCom);
}

/************************** ajouter un commentaire **************************/

export async function creer(jour, infoCom) {
  const refCom = doc(collection(bd, collImages, jour, collComs));
  await setDoc(refCom, infoCom);
  return refCom.id;
}

/************************** ajouter un vote **************************/

export async function creerVote(jour, idCom, idUtilisateur, valeurVote) {
  const refVote = doc(bd, collImages, jour, collComs, idCom);
  const voteData = await getDoc(refVote);
  const votes = voteData.exists() ? voteData.data().votes : {};

  votes[idUtilisateur] = valeurVote;

  await updateDoc(refVote, { votes });
}

/************************** Supprimer un vote **************************/

export async function supprimerVote(jour, idCom, idUtilisateur) {
  const refVote = doc(bd, collImages, jour, collComs, idCom);
  const voteData = await getDoc(refVote);
  const votes = voteData.exists() ? voteData.data().votes : {};

  delete votes[idUtilisateur];

  await updateDoc(refVote, { votes });
}



