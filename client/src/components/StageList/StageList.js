import './StageList.css';
import React, { useEffect, useState } from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";

import StageCard from '../StageCard/StageCard.js'

function StageList() {
    const [loadedStage, setLoadedStage] = useState();
    let [type, setType] = useState("Tout");
    const { error, sendRequest, clearError } = useHttpClient();

    const getType = (e) => {
        setType(e.target.value);
    }


    useEffect(() => {
        const fetchStages = async () => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:5000/api/stages/`
                );
                console.log(responseData);
                setLoadedStage(responseData.listeStages.filter(s => {
                    if (type == "Tout") {
                        return true;
                    }

                    return s.type === type;
                }));
            } catch (err) { }
        };
        fetchStages();
    }, [sendRequest, type]);

    if (!loadedStage || loadedStage.length === 0) {
        return (
            <div>
                <select id="type" onChange={getType}>

                    <option value="Tout">Tout</option>
                    <option value="Types.Reseaux">Reseaux</option>
                    <option value="Types.Developpement">Developpement</option>

                </select>
                <p>Aucun Stage</p>
            </div>
        );
    } else {
        return (

            <div>
                <select id="type" onChange={getType}>

                    <option value="Tout">Tout</option>
                    <option value="Types.Reseaux">Reseaux</option>
                    <option value="Types.Developpement">Developpement</option>

                </select>


                {loadedStage.map(stage => (
                    <div>
                        <StageCard key={stage.id} info={stage} />
                    </div>
                ))}
            </div>



        );

    }

}

export default StageList;