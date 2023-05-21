import {React, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import './Connexion.css'
import { useForm } from 'react-hook-form';
import axios from "axios";
import contexteAuthentification from '../../shared/User/User';
import jwtDecode from 'jwt-decode';

export default function Connexion(props) {
    const navigate = useNavigate();

    const {handleLogin} = useContext(contexteAuthentification);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleButtonInscription = () => {
        props.setTypeConnexion("inscription")
    }

    const handleSoumission = async (data) => {
        let token;
        
        try{
            props.setLoading(true)
            await new Promise(r => setTimeout(r, 1500));
            await axios.post(process.env.REACT_APP_URL + "login",
            {
                "courriel": data.email,
                "mdp": data.mdp
            },
            { headers: { "Content-Type": "application/json" }}
            ).then((res) => {
                token = res.data.message;
            });

            let decodedToken = jwtDecode(token);
            handleLogin(decodedToken.id, token, decodedToken.type);
            console.log("Connexion compte");

            navigate("/Accueil");
            
            props.setLoading(false)
        } catch(err) {
            alert("Mauvaise information de connexion");
            props.setLoading(false)
        }
    }

    return (
        <div>
            <form className="connexion-form" onSubmit={handleSubmit(handleSoumission)}>
                <h1 className="connexion-h1">Se connecter</h1>
                <div>
                    <input className="connexion-input" type="text" name="email" placeholder='Email' {...register("email", { required: true })} />
                    {errors.email && <span className="connexion-span">Veuillez entrer une adresse email valide.</span>}
                </div>
                <div>
                    <input className="connexion-input" type="password" name="mdp" placeholder='Password'{...register("mdp", { required: true })} />
                    {errors.mdp && <span className="connexion-span">Veuillez entrer un mot de passe.</span>}
                </div>
                <button type="submit" className="connexion-button PageConnexion-buttonInscrire">Se connecter</button>
            </form>
            <button className="PageConnexion-buttonInscrire margin"onClick={handleButtonInscription}>S'inscrire</button>
        </div>
    )
}
