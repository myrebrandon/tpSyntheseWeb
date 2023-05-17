import React, { useEffect, useState } from 'react';
import './StageInfo.css';
import { Link, useParams } from 'react-router-dom';
import { useHttpClient } from "../../shared/hooks/http-hook";

function StageInfo() {

    let { stageid } = useParams()
    const [stage, setLoadedStage] = useState();
    const { error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const fetchStage = async () => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:5000/api/stages/`
                );
                setLoadedStage(responseData.listeStages.filter(s => {
                    return s._id === stageid;
                })[0]);
            } catch (err) { }
        };
        fetchStage();
    }, [sendRequest]);

    if (stage == null) {
        return (
            <div className="stage-notfound">
                <p>Le Stage n'existe pas</p>
            </div>
        );
    }

    return (
        <div className="page">
            <div className="stage-item__content">
                <div className="stage-titre">
                    <p>{stage.titre}</p>
                </div>
                <div className="stage-type">
                    <p>{stage.type}</p>
                </div>
                <div className="stage-nom-entreprise">
                    <p>{stage.nomEntreprise}</p>
                </div>
                <div className="stage-nbPoste">
                    <p>{stage.nbPoste}</p>
                </div>
                <div className="stage-nom">
                    <p>{stage.nomCompletContact}</p>
                </div>
                <div className="stage-courriel">
                    <p>{stage.courriel}</p>
                </div>
                <div className="stage-telephone">
                    <p>{stage.numeroCell}</p>
                </div>
                <div className="stage-adresse">
                    <p>{stage.adresseEntreprise}</p>
                </div>
                <div className="stage-description">
                    <p>{stage.description}</p>
                </div>
                <div className="stage-etat">
                    <p>{stage.etat}</p>
                </div>
                <div className="stage-bouton">
                    <div className="stage-appliquer">
                        <button>Appliquer</button>
                    </div>
                    <div className="stage-modifier">
                        <button>Modifier</button>
                    </div>
                    <div className="stage-supprimer">
                        <button>Supprimer</button>
                    </div>
                </div>
            </div>
            <div className="bouton-retour">
                    <Link to="/stages">Retour</Link>
                </div>
        </div>
    );
};

export default StageInfo;