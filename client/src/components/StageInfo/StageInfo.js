import React, { useEffect, useState, useContext } from 'react';
import './StageInfo.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useHttpClient } from "../../shared/hooks/http-hook";
import contexteAuthentification from '../../shared/User/User';
import axios from 'axios';

function StageInfo() {

    const navigate = useNavigate();

    let { idEtudiant, stageid } = useParams();
    const [stage, setLoadedStage] = useState();
    const [dejaAppliquer, setDejaAppliquer] = useState(false);
    const { error, sendRequest, clearError } = useHttpClient();

    const { userId, role, token } = useContext(contexteAuthentification);
    axios.defaults.headers.common["authorization"] = token;

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

        if(role === "etudiant") {
            axios.get(process.env.REACT_APP_URL + role + "s/" + userId)
            .then((res) => {
                let stages = res.data.etudiant.stages;

                let test = stages.find((st) => {
                    return st === stageid;
                });

                if(test) {
                    setDejaAppliquer(true);
                } else {
                    setDejaAppliquer(false);
                }
            });
        }
    }, [sendRequest, token, role]);

    if (stage == null) {
        return (
            <div className="stage-notfound">
                <p>Le Stage n'existe pas</p>
            </div>
        );
    }

    function SupprimerStage() {
            axios.delete(process.env.REACT_APP_URL + 'stages/' + stageid).catch(error => {});
            navigate('/Stages');
    }

    async function Affecter() {
        await axios.patch(process.env.REACT_APP_URL + 'etudiants/' + idEtudiant + "/affecte",
        {
            "idStage": stageid
        },
        { headers: { "Content-Type": "application/json" }})
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            alert(err.response.data.message);
        });

        navigate('/Coordinateurs');
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
                    <p>Nombre de postes: {stage.nbPostes}</p>
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


                {
                    role === "etudiant" ?
                        <div className="stage-bouton">
                            
                            <div className="stage-appliquer">
                                {dejaAppliquer ? <Link>Déjà postulé</Link>:<Link to={`/Stages/${stageid}/Postulation`}>Appliquer</Link>}
                            </div>
                        </div>
                        :
                        userId === stage.entrepreneurId ?
                        <div className='stage-bouton'>
                            <div className="stage-modifier">
                                <Link to={`/temp/ModifierStage/${stageid}`}>Modifier</Link>
                            </div>
                            <div className="stage-supprimer">
                                <button href="/Stages" onClick={SupprimerStage}>Supprimer</button>
                            </div>
                        </div>
                        :
                        <div className='stage-bouton'></div>
                }

                {
                    role === "coordinateur" && idEtudiant && <button onClick={Affecter}>Affecter ici</button>
                }


                <div className="bouton-retour">
                    {!idEtudiant ?
                    <Link to="/stages">Retour</Link> :
                    <Link to={`/${idEtudiant}/Affectation`}>Retour</Link>}
                </div>
            </div>
        </div>
    );
};

export default StageInfo;
