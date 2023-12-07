import './Utilisateur.scss';
import Avatar from '@mui/material/Avatar';
import { connexion, deconnexion } from '../code/utilisateur-modele';
import { useContext } from 'react';
import { UtilisateurContext } from './Appli'

export default function Utilisateur() {
  const utilisateur = useContext(UtilisateurContext);

  return (
    <div className="Utilisateur">
      {
        utilisateur 
          ? 
        (
          <div className='zoneUtil'>

            <div className='infoUtil'>
              <Avatar className="avatar" alt={utilisateur.displayName} src={utilisateur.photoURL} />
              <h3 className="nomUtil">{utilisateur.displayName}</h3>
            </div>
              
            <button onClick={deconnexion} className="btn-dec">Déconnexion</button>
            
          </div>
        ) 
          : 
        (
          <button onClick={connexion} className="btn-con">Connexion</button>
        )
      }
    </div>
  );
}

        
        
