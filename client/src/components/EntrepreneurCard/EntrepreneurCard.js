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
        <div className="stage-item__content">
          <h2>{info.nomComplet}</h2>
          <div className="stage-item__info">
            <h3>{info.type}</h3>
            <p>{info.courriel}</p>
            {role === "coordinateur" && <div>
                    <button onClick={supprimerEntrepreneur}>Supprimer</button>
                </div>}
            </div>
        </div>
  );
};

export default EntrepreneurCard;
