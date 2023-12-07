import './Aime.scss';
import { useContext, useEffect, useState } from 'react';
import { UtilisateurContext } from './Appli'
import { modifierAime, supprimerAime } from '../code/image-modele';
import { toast } from 'react-toastify';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { observerAime } from '../code/image-modele';

export default function Aime({aime, date}) {
  const utilisateur = useContext(UtilisateurContext);
  const [aimeList, setAimeList] = useState(aime);
  const totalAime = aimeList.length;

  useEffect(
    () => {
      observerAime(date, setAimeList);
      setAimeList(aime);
    }, 
  [date, aime]);

  async function ajouterAime() {
    
    if (utilisateur) {

      if (aimeList.includes(utilisateur.uid)) {
        await supprimerAime(date, aimeList, setAimeList, utilisateur.uid);
        setAimeList(aimeList.filter((id) => id !== utilisateur.uid));
      } 

      else {
        await modifierAime(date, aimeList, setAimeList, utilisateur.uid);
        setAimeList([...aimeList, utilisateur.uid]);
      }

    }

    else {
      toast.error('Veuillez vous connecter pour aimer une photo.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        toastId: 'aime01'
      });
    }

  }

  return (
    <div className="Aime">
      <button onClick={ajouterAime} className='btn-aime'>
        <FavoriteIcon className={`coeur ${(utilisateur ? aimeList.includes(utilisateur.uid) : '') ? 'coeur-clic' : ''}`}/>
        <span className='compte'>{totalAime}</span>
      </button>
    </div>
  );
}

