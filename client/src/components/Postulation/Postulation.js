import {React, useContext, useEffect} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import './Postulation.css'
import { useForm} from 'react-hook-form';
import axios from "axios";
import contexteAuthentification from '../../shared/User/User';

export default function Postulation(props) {
    const navigate = useNavigate();

    const { idStage } = useParams();

    const { token, userId } = useContext(contexteAuthentification);

    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        axios.defaults.headers.common["authorization"] = token;
    }, [token]);

    const handleSoumission = async (data) => {
        let email;
        await axios.get(process.env.REACT_APP_URL + "stages/" + idStage
            ).then((res) => {
                email = res.data.stage.courriel;
            });

        await axios.patch(process.env.REACT_APP_URL + "etudiants/" + userId + "/postuler",
            {
                "idStage": idStage,
                "to": email,
                "subject": "Appliquer au stage",
                "text": data.message
            },
            { headers: { "Content-Type": "application/json" }}
            ).then((res) => {
                console.log(res);
            })
            .catch((err) => {
                alert(err.response.data.message);
            });

            navigate("/Stages");
    }

    return (
        <div>
            <form class="connexion-form" onSubmit={handleSubmit(handleSoumission)} id="emailForm">
                <h1 class="connexion-h1">Postuler</h1>
                <div>
                    <textarea className="description" form="emailForm" name="message" {...register("message")}>

                    </textarea>
                </div>
                <button type="submit" class="connexion-button PageConnexion-buttonInscrire">Envoyer</button>
            </form>
        </div>
    )
}