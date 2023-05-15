import React from 'react';
import {Link} from 'react-router-dom';
import './StageCard.css';

function StageCard( { info } ){


  return (
        <div className="stage-item__content">
          <h2>{info.titre}</h2>
          <div className="stage-item__info">
            <h3>{info.type}</h3>
            <p>{info.nomEntreprise}</p>
            <Link to={`/stage/${info._id}`}>Info Stage</Link>
          </div>
        </div>
  );
};

export default StageCard;
