import React from 'react';
import { useContext, useEffect, useState } from "react";
import contexteAuthentification from '../../shared/User/User';
import { useNavigate, useParams } from 'react-router-dom';
import { useHttpClient } from "../../shared/hooks/http-hook";
import axios from 'axios';
import './InfoProfil.css';
import '../StageList/StageList.css'
import '../PageDeConnexion/PageDeConnexion.css'
import StageList from '../StageList/StageList';

function InfoProfil() {

    const navigate = useNavigate();

    const { userId, role, token,handleLogout } = useContext(contexteAuthentification);
    const [profil, setProfil] = useState();

    let [supprimeText, setSupprimeText] = useState("Supprimer Le Compte");

    const profileId = useParams();

    useEffect(() => {
        axios.defaults.headers.common["authorization"] = token;
        
        axios.get(process.env.REACT_APP_URL + role + 's/' + userId).then(res => {
            
            const data = res.data;
            if(role === "etudiant") {
                setProfil(data.etudiant);
            } else if (role === "entrepreneur") {
                setProfil(data.entrepreneur);
            } else if (role === "coordinateur") {
                setProfil(data.coordinateur);
            }
                
        }).catch(error => {
        });
    }, [token, role]);

    function handleSupprimer() {
        if (supprimeText === "Supprimer Le Compte") {
            setSupprimeText("Confirmer la suppresion");
        } else {
            SupprimerCompte();
        }
    }

    function SupprimerCompte() {
        axios.delete(process.env.REACT_APP_URL + role + 's/' + userId).catch(error => { });

        handleLogout();

        navigate('/accueil');
    }

    return (
        <div className="InfoProfil-Main">
            <div className='InfoProfil-Nom'>
                {profil ? <div>
                    <div class="our-team">
                        <div class="picture">
                            <img src="https://i.imgur.com/lvO0xdv.png"alt="Photo de Profil" />
                        </div>
                        <div class="team-content">
                        <h3 class="name">{profil.nomComplet}</h3>
                        <h3 class="title">{role}</h3>
                        <h4 class="title">{profil.courriel}</h4>
                        </div>
                        <ul class="social">
                            <li><a href="https://codepen.io/collection/XdWJOQ/" class="fa fa-facebook" aria-hidden="true"></a></li>
                            <li><a href="https://codepen.io/collection/XdWJOQ/" class="fa fa-twitter" aria-hidden="true"></a></li>
                            <li><a href="https://codepen.io/collection/XdWJOQ/" class="fa fa-google-plus" aria-hidden="true"></a></li>
                            <li><a href="https://codepen.io/collection/XdWJOQ/" class="fa fa-linkedin" aria-hidden="true"></a></li>
                        </ul>
                    </div>
                    {role === "entrepreneur" &&
                        <StageList entrepreneur={userId} />
                    }
                    {role !== "coordinateur" && 
                        <div className='StageList-Main'>
                            <button className='PageConnexion-buttonInscrire InfoProfil-btn-center myDeleteBtn' onClick={handleSupprimer}>{supprimeText}</button>
                        </div>
                    }
                </div> :
                    <div>
                        <p>L'utilisateur n'existe pas</p>
                    </div>}
            </div>
        </div>
    );
}

export default InfoProfil;