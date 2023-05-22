import React, { useEffect, useState, useContext } from 'react';
import contexteAuthentification from '../../shared/User/User';
import { useHttpClient } from "../../shared/hooks/http-hook";
import {Link} from 'react-router-dom';
import './EntrepreneurCard.css';
import axios from 'axios';

function EntrepreneurCard( { info } ) {
    const { token, role } = useContext(contexteAuthentification);

    useEffect(() => {
        axios.defaults.headers.common["authorization"] = token;
    }, []);

    function supprimerEntrepreneur() {
        axios.delete(process.env.REACT_APP_URL + "entrepreneurs/" + info._id)
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
                <p className='EtudiantCard-p'>{info.type}</p>
                <p className='EtudiantCard-p'>{info.courriel}</p>
                </figcaption>
                <img src="https://cdn3.iconfinder.com/data/icons/dashboard-ui-vol-3-flat/48/Dashboard_-_Vol._3-02-512.png" alt="sample8" />
                <div class="position">{info.type}</div>
            </figure>
            {role === "coordinateur" && <div>
                     <button className="PageConnexion-buttonInscrire InfoProfil-btn-center" onClick={supprimerEntrepreneur}>Supprimer</button>
                 </div>}
        </div>
  );
};

export default EntrepreneurCard;
