import {React, useContext} from 'react';

import { useForm } from 'react-hook-form';
import axios from "axios";
import contexteAuthentification from '../../shared/User/User';
import jwtDecode from 'jwt-decode';

export default function Connexion(props) {
    const {handleLogin} = useContext(contexteAuthentification);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleButtonInscription = () => {
        props.setTypeConnexion("inscription")
    }

    const handleSoumission = async (data) => {

        let token;
        
        try{
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
        } catch(err) {
            alert("Mauvaise information de connexion");
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(handleSoumission)}>
                <h1>CONNEXION</h1>
                <div>
                    <label>Courriel : </label>
                    <input type="text" name="email" {...register("email", { required: true })} />
                    {errors.email && <span>Veuillez entrer une adresse email valide.</span>}
                </div>
                <div>
                    <label>Mot de passe: </label>
                    <input type="password" name="mdp" {...register("mdp", { required: true })} />
                    {errors.mdp && <span>Veuillez entrer un mot de passe.</span>}
                </div>
                <button type="submit">Se connecter</button>
            </form>
            <button onClick={handleButtonInscription}>S'inscrire</button>
        </div>
    )
}
