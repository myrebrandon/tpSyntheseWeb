import {React, useContext} from 'react';
import { useParams } from "react-router-dom";
import './Postulation.css'
import { useForm} from 'react-hook-form';
import axios from "axios";
import contexteAuthentification from '../../shared/User/User';

export default function Postulation(props) {
    const idStage = useParams();

    const { token, userId } = useContext(contexteAuthentification);

    const { register, handleSubmit, formState: { errors } } = useForm();
    axios.defaults.headers.common["authorization"] = token;

    const handleSoumission = async (data) => {
        await axios.patch(process.env.REACT_APP_URL + {userId});
    }

    return (
        <div>
            <form class="connexion-form" onSubmit={handleSubmit(handleSoumission)} id="emailForm">
                <h1 class="connexion-h1">Postuler</h1>
                <div>
                    <textarea form="emailForm" name="message" {...register("message", { required: true })}>

                    </textarea>
                </div>
                <button type="submit" class="connexion-button PageConnexion-buttonInscrire">Envoyer</button>
            </form>
        </div>
    )
}