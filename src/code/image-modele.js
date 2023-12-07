import { bd, collImages } from "./init";
import { arrayRemove, arrayUnion, doc, getDoc, onSnapshot, updateDoc} from "firebase/firestore";

/************************** obtenir les images **************************/
export async function obtenir(jour) {
  const idj = await getDoc(doc(bd, collImages, jour));
  const data = idj.data();
  const image = {
      id: idj.id,
      description: data.description || '',
      url: data.url,
      aime: data.aime || []
  };
  return image;
}

/************************** observer les aimes **************************/
export async function observerAime(jour, mutateurAime) {
  const observer = onSnapshot(doc(bd, collImages, jour), (snapshot) => {
    const aimeList = snapshot.data().aime || [];
    mutateurAime(aimeList);
  });
  return observer;
}

/************************** ajouter des j'aimes **************************/
export async function modifierAime(jour, aime, setAime, utilisateur) {
  const refCom = doc(bd, collImages, jour);
  await updateDoc(refCom, {
    aime: arrayUnion(utilisateur)
  });
  setAime([...aime, utilisateur]);
}

/************************** enlever des j'aimes **************************/
export async function supprimerAime(jour, aime, setAime, utilisateur) {
  const refCom = doc(bd, collImages, jour);
  if (aime.includes(utilisateur)) {
    await updateDoc(refCom, {
      aime: arrayRemove(utilisateur)
    });
    setAime(aime.filter((id) => id !== utilisateur));
  }
}