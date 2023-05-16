import { useContext } from "react"
import UseContext from "../../useContext"
import React from 'react';
import validator from 'validator';
import { useForm } from 'react-hook-form';

export default function Inscription (props) {
    const {token, handleLogin} = useContext(UseContext);
    const {register, handleSubmit, formState: {errors}, setError} = useForm();

    const handleButtonConnexion = () => {
        props.setTypeConnexion("connexion")
    }

    const handleSoumission = (data) => { 
        const {courriel, nom, mdp, mdpConfirmation} = data;
        if (mdp != mdpConfirmation) { 
            setError("mdpConfirmation", { 
                type:"validate" 
            })
        }
    }

    return ( 
        <div>
            <form onSubmit={handleSubmit(handleSoumission)}>
                <h1>INSCRIPTION</h1>
                <div>
                    <label>courriel: </label>
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
                <button type="submit"onClick={handleSoumission}>S'inscrire</button>
            </form>
            <button onClick={handleButtonConnexion}>Se connecter</button>
        </div>
    )
}