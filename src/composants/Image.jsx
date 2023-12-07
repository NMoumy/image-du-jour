import './Image.scss';
import { useEffect, useState} from 'react';
import { obtenir } from '../code/image-modele';
import { formaterDate } from '../code/date';
import ControleJour from './ControleJour';
import Aime from './Aime';

export default function Image({date, setDate}) {
  const [img, setImg] = useState();
  useEffect(
    ()=> {
      async function obtenirImage() {
        let imgFS = await obtenir(date);
        setImg(imgFS);
      }
      obtenirImage();
    }, 
  [date]);

  if (!img) {
    return <div>Chargement en cours...</div>;
  }

  return (
    <div className="Image">
      <img src={img.url} alt={img.description} />
      <ControleJour 
        setDate = {setDate}
        date = {date}
      />
      <div className='information'>
        <div className='date'>{formaterDate(img.id)}</div>
        <div className='desc'>{img.description}</div>
      </div>
      <Aime
        aime={img.aime}
        date = {date}
      />
    </div>
  );
}

<div className='date'></div>
