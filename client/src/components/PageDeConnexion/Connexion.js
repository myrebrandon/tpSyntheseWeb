import React from 'react';

import { useForm } from 'react-hook-form';

export default function Connexion(props) {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleButtonInscription = () => {
        props.setTypeConnexion("inscription")
    }

    const handleSoumission = () => {

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
                <button type="submit" onClick={handleSoumission}>Se connecter</button>
            </form>
            <button onClick={handleButtonInscription}>S'inscrire</button>
        </div>
    )
}
