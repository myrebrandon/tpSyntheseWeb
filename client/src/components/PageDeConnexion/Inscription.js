import { useContext } from "react";
import React from 'react';
import validator from 'validator';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import contexteAuthentification from "../../shared/User/User";
import jwtDecode from "jwt-decode";

export default function Inscription (props) {
    const {handleLogin} = useContext(contexteAuthentification);
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
                let token;
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

                await axios.post(process.env.REACT_APP_URL + "entrepreneurs/login",
                    {
                        "courriel": courriel,
                        "mdp": mdp
                    },
                    { headers: { "Content-Type": "application/json" }}
                    ).then(res => {
                        token = res.data.message;
                    })
                    console.log(token);
                const idUser = jwtDecode(token);
                handleLogin(idUser.id, token, "entrepreneur");

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
                    <label><input type="radio" name ="type" value="entrepreneur" checked={true} {...register("type",{required: true})}/>Entrepreneur</label>
                    <label><input type="radio" name ="type" value="etudiant" {...register("type",{required: true})}/>Etudiant</label>
                </div>
                <button type="submit">S'inscrire</button>
            </form>
            <button onClick={handleButtonConnexion}>Se connecter</button>
        </div>
    )
}