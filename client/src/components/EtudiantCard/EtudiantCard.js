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
    <div>
        <div className="stage-item__content"></div>
            <figure class="snip0056">
                <figcaption>
                <h2><span>{info.nomComplet}</span></h2>
                <p>I suppose if we couldn't laugh at things that don't make sense, we couldn't react to a lot of life.</p>
                <div class="icons"><a href="#"><i class="ion-ios-home"></i></a><a href="#"><i class="ion-ios-email"></i></a><a href="#"><i class="ion-ios-telephone"></i></a></div>
                </figcaption><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sq-sample8.jpg" alt="sample8" />
                <div class="position">Web Designer</div>
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