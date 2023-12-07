import './ControleJour.scss';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';

export default function ControleJour({ date, setDate }) {

  function AllerJourPrecedent() {
    if (typeof date === 'string' && date.length >= 8) {
      const dateAcc = new Date(date.substring(0, 4), parseInt(date.substring(4, 6)) - 1, date.substring(6, 8));
      dateAcc.setDate(dateAcc.getDate() - 1);
  
      const datePrecedente = dateAcc.toISOString().slice(0, 10).replace(/-/g, '');
      setDate(datePrecedente);
    }
  };

  function AllerJourSuivant() {
    const dateAcc = new Date(date.substring(0, 4), parseInt(date.substring(4, 6)) - 1, date.substring(6, 8));
    dateAcc.setDate(dateAcc.getDate() + 1);

    const dateSuivante = dateAcc.toISOString().slice(0, 10).replace(/-/g, '');
    setDate(dateSuivante);
  };
  
  let premiereDate = date === "20230501";
  // let derniereDate = date === new Date().toISOString().slice(0, 10).replace(/-/g, "");
  let derniereDate = date === "20230614";

  function allerDerniereDate() {
    if (!derniereDate) {
      //const dateActuelle = new Date().toISOString().slice(0, 10).replace(/-/g, "");
      //setDate(dateActuelle);
      setDate("20230614");
    }
  }
  function allerPremiereDate() {
    if (!premiereDate) {
      setDate("20230501");
    }
  }
    

  return (
    <div className="ControleJour">

      { //Bouton premiere date 
        premiereDate 
          ? 
        (
          <button disabled><FirstPageIcon fontSize='5px'/></button>
        ) 
          : 
        (
          <button onClick={allerPremiereDate}><FirstPageIcon fontSize='5px'/></button>
        )
      }

      { //Bouton jour precedent
        premiereDate 
          ? 
        (
          <button disabled><NavigateBeforeIcon fontSize='5px'/></button>
        ) 
          : 
        (
          <button onClick={AllerJourPrecedent}><NavigateBeforeIcon fontSize='5px'/></button>
        )
      }

      { //Bouton jour suivant
        derniereDate 
          ? 
        (
          <button disabled><NavigateNextIcon fontSize='5px'/></button>
        ) 
          : 
        (
          <button onClick={AllerJourSuivant}><NavigateNextIcon fontSize='5px'/></button>
        )
      }

      { //Bouton derniere date
        derniereDate 
          ? 
        (
          <button disabled><LastPageIcon fontSize='5px'/></button>
        ) 
          : 
        (
          <button onClick={allerDerniereDate}><LastPageIcon fontSize='5px'/></button>
        )
      }      

    </div>
  );
}