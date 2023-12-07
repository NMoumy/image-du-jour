import './Commentaire.scss';
import { useContext, useEffect, useState } from 'react';
import { UtilisateurContext } from './Appli'
import { creerVote, supprimerVote } from '../code/commentaire-modele';
import { toast } from 'react-toastify';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ClearIcon from '@mui/icons-material/Clear';

export default function Commentaire({ id, idUtil, nomUtil, texte, votes, date, supprimerCommentaire }) {
  const utilisateur = useContext(UtilisateurContext);

  const [voteP, setVoteP] = useState(Object.values(votes).reduce((compte, valActuelle) => valActuelle > 0 ? compte + Math.abs(valActuelle) : compte, 0));
  const [voteN, setVoteN] = useState(Object.values(votes).reduce((compte, valActuelle) => valActuelle < 0 ? compte + Math.abs(valActuelle) : compte, 0));
  
  useEffect(() => {
    const votesArray = Object.values(votes); // Récupérer les valeurs des votes
    const voteP = votesArray.reduce((compte, valActuelle) => valActuelle > 0 ? compte + Math.abs(valActuelle) : compte, 0);
    const voteN = votesArray.reduce((compte, valActuelle) => valActuelle < 0 ? compte + Math.abs(valActuelle) : compte, 0);

    setVoteP(voteP);
    setVoteN(voteN);
  }, [votes]);

  async function ajouterVoteP() {
    if(utilisateur) {
      if(votes[utilisateur.uid] === 1) {
        await supprimerVote(date, id, utilisateur.uid);
      }
      else {
        const valeurVote = 1;
        await creerVote(date, id, utilisateur.uid, valeurVote);
      }
    }
    else {
      toast.error('Veuillez vous connecter pour ajouter un vote.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        toastId: 'vote01'
      });
    }
  }

  async function ajouterVoteN() {
    if(utilisateur) {
      if(votes[utilisateur.uid] === -1) {
        await supprimerVote(date, id, utilisateur.uid);
      }
      else {
        const valeurVote = -1; 
        await creerVote(date, id, utilisateur.uid, valeurVote);
      }
    }
    else {
      toast.error('Veuillez vous connecter pour ajouter un vote.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        toastId: 'vote01'
      });
    }
  }

  let peutSupprimer = false;
  if(utilisateur){
    if(utilisateur.uid === idUtil){
      peutSupprimer = true;
    }
  }


  return (
    <div className={`Commentaire ${(utilisateur ? votes[utilisateur.uid] : '') === -1 ? 'vote-negatif' : ''}`}>
      <div>
        {
          peutSupprimer 
        ? 
          (
            <button onClick={() => supprimerCommentaire(id)} className="supprimer" size="small">
              <ClearIcon className='icon-suppr' />
            </button>
          )
        :
          ''
        }
      </div>
      <div>
        <h4>{nomUtil}</h4>
      </div>
      <p>{texte}</p>
      <div className='votes'>
        <button onClick={ajouterVoteP} className='vote-pos'>
          <ThumbUpIcon className={`icon-vote ${(utilisateur ? votes[utilisateur.uid] === 1 : '') ? 'choix-vote-p' : ''}`}/> {voteP}
        </button>
        <button onClick={ajouterVoteN} className='vote-neg'>
          <ThumbDownIcon className={`icon-vote ${(utilisateur ? votes[utilisateur.uid] === -1 : '') ? 'choix-vote-n' : ''}`} /> {voteN}
        </button>
      </div>
    </div>
  );
}
