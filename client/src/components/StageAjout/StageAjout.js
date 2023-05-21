import { useContext,useState,useEffect } from 'react';
import './StageAjout.css';
import contexteAuthentification from '../../shared/User/User';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useHttpClient } from "../../shared/hooks/http-hook";

function StageAjout({ action }) {

  const navigate = useNavigate();

  const { userId,token } = useContext(contexteAuthentification);
  const stageId = useParams();
  const [stage, setLoadedStage] = useState();
  const { error, sendRequest, clearError } = useHttpClient();
  axios.defaults.headers.common["authorization"] = token;

  useEffect(() => {
    const fetchStage = async () => {
        try {
            const responseData = await sendRequest(
                `http://localhost:5000/api/stages/`
            );
            setLoadedStage(responseData.listeStages.filter(s => {
                return s._id === stageId.stageid;
            })[0]);
        } catch (err) { }
    };
    fetchStage();
}, [sendRequest]);


  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    action === "Ajouter" ? AjouterStage(data) : ModifierStage(data);

  }

  const AjouterStage = async (data) => {

    try {
      const { titre, nomEntreprise, nom, courriel, numeroCell, adresseEntreprise, typeStage, nbPoste, description, renumeration } = data;

      await axios.post(process.env.REACT_APP_URL + "stages/" + userId,
        {
          "titre": titre,
          "entrepreneurId": userId,
          "nomCompletContact": nom,
          "courriel": courriel,
          "numeroCell": numeroCell,
          "nomEntreprise": nomEntreprise,
          "adresseEntreprise": adresseEntreprise,
          "type": typeStage,
          "nbPostes": Number(nbPoste),
          "description": description,
          "renumeration": renumeration,
          "etat": "Ouvert",
          "etudiantsPostuler": []
        },
        { headers: { "Content-Type": "application/json" } }
      ).then(res => {
      })
      console.log("Création du stage");
    } catch (Exception) {
      console.log(Exception);
    }

    navigate("/stages");
  }

  const ModifierStage = async (data) => {

    try {
      const { titre, nomEntreprise, nom, courriel, numeroCell, adresseEntreprise, typeStage, nbPoste, description, renumeration, etat } = data;

      await axios.patch(process.env.REACT_APP_URL + "stages/" + stageId.stageid,
        {
          "titre": titre,
          "nomCompletContact": nom,
          "courriel": courriel,
          "numeroCell": numeroCell,
          "nomEntreprise": nomEntreprise,
          "adresseEntreprise": adresseEntreprise,
          "type": typeStage,
          "nbPostes": Number(nbPoste),
          "description": description,
          "renumeration": renumeration,
          "etat": etat
        },
        { headers: { "Content-Type": "application/json" } }
      ).then(res => {
      })
      console.log("Modification du stage");
    } catch (Exception) {
      console.log(Exception);
    }

    navigate("/stage/" + stageId.stageid);
  }

  return (
    <div className="spacing">
      <div className="StageAjout-Container">
        <div className="StageAjout-Title">
          <h2>{action} un stage</h2>
        </div>
        <div className="formbold-form-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="formbold-mb-3">
              <label htmlFor="titre" className="formbold-form-label"> Titre: </label>
              <input
                type="text"
                name="titre"
                id="titre"
                defaultValue={stage ? stage.titre : ""}
                placeholder="Stage en Developpement Web FullStack"
                className="formbold-form-input"
                required
              />
            </div>

            <div className="formbold-mb-3">
              <label htmlFor="description" className="formbold-form-label"> Description </label>
              <input
                type="text"
                name="description"
                id="description"
                defaultValue={stage ? stage.description: ""}
                placeholder="Ce stage vous permet de ..."
                className="formbold-form-input"
                required
              />
            </div>

            <div className="formbold-input-flex">
              <div>
                <label htmlFor="nomEntreprise" className="formbold-form-label">Nom de l'Entreprise :</label>
                <input
                  type="text"
                  name="nomEntreprise"
                  id="nomEntreprise"
                  placeholder="TokiLab"
                  defaultValue={stage ? stage.nomEntreprise : ""}
                  className="formbold-form-input"
                  required
                />
              </div>
              <div>
                <label htmlFor="numeroCell" className="formbold-form-label">Telephone du recruteur :</label>
                <input
                  type="text"
                  name="numeroCell"
                  id="numeroCell"
                  defaultValue={stage ? stage.numeroCell : ""}
                  placeholder="Numero de Telephone "
                  className="formbold-form-input"
                  required
                />
              </div>
            </div>
            <div className="formbold-input-flex">
              <div>
                <label htmlFor="adresseEntreprise" className="formbold-form-label">Adresse de l'Entreprise :</label>
                <input
                  type="address"
                  name="adresseEntreprise"
                  id="adresseEntreprise"
                  defaultValue={stage ? stage.adresseEntreprise : ""}
                  placeholder="475 Bd de l'Avenir, Laval, QC"
                  className="formbold-form-input"
                  required
                />
              </div>
              <div>
                <label htmlFor="nom" className="formbold-form-label">Nom du recruteur :</label>
                <input
                  type="text"
                  name="nom"
                  id="nom"
                  defaultValue={stage ? stage.nomCompletContact : ""}
                  placeholder="Charles Leclerc "
                  className="formbold-form-input"
                  required
                />
              </div>
            </div>

            <div className="formbold-mb-3">
              <label htmlFor="courriel" className="formbold-form-label"> Courriel du recruteur </label>
              <input
                type="text"
                name="courriel"
                id="courriel"
                defaultValue={stage ? stage.courriel : ""}
                placeholder="stage@cmontmorency.qc.ca"
                className="formbold-form-input"
                required
              />
            </div>
            <div className="formbold-mb-3">
              <label className="formbold-form-label">Type de Stage :</label>

              <select className="formbold-form-input" name="typeStage" id="typeStage" placeholder="Choisissez une option" defaultValue={""} required>
                <option value="" disabled>
                  Choisissez une option
                </option>
                <option value="Reseaux et securite">Réseaux</option>
                <option value="Developpement d'application">Développement</option>
              </select>
            </div>
            {action === "Modifier" ?
              <div className="formbold-mb-3">
                <label className="formbold-form-label">Status :</label>

                <select className="formbold-form-input" name="etat" id="etat" placeholder="Choisissez une option" defaultValue={""} required>
                  <option value="" disabled>
                    Choisissez une option
                  </option>
                  <option value="Ouvert">Ouvert</option>
                  <option value="Fermé">Fermé</option>
                </select>
              </div> :
              <div></div>
            }

            <div className="formbold-input-flex">
              <div>
                <label htmlFor="text" className="formbold-form-label">Salaire proposé :</label>
                <input
                  type="text"
                  name="renumeration"
                  id="renumeration"
                  defaultValue={stage ? stage.renumeration : ""}
                  placeholder="27.50$/h"
                  className="formbold-form-input"
                  required
                />
              </div>
              <div>
                <label htmlFor="nbposte" className="formbold-form-label">Nombre de postes disponibles</label>
                <input
                  type="number"
                  name="nbPoste"
                  id="nbPoste"
                  defaultValue={stage ? stage.nbPostes : ""}
                  placeholder="Nombre de postes disponibles"
                  className="formbold-form-input formbold-mb-3"
                  required
                />
              </div>
            </div>

            <div className="formbold-checkbox-wrapper">
              <label htmlFor="supportCheckbox" className="formbold-checkbox-label">
                <div className="formbold-relative">
                  <input
                    type="checkbox"
                    id="supportCheckbox"
                    className="formbold-input-checkbox"
                    required
                  />
                  <div className="formbold-checkbox-inner">
                    <span className="formbold-opacity-0">
                      <svg
                        width="11"
                        height="8"
                        viewBox="0 0 11 8"
                        className="formbold-stroke-current"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.81868 0.688604L4.16688 5.4878L2.05598 3.29507C1.70417 2.92271 1.1569 2.96409 0.805082 3.29507C0.453266 3.66742 0.492357 4.24663 0.805082 4.61898L3.30689 7.18407C3.54143 7.43231 3.85416 7.55642 4.16688 7.55642C4.47961 7.55642 4.79233 7.43231 5.02688 7.18407L10.0696 2.05389C10.4214 1.68154 10.4214 1.10233 10.0696 0.729976C9.71776 0.357624 9.17049 0.357625 8.81868 0.688604Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                J'accepte les conditions d'utilisation
              </label>
            </div>
            <input className="formbold-btn" type="submit" value={action}></input>
          </form>
        </div>
      </div>
    </div>
  )
};

