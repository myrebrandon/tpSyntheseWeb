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
    <div className="InfoProfil-Main">
        <div className="stage-item__content EtudiantCard-Main centerCard" ></div>
            <figure class="snip0056">
                <figcaption>
                <h2><span>{info.nomComplet}</span></h2>
                <p className='EtudiantCard-p'>{info.numDa}</p>
                <p className='EtudiantCard-p'>{info.courriel}</p>
                {role === "coordinateur" && <div>
                {stage ? 
                    <div><Link to={`/stage/${stage._id}`}>{stage.titre}</Link></div> :
                    <div><Link to={`/${info._id}/Affectation`}>Affecter</Link></div>}
                
                    <button className="PageConnexion-buttonInscrire InfoProfil-btn-center" onClick={supprimerEtudiant}>Supprimer</button>
                </div>}
                </figcaption>
                <img src="https://www.shareicon.net/data/512x512/2016/07/03/790265_people_512x512.png" alt="sample8" />
                <div class="position">{info.type}</div>
            </figure>
        </div>
  );
};
export default EtudiantCard;
{/* </div>
        <div className="stage-item__content">
          <h2>{info.nomComplet}</h2>
          <div className="stage-item__info">
            <h3>{info.type}</h3>
            <p>{info.courriel}</p>
            {role === "coordinateur" && <div>
                {stage ? 
                    <div><Link to={`/stage/${stage._id}`}>{stage.titre}</Link></div> :
                    <div><Link to={`/${info._id}/Affectation`}>Affecter</Link></div>}
                    <button onClick={supprimerEtudiant}>Supprimer</button>
                </div>}
            </div>
        </div> */}