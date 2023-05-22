import './EtudiantListe.css';
import React, { useEffect, useState } from 'react';
import { useHttpClient } from "../../shared/hooks/http-hook";
import EtudiantCard from '../EtudiantCard/EtudiantCard';

function EtudiantList() {
    const [loadedEtudiant, setLoadedEtudiant] = useState();
    let [type, setType] = useState("Tout");
    const { error, sendRequest, clearError } = useHttpClient();
    const getType = (e) => {
        setType(e.target.value);
    }
    useEffect(() => {
        const fetchEtudiant = async () => {
            try {
                const responseData = await sendRequest(
                    process.env.REACT_APP_URL + "etudiants/" 
                );
                let listeEtudiant = responseData.listeEtudiants.filter(s => {
                    if (type == "Tout") {
                        return true;
                    }
                    return s.type === type;
                })
                setLoadedEtudiant(listeEtudiant);
            } catch (err) { }
        };
        fetchEtudiant();
    }, [sendRequest, type]);

    if (!loadedEtudiant || loadedEtudiant.length === 0) {
        return (
            <div>
                <select id="type" className='EtudiantList-form-input' onChange={getType}>
                    <option value="Tout">Tout</option>
                    <option value="Reseaux et securite">Reseaux</option>
                    <option value="Developpement d'application">Developpement</option>

                </select>
                <p>Aucun Étudiant</p>
            </div>
        );
    } else {
        return (

            <div>
                <p className='EtudiantListe-Titre'>Les Stagiaires</p>

                <select id="type" onChange={getType} className='EtudiantList-form-input'    >

                    <option value="Tout" >Tout</option>
                    <option value="Reseaux et securite">Reseaux</option>
                    <option value="Developpement d'application">Developpement</option>
                </select>
                {loadedEtudiant.map(et => (
                    <div>
                        <EtudiantCard key={et.id} info={et} />
                    </div>
                ))}
            </div>
        );

    }

}

export default EtudiantList;