import { useContext, useState } from "react";
import React from 'react';
import './Inscription.css'
import validator from 'validator';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import contexteAuthentification from "../../shared/User/User";
import jwtDecode from "jwt-decode";

export default function Inscription (props) {
    const {handleLogin} = useContext(contexteAuthentification);
    const {register, handleSubmit, formState: {errors}, setError} = useForm();
    const [type, setType] = useState("entrepreneur");

    const handleButtonConnexion = () => {
        props.setTypeConnexion("connexion")
    }

    const handleRole = (event) => {
        setType(event.target.value);
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
                console.log("Connexion compte");
                const decodedToken = jwtDecode(token);
                handleLogin(decodedToken.id, token, decodedToken.type);
            } else if(type === "etudiant") {
            }
        }
    }

    return ( 
        <div >
            <form onSubmit={handleSubmit(handleSoumission)}>
                <h1>Creer un compte</h1>
                <div>
                    <input type="text" placeholder="Courriel" name="courriel" {...register("courriel",{required: true, validate:validator.isEmail})}/>
                    {errors.courriel && <span>Veuillez entrer un courriel valide.</span>}
                </div>
                <div>
                    <input type="text" name="nom" placeholder="Nom" {...register("nom",{required: true})}/>
                    {errors.nom && <span>Veuillez entrer votre nom svp.</span>}
                </div>
                {type === "etudiant" &&<div>
                    <input type="text" name="numDa" placeholder="numDa" {...register("numDa",{required: true})}/>
                    {errors.nom && <span>Veuillez entrer votre nom svp.</span>}
                </div>}
                <div>
                    <input type="password" name="mdp" placeholder="Mot de passe" {...register("mdp",{required: true, validate:validator.isLength("8")})}/>
                    {errors.mdp && <span>Veuillez entrer un mot de passe valide.</span>}
                </div>
                <div>
                    <input type="password" name="mdpConfirmation" placeholder="Mot de passe" {...register("mdpConfirmation",{required: true})}/>
                    {errors.mdpConfirmation && <span>Le mot de passe ne correspond pas</span>}
                </div>
                {type === "etudiant" && <div>
                    <label><input type="radio" name ="typeEtudiant" value="Developpement d'application" checked={true} {...register("typeEtudiant",{required: true})}/>Développement</label>
                    <label><input type="radio" name ="typeEtudiant" value="Reseaux et securite" {...register("typeEtudiant",{required: true})}/>Réseaux</label>
                </div>}
                <div>
                    <label><input type="radio" name ="type" value="entrepreneur" onClick={handleRole}  {...register("type",{required: true})}/>Entrepreneur</label>
                    <label><input type="radio" name ="type" value="etudiant" onClick={handleRole} {...register("type",{required: true})}/>Etudiant</label>
                </div>
                <button type="submit">S'inscrire</button>
            </form>
            <button onClick={handleButtonConnexion}>Se connecter</button>
        </div>
    )
}