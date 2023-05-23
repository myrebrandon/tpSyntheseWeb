import React, { useEffect, useState, useContext } from 'react';
import './StageInfo.css';
import '../StageCard/StageCard.css';
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
                    process.env.REACT_APP_URL + `stages/`
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
                    
                    return st._id === stageid;
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
    const stageSrc = stage.type ==='Developpement d\'application'
        ? 'https://cdn-icons-png.flaticon.com/512/2809/2809263.png'
        : 'https://cdn-icons-png.flaticon.com/128/4379/4379213.png';
    
    const nbPoste = stage.nbPostes > 1 ? 'postes' : 'poste';

    return (
        <div className="stageCard-Main">
            <div className="job-card">
                <div className='company-logo-img centerimg'>
                    <img src={stageSrc} alt="Stage Type"/>
                </div>
                    <div className="job-title">{stage.titre}</div>
                    <div className="company-name">{stage.type}</div>
                    <div className="skills-container">
                    <div className="skill">{stage.nomEntreprise}</div>
                    <div className="skill">{stage.nbPostes} {nbPoste} à combler</div>
                    <div className="skill">{stage.etat}</div>
                    <div className="skill margintop">{stage.adresseEntreprise}</div>
                    </div>
                    <br></br>
                    <div className="skills-container margintop2"> 
                    <div className="skill">{stage.nomCompletContact}</div>
                    <div className="skill">{stage.courriel}</div>
                    <div className="skill">{stage.numeroCell}</div>
                    </div>
                    <br></br>
                    <div className="skills-container margintop2"> 
                    <div className="skill desc">{stage.description}</div>
                </div>
                {
                    role === "etudiant" ?
                        <div className="stage-bouton">
                            
                            <div className="stage-appliquer">
                                {dejaAppliquer ? <Link className='btn'>Déjà postulé</Link>:<Link className='btn' to={`/Stages/${stageid}/Postulation`}>Appliquer</Link>}
                            </div>
                        </div>
                        :
                        userId === stage.entrepreneurId ?
                        <div className='stage-bouton'>
                            <div className="stage-modifier">
                                <Link className='btn' to={`/temp/ModifierStage/${stageid}`}>Modifier</Link>
                            </div>
                            <div className="stage-supprimer">
                                <button className='btn' href="/Stages" onClick={SupprimerStage}>Supprimer</button>
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
                    <Link className='btn btn2' to="/stages">Retour</Link> :
                    <Link className='btn btn2' to={`/${idEtudiant}/Affectation`}>Retour</Link>}
                </div>
            </div>
        </div>
    );
};

export default StageInfo;
