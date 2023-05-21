import React, { useEffect, useState, useContext } from 'react';
import contexteAuthentification from '../../shared/User/User';
import { useHttpClient } from "../../shared/hooks/http-hook";
import {Link} from 'react-router-dom';
import './EtudiantCard.css';
import axios from 'axios';

function EtudiantCard( { info } ){
    const stageId = info.stageAffecte;
    const [stage, setLoadedStage] = useState();
    const { error, sendRequest, clearError } = useHttpClient();
    const { token, role } = useContext(contexteAuthentification);

    useEffect(() => {
        axios.defaults.headers.common["authorization"] = token;
        try {
            if(stageId){
                axios.get(process.env.REACT_APP_URL + "stages/" + stageId)
                    .then((res) => {
                        setLoadedStage(res.data.stage);
                    });
            }
        } catch (err) { }
    }, []);

    function supprimerEtudiant() {
        axios.delete(process.env.REACT_APP_URL + "etudiants/" + info._id)
            .then((res) => {
                console.log(res);
            });
        window.location.reload();
    }

  return (
        <div className="stage-item__content">
          <h2>{info.nomComplet}</h2>
          <div className="stage-item__info">
            <h3>{info.type}</h3>
            <p>{info.courriel}</p>
            {role === "coordinateur" || role === "entrepreneur" && <div>
                {stage ?
                    <div><Link to={`/profil/${info._id}`}>Ouvrir Profil</Link></div> :
                    <div></div>
                    }
                </div>

            }
            {role === "coordinateur" && <div>
                {stage ? 
                    <div><Link to={`/stage/${stage._id}`}>{stage.titre}</Link></div> :
                    <div><Link to={`/${info._id}/Affectation`}>Affecter</Link></div>}
                
                    <button onClick={supprimerEtudiant}>Supprimer</button>
                </div>}
            </div>
        </div>
  );
};

export default EtudiantCard;
