import { useContext } from "react"
import UseContext from "../../useContext"
import React from 'react';
import validator from 'validator';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function Inscription (props) {
    const {token, handleLogin} = useContext(UseContext);
    const {register, handleSubmit, formState: {errors}, setError} = useForm();

    const handleButtonConnexion = () => {
        props.setTypeConnexion("connexion")
    }

    const handleSoumission = async (data) => {
        const {courriel, nom, mdp, mdpConfirmation, type} = data;
        if (mdp !== mdpConfirmation) { 
            alert("Mot de passe different")
            setError("mdpConfirmation", {
                type:"validate" 
            })
        } else {
            if(type === "entrepreneur") {
                await axios.post(process.env.REACT_APP_URL + "entrepreneurs/inscription",
                    { 
                        "nomComplet": nom,
                        "courriel": courriel,
                        "mdp": mdp 
                    },
                    { headers: { "Content-Type": "application/json" }}
                    ).then(res => {
                        console.log(res);
                        console.log(res.data);
                    })

            } else if(type === "etudiant") {
                axios.post(process.env.REACT_APP_URL + "etudiants/inscription")
            }
        }
    }

    return ( 
        <div>
            <form onSubmit={handleSubmit(handleSoumission)}>
                <h1>INSCRIPTION</h1>
                <div>
                    <label>Courriel: </label>
                    <input type="text" name="courriel" {...register("courriel",{required: true, validate:validator.isEmail})}/>
                    {errors.courriel && <span>Veuillez entrer un courriel valide.</span>}
                </div>
                <div>
                    <label>Nom : </label>
                    <input type="text" name="nom" {...register("nom",{required: true})}/>
                    {errors.nom && <span>Veuillez entrer un svp.</span>}
                </div>
                <div>
                    <label>Mot de passe: </label>
                    <input type="password" name="mdp" {...register("mdp",{required: true, validate:validator.isLength("8")})}/>
                    {errors.mdp && <span>Veuillez entrer un mot de passe valide.</span>}
                </div>
                <div>
                    <label>Mot de passe confirmation: </label>
                    <input type="password" name="mdpConfirmation" {...register("mdpConfirmation",{required: true})}/>
                    {errors.mdpConfirmation && <span>Le mot de passe ne correspond pas</span>}
                </div>
                <div>
                    <label>Type de compte: </label>
                    <label><input type="radio" name ="type" value="entrepreneur" {...register("type",{required: true})}/>Entrepreneur</label>
                    <label><input type="radio" name ="type" value="etudiant" {...register("type",{required: true})}/>Etudiant</label>
                </div>
                <button type="submit">S'inscrire</button>
            </form>
            <button onClick={handleButtonConnexion}>Se connecter</button>
        </div>
    )
}