import React from 'react';
import { useContext, useEffect, useState } from "react";
import contexteAuthentification from '../../shared/User/User';
import { useHttpClient } from "../../shared/hooks/http-hook";
import axios from 'axios';
import './InfoProfil.css';
import StageList from '../StageList/StageList';

function InfoProfil() {

    const { userId, role, token } = useContext(contexteAuthentification);
    const [profil, setProfil] = useState();
    axios.defaults.headers.common["authorization"] = token;


    useEffect(() => {
        axios.get('http://localhost:5000/api/' + role + 's/' + userId).then(res => {
            const data = res.data;

            console.log(data);

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

    return (
        <div className="InfoProfil-Main">
            <div className='InfoProfil-Nom'>
                {profil ? <div>
                    <p>{profil.nomComplet}</p>
                    <p>{role}</p>
                    <p>{profil.courriel}</p>
                    {role === "entrepreneur" ?
                       <StageList entrepreneur={userId}/>
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