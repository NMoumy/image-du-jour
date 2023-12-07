import './Appli.scss';
import Image from './Image';
import Utilisateur from './Utilisateur';
import ListeCommentaires from './ListeCommentaires';
import { useEffect, useState, createContext } from 'react';
import { observerEtatConnexion } from '../code/utilisateur-modele';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const UtilisateurContext = createContext(null); 

export default function Appli() {
  const [utilisateur, setUtilisateur] = useState(null);
  // const [date, setDate] = useState(new Date().toISOString().slice(0, 10).replace(/-/g, '')); 
  const [date, setDate] = useState('20230608');

  useEffect(
    () => observerEtatConnexion(setUtilisateur),
    []
  );

  return (
    <UtilisateurContext.Provider value={utilisateur}>
    <div className="Appli">
      <Utilisateur/>
      <Image date = {date} setDate = {setDate}/>
      <ListeCommentaires date = {date}/>
      <ToastContainer />
    </div>
    </UtilisateurContext.Provider>
  );
}
