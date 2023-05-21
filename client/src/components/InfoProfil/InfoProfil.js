import React from 'react';
import { useContext, useEffect, useState } from "react";
import contexteAuthentification from '../../shared/User/User';
import { useNavigate } from 'react-router-dom';
import { useHttpClient } from "../../shared/hooks/http-hook";
import axios from 'axios';
import './InfoProfil.css';
import StageList from '../StageList/StageList';

function InfoProfil() {

    const navigate = useNavigate();

    const { userId, role, token,handleLogout } = useContext(contexteAuthentification);
    const [profil, setProfil] = useState();
    axios.defaults.headers.common["authorization"] = token;

    let [supprimeText, setSupprimeText] = useState("Supprimer Le Compte");


    useEffect(() => {
        axios.get('http://localhost:5000/api/' + role + 's/' + userId).then(res => {
            const data = res.data;

            if (role === "entrepreneur") {
                setProfil(data.entrepreneur);
            } else if (role === "etudiant") {
                setProfil(data.etudiant);
            } else if (role === "coordinateur") {
                setProfil(data.coordinateur);
            }
        }).catch(error => {

        });
    }, [token]);

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
                    <p>{profil.nomComplet}</p>
                    <p>{role}</p>
                    <p>{profil.courriel}</p>
                    {role === "entrepreneur" ?
                        <StageList entrepreneur={userId} />
                        : <p></p>
                    }
                    {role !== "coordinateur" ?
                        <div className='InfoProfil-Options'>
                            <button onClick={handleSupprimer}>{supprimeText}</button>
                        </div>
                        : <p></p>
                    }

                </div> :
                    <div>
                        <p>Vous n'exister pas</p>
                    </div>}
            </div>
        </div>
    );
}

export default InfoProfil;