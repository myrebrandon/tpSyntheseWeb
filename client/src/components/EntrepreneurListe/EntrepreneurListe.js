import './EntrepreneurListe.css';
import React, { useEffect, useState } from 'react';
import { useHttpClient } from "../../shared/hooks/http-hook";
import EntrepreneurCard from '../EntrepreneurCard/EntrepreneurCard';

function EntrepreneurListe() {

    const [loadedEntrepreneur, setLoadedEntrepreneur] = useState();
    const { error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const fetchEtudiant = async () => {
            try {
                const responseData = await sendRequest(
                    process.env.REACT_APP_URL + "entrepreneurs/" 
                );
                let listeEntrepreneur = responseData.listeEntrepreneur;

                setLoadedEntrepreneur(listeEntrepreneur);
            } catch (err) { }
        };
        fetchEtudiant();
    }, [sendRequest]);

    if (!loadedEntrepreneur || loadedEntrepreneur.length === 0) {
        return (
            <div>
                <p>Aucun Entrepreneur</p>
            </div>
        );
    } else {
        return (

            <div>
                <p className='EtudiantListe-Titre'>Les Entrepreneurs</p>


                {loadedEntrepreneur.map(ent => (
                    <div>
                        <EntrepreneurCard key={ent.id} info={ent} />
                    </div>
                ))}
            </div>
        );

    }

}

export default EntrepreneurListe;