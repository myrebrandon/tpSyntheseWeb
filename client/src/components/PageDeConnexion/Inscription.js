import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';
import './Inscription.css'
import validator from 'validator';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import contexteAuthentification from "../../shared/User/User";
import jwtDecode from "jwt-decode";

export default function Inscription (props) {
    const navigate = useNavigate();
    const {handleLogin} = useContext(contexteAuthentification);
    const {register, handleSubmit, formState: {errors}, setError, getValues} = useForm();
    
    const [type, setType] = useState("entrepreneur");

    const handleButtonConnexion = () => {
        props.setTypeConnexion("connexion")
    }

    const handleRole = (event) => {
        setType(event.target.value);
    }

    const handleSoumission = async (data) => {
        const {courriel, nom, numDa, mdp, mdpConfirmation} = data;
        const type = getValues("type");
        const typeEtudiant = getValues("typeEtudiant");
        
        if (mdp !== mdpConfirmation) { 
            alert("Mot de passe different")
            setError("mdpConfirmation", {
                type:"validate" 
            })
        } else {
            props.setLoading(true);
            await new Promise(r => setTimeout(r, 1500));
            try {
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
                    const decodedToken = jwtDecode(token);
                    handleLogin(decodedToken.id, token, decodedToken.type);
                    console.log("Connexion compte");
                } else if(type === "etudiant") {
                    let token;
                    await axios.post(process.env.REACT_APP_URL + "etudiants/inscription",
                        { 
                            "numDa": numDa,
                            "nomComplet": nom,
                            "courriel": courriel,
                            "mdp": mdp,
                            "type": typeEtudiant
                        },
                        { headers: { "Content-Type": "application/json" }}
                        ).then(res => {
                        })
    
                    await axios.post(process.env.REACT_APP_URL + "etudiants/login",
                        {
                            "courriel": courriel,
                            "mdp": mdp
                        },
                        { headers: { "Content-Type": "application/json" }}
                        ).then(res => {
                            token = res.data.message;
                        })
                    const decodedToken = jwtDecode(token);
                    handleLogin(decodedToken.id, token, decodedToken.type);
                    console.log("Connexion compte");
                }
            } catch(err) {
                alert(err.response.data.message);
            }
            
            navigate("/Accueil");
            props.setLoading(false);
        }
    }

    return ( 
        <div >
            <form classNameName="connexion-form" onSubmit={handleSubmit(handleSoumission)} id="registerForm">
                <h1 className="connexion-h1">Creer un compte</h1>
                <div>
                    <input className="connexion-input" type="text" placeholder="Courriel" name="courriel" {...register("courriel",{required: true, validate:validator.isEmail})}/>
                    {errors.courriel && <span>Veuillez entrer un courriel valide.</span>}
                </div>
                <div>
                    <input className="connexion-input" type="text" name="nom" placeholder="Nom" {...register("nom",{required: true})}/>
                    {errors.nom && <span>Veuillez entrer votre nom svp.</span>}
                </div>
                {type === "etudiant" &&<div>
                    <input className="connexion-input" type="text" name="numDa" placeholder="numDa" {...register("numDa",{required: true})}/>
                    {errors.nom && <span>Veuillez entrer votre nom svp.</span>}
                </div>}
                <div>
                    <input className="connexion-input" type="password" name="mdp" placeholder="Mot de passe" {...register("mdp",{required: true})}/>
                    {errors.mdp && <span>Veuillez entrer un mot de passe valide.</span>}
                </div>
                <div>
                    <input className="connexion-input" type="password" name="mdpConfirmation" placeholder="Mot de passe" {...register("mdpConfirmation",{required: true})}/>
                    {errors.mdpConfirmation && <span>Le mot de passe ne correspond pas</span>}
                </div>
                {type === "etudiant" && <div>

                    <select className="connexion-form-input" name="typeEtudiant" id="typeEtudiant" placeholder="Choisissez une option" {...register("typeEtudiant",{required: true})}>
                        <option value="" disabled>Choisissez une option</option>
                        <option name ="typeEtudiant" value="Reseaux et securite">Reseaux et securite</option>
                        <option name ="typeEtudiant" value="Developpement d'application">Developpement d'application</option>
                    </select>
                </div>}
                    <select form="registerForm" className="connexion-form-input" name="type" id="type" placeholder="Choisissez une option" onClick={(handleRole)} {...register("type",{required: true})}>
                        <option value="" disabled>Choisissez une option</option>
                        <option name ="type" value="entrepreneur">Entrepreneur</option>
                        <option name ="type" value="etudiant">Etudiant</option>
                    </select>
                <div>
                    <button className="connexion-button PageConnexion-buttonInscrire" type="submit">S'inscrire</button>
                </div>
            </form>
            <button className="PageConnexion-buttonInscrire margin" onClick={handleButtonConnexion}>Se connecter</button>
        </div>
    )
}