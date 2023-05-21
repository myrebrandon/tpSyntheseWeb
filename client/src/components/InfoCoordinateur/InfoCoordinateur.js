import React from 'react';
import { useContext, useEffect, useState } from "react";
import contexteAuthentification from '../../shared/User/User';
import { useNavigate } from 'react-router-dom';
import { useHttpClient } from "../../shared/hooks/http-hook";
import axios from 'axios';
import './InfoCoordinateur.css';

function InfoCoordinateur() {

    const { userId,token } = useContext(contexteAuthentification);
    const [profils, setProfils] = useState();
    axios.defaults.headers.common["authorization"] = token;


    useEffect(() => {
        axios.get('http://localhost:5000/api/coordinateurs/').then(res => {
            const data = res.data;

            setProfils(data.listeCoordinateur);

        }).catch(error => {

        });
    }, [token]);

    return (
        <div className="InfoCoordinateur-Main">
            <div className='InfoCoordinateur-Liste'>
                <p className='InfoCoordinateur-Titre'>Coordinateurs</p>
                {profils ? 
                    profils.map(profil => (
                    <div className='InfoCoordinateur-Profil'>
                        <p>{profil.nomComplet}</p>
                        <p>{profil.courriel}</p>
                        <br/>
                    </div>
                    
                )) :
                    <div>
                        <p>Le Coordonateur n'existe pas</p>
                    </div>}
            </div>
        </div>
    );
}

export default InfoCoordinateur;