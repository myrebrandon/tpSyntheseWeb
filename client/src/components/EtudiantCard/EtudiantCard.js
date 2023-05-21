import React, { useEffect, useState, useContext } from 'react';
import { useHttpClient } from "../../shared/hooks/http-hook";
import {Link} from 'react-router-dom';
import './EtudiantCard.css';

function EtudiantCard( { info } ){

    const stageId = info.stageAffecte;
    const [stage, setLoadedStage] = useState();
    const { error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const fetchStage = async () => {
            try {
                if(stageId){
                    const responseData = await sendRequest(
                        `http://localhost:5000/api/stages/stageId`
                    );
                    setLoadedStage(responseData.listeStages.filter(s => {
                        return s._id === stageId;
                    })[0]);
                }
            } catch (err) { }
        };
        fetchStage();
    }, [sendRequest]);



  return (
        <div className="stage-item__content">
          <h2>{info.nomComplet}</h2>
          <div className="stage-item__info">
            <h3>{info.type}</h3>
            <p>{info.courriel}</p>
            {stage ? 
            <div>
                <Link to={`/stage/${info._id}`}>{stage.titre}</Link>
            </div>
                 : <div></div>}
          </div>
        </div>
  );
};

export default EtudiantCard;
