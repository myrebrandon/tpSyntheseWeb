import './StageList.css';
import React, { useEffect,useContext, useState } from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";

import StageCard from '../StageCard/StageCard.js'
import contexteAuthentification from '../../shared/User/User';
import { Link } from 'react-router-dom';

function StageList(props) {
    const [loadedStage, setLoadedStage] = useState();
    let [type, setType] = useState("Tout");
    const { error, sendRequest, clearError } = useHttpClient();
    const { userId, role, token } = useContext(contexteAuthentification);

    const getType = (e) => {
        setType(e.target.value);
    }

    const entrepreneur = props.entrepreneur;


    useEffect(() => {
        const fetchStages = async () => {
            try {

                const dblink = process.env.REACT_APP_URL + "stages/" //"http://localhost:5000/api/stages/";

                const responseData = await sendRequest(
                    dblink
                );
                console.log(responseData);
                let listeStages = responseData.listeStages.filter(s => {
                    if (type == "Tout") {
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
    }, [sendRequest, type]);

    if (!loadedStage || loadedStage.length === 0) {
        return (
            <div>
                <select id="type" onChange={getType}>

                    <option value="Tout">Tout</option>
                    <option value="Reseaux et securite">Reseaux</option>
                    <option value="Developpement d'application">Developpement</option>

                </select>
                <p>Aucun Stage</p>
            </div>
        );
    } else {
        return (

            <div>
                <p className='StageList-Titre'>Les Stages</p>

                <select id="type" onChange={getType}>

                    <option value="Tout">Tout</option>
                    <option value="Reseaux et securite">Reseaux</option>
                    <option value="Developpement d'application">Developpement</option>

                </select>


                {loadedStage.map(stage => (
                    <div>
                        <StageCard key={stage.id} info={stage} />
                    </div>
                ))}

                {role === "entrepreneur" ? 
                <div>
                    <Link to="/temp/AjoutStage">Ajouter un Stage</Link>
                </div> :
                <div>
                    
                </div>}

            </div>



        );

    }

}

export default StageList;