export default StageAjout;

/* // <div className="spacing">
// <div className="StageAjout-Container">
//   <div className="StageAjout-Title">
//     <h2>Ajouter un stage</h2>
//   </div>
//   <form className="StageAjout-Form">
   
//     <div className="StageAjout-FormRow">
//       <label className="StageAjout-Label" htmlFor="titre">Titre :</label>
//       <input className="StageAjout-Input" type="text" id="titre" name="titre" required/>
//     </div>
//     <div className="StageAjout-FormRow">
//       <label className="StageAjout-Label" htmlFor="prenom">Prénom du contact :</label>
//       <input className="StageAjout-Input" type="text" id="prenom" name="prenom" required/>
//     </div> 
//     <div className="StageAjout-FormRow">
//       <label className="StageAjout-Label" htmlFor="nom">Nom du contact :</label>
//       <input className="StageAjout-Input" type="text" id="nom" name="nom" required/>
//     </div>
//     <div className="StageAjout-FormRow">
//       <label className="StageAjout-Label" htmlFor="courriel">Courriel :</label>
//       <input className="StageAjout-Input" type="email" id="courriel" name="courriel" required/>
//     </div>
//     <div className="StageAjout-FormRow">
//       <label className="StageAjout-Label" htmlFor="numeroCell">Téléphone :</label>
//       <input width="250" className="StageAjout-Input" type="tel" id="numeroCell" placeholder="438-505-4739" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"name="numeroCell" required/>
//     </div>
//     <div className="StageAjout-FormRow">
//       <label className="StageAjout-Label" htmlFor="nomEntreprise">Nom de l'entreprise :</label>
//       <input className="StageAjout-Input" type="text" id="nomEntreprise" name="nomEntreprise" required/>
//     </div>
//     <div className="StageAjout-FormRow">
//       <label className="StageAjout-Label" htmlFor="adresseEntreprise">Adresse de l'entreprise :</label>
//       <input className="StageAjout-Input" type="text" id="adresseEntreprise" name="adresseEntreprise" />
//     </div>
//     <div className="StageAjout-FormRow">
//       <label className="StageAjout-Label" htmlFor="type">Type :</label>
//       <select className="StageAjout-Select" id="type" name="type">
//         <option value="Reseaux">Réseaux</option>
//         <option value="Developpement">Développement</option>
//       </select>
//     </div>
//     <div className="StageAjout-FormRow">
//       <label className="StageAjout-Label" htmlFor="nbPoste">Nombre de postes :</label>
//       <input className="StageAjout-Input" type="number" id="nbPoste" name="nbPoste" />
//     </div>
//     <div className="StageAjout-FormRow">
//       <label className="StageAjout-Label" htmlFor="description">Description :</label>
//       <textarea className="StageAjout-Textarea" id="description" name="description" rows="4"></textarea>
//     </div>
//     <div className="StageAjout-FormRow">
//       <button className="StageAjout-SubmitButton" type="submit">Ajouter</button>
//     </div>
//   </form>
// </div>
// </div>

// export default StageAjout; */
