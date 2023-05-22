import './StageList.css';
import '../StageAjout/StageAjout.css'
import React, { useEffect,useContext, useState } from "react";
import { useParams } from 'react-router-dom';
import './StageList.css'
import { useHttpClient } from "../../shared/hooks/http-hook";
import './StageList.css'
import StageCard from '../StageCard/StageCard.js'
import contexteAuthentification from '../../shared/User/User';
import { Link } from 'react-router-dom';

import axios from 'axios';

function StageList(props) {
    const {idEtudiant} = useParams();

    const [loadedStage, setLoadedStage] = useState();
    let [type, setType] = useState("Tout");
    const { error, sendRequest, clearError } = useHttpClient();
    const { userId, role, token } = useContext(contexteAuthentification);
    axios.defaults.headers.common["authorization"] = token;

    const getType = (e) => {
        if(role !== "etudiant" && !idEtudiant) {
            setType(e.target.value);
        } else if (!idEtudiant) {
            axios.get(process.env.REACT_APP_URL + "etudiants/" + userId)
                .then((res) => {
                    setType(res.data.etudiant.type);
                });
        } else {
            axios.get(process.env.REACT_APP_URL + "etudiants/" + idEtudiant)
                .then((res) => {
                    setType(res.data.etudiant.type);
                });
        }
    }

    const entrepreneur = props.entrepreneur;


    useEffect(() => {
        const fetchStages = async () => {
            try {

                const dblink = process.env.REACT_APP_URL + "stages/"

                const responseData = await sendRequest(
                    dblink
                );
                console.log(responseData);
                
                if(role === "etudiant" || idEtudiant) {
                    getType();
                }

                let listeStages = responseData.listeStages.filter(s => {
                    if (type === "Tout") {
                        return true;
                    }

                    return s.type === type;
                })
                

                //alert(entrepreneur);
                if(entrepreneur){
                    setLoadedStage(listeStages.filter(s => {
                        return s.entrepreneurId === entrepreneur;
                    }));
                }else{
                    setLoadedStage(listeStages);
                }
            } catch (err) { }
        };
        fetchStages();
    }, [sendRequest, type, role]);

    if (!loadedStage || loadedStage.length === 0) {
        return (
            <div>
                <p className='StageList-Titre'>Les Stages</p>

                {role !== "etudiant" && !idEtudiant && <select id="type" className='formbold-form-input' onChange={getType}>

                    <option className="formbold-form-label" value="Tout">Tout</option>
                    <option className="formbold-form-label" value="Reseaux et securite">Reseaux</option>
                    <option className="formbold-form-label" value="Developpement d'application">Developpement</option>

                </select>}
                <h3>Aucun Stage</h3>
                
                {role === "entrepreneur" ? 
                <div className='StageList-Main'>
                    <Link className="PageConnexion-buttonInscrire" to="/temp/AjoutStage">Ajouter un Stage</Link>
                </div> :
                <div>
                </div>}
            </div>
        );
    } else {
        return (
            <div>
                <p className='StageList-Titre'>Nos Stages disponibles</p>
                {role !== "etudiant" && !idEtudiant &&  <select id="type" className='stageList-form-input' onChange={getType}>
                    <option value="Tout">Tout</option>
                    <option value="Reseaux et securite">Reseaux</option>
                    <option value="Developpement d'application">Developpement</option>
                </select>}
                {loadedStage.map(stage => (
                    <div>
                        <StageCard key={stage.id} info={stage} idEtudiant={idEtudiant}/>
                    </div>
                ))}
                {role === "entrepreneur" ? 
                <div>
                    <Link className='PageConnexion-buttonInscrire' to="/temp/AjoutStage">Ajouter un Stage</Link>
                </div> :
                <div>
                </div>}
            </div>
        );
    }
}

export default StageList;