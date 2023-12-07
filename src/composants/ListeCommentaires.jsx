import './ListeCommentaires.scss';
import Commentaire from './Commentaire';
import { useEffect, useState, useContext } from "react";
import { obsever, supprimer } from "../code/commentaire-modele";
import { creer } from "../code/commentaire-modele";
import { UtilisateurContext } from './Appli'
import { toast } from 'react-toastify';

export default function ListeCommentaires({date}) {
  const utilisateur = useContext(UtilisateurContext);
  const [coms, setComs] = useState([]);
  const [nvxCom, setNvxCom] = useState('');

  useEffect(
    ()=> {
      async function obtenirCommentaires() {
        setComs([]);
        obsever(date, setComs)
      }
      obtenirCommentaires();
    }, 
  [date]);

  const envoiFormulaire = (event) => {
    event.preventDefault();

    if (utilisateur) {
      
      if (nvxCom.trim()) {
        const timestamp = new Date().setFullYear(2024); // la base de donnee a creer des timestamp qui depasse le jour d'aujourd'hui
        const idUtil = utilisateur.uid;
        const nomUtil = utilisateur.displayName;
        const votes = {};
        creer(date, { nomUtil, idUtil, texte : nvxCom, timestamp, votes });
        setNvxCom('');
      }
    } 

    else {
      toast.error('Veuillez vous connecter pour ajouter un commentaire.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        toastId: 'com01'
      });
    }

  }

  const changement = (event) => {
    setNvxCom(event.target.value);
  }

  function supprimerCommentaire(idd) {
    if (utilisateur) {
      supprimer(date, idd);
      setComs(coms.filter(com => com.id !== idd));
    }
  }

  return (
    <div className="ListeCommentaires">
      <form onSubmit={envoiFormulaire}>
        <input
          type="text"
          placeholder="Ajouter un commentaire"
          value={nvxCom}
          onChange={changement}
        />
      </form>
      <section>
        {
          coms.map( 
            com => <Commentaire key={com.id} {...com} supprimerCommentaire={supprimerCommentaire} date={date} />
          )
        }
      </section>
    </div>
  );
}
