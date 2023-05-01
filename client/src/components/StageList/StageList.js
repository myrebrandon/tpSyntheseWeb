import './StageList.css';
import React, { useEffect, useState } from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";

import StageCard from '../StageCard/StageCard.js'

function StageList() {
    const [loadedStage, setLoadedStage] = useState();
    const { error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const fetchStages = async () => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:5000/api/stages/`
                );
                console.log(responseData);
                setLoadedStage(responseData.listeStages);
            } catch (err) { }
        };
        fetchStages();
    }, [sendRequest]);

    if (!loadedStage || loadedStage.length === 0) {
        return (
            <p>Aucun Stage</p>
        );
    } else {
        return (

            loadedStage.map(stage => (
                <div>
                    <StageCard key={stage.id} info={stage} />
                </div>
            ))

        );

    }

}

export default StageList;