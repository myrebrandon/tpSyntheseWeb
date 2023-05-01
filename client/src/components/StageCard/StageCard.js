import React from 'react';
import './StageCard.css';

function PlaceItem( { info } ){

  return (
        <div className="stage-item__content">
        <h2>{info.titre}</h2>
          <div className="stage-item__info">
            <h3>{info.type}</h3>
            <p>{info.nomEntreprise}</p>
          </div>
        </div>
  );
};

export default PlaceItem;
