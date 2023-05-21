import React from 'react';
import {Link} from 'react-router-dom';
import './StageCard.css';

function StageCard( { info, idEtudiant } ){


  return (
        <div className="stage-item__content">
          <h2>{info.titre}</h2>
          <div className="stage-item__info">
            <h3>{info.type}</h3>
            <p>{info.nomEntreprise}</p>
            {!idEtudiant ? <Link to={`/stage/${info._id}`}>Info Stage</Link> :
             <Link to={`/${idEtudiant}/Affectation/${info._id}`}>Info Stage</Link>}
          </div>
        </div>
        


  );
};

export default StageCard;
