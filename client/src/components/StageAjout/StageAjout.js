import React from 'react';
import './StageAjout.css';

function StageAjout() {
  return (
    <div className="spacing">
    <div className="StageAjout-Container">
      <div className="StageAjout-Title">
        <h2>Ajouter un stage</h2>
      </div>
      <form className="StageAjout-Form">
        <div className="StageAjout-FormRow">
          <label className="StageAjout-Label" htmlFor="titre">Titre :</label>
          <input className="StageAjout-Input" type="text" id="titre" name="titre" required/>
        </div>
        <div className="StageAjout-FormRow">
          <label className="StageAjout-Label" htmlFor="prenom">Prénom du contact :</label>
          <input className="StageAjout-Input" type="text" id="prenom" name="prenom" required/>
        </div> 
        <div className="StageAjout-FormRow">
          <label className="StageAjout-Label" htmlFor="nom">Nom du contact :</label>
          <input className="StageAjout-Input" type="text" id="nom" name="nom" required/>
        </div>
        <div className="StageAjout-FormRow">
          <label className="StageAjout-Label" htmlFor="courriel">Courriel :</label>
          <input className="StageAjout-Input" type="email" id="courriel" name="courriel" required/>
        </div>
        <div className="StageAjout-FormRow">
          <label className="StageAjout-Label" htmlFor="numeroCell">Téléphone :</label>
          <input width="2500" className="StageAjout-Input" type="tel" id="numeroCell" placeholder="438-505-4739" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"name="numeroCell" required/>
        </div>
        <div className="StageAjout-FormRow">
          <label className="StageAjout-Label" htmlFor="nomEntreprise">Nom de l'entreprise :</label>
          <input className="StageAjout-Input" type="text" id="nomEntreprise" name="nomEntreprise" required/>
        </div>
        <div className="StageAjout-FormRow">
          <label className="StageAjout-Label" htmlFor="adresseEntreprise">Adresse de l'entreprise :</label>
          <input className="StageAjout-Input" type="text" id="adresseEntreprise" name="adresseEntreprise" />
        </div>
        <div className="StageAjout-FormRow">
          <label className="StageAjout-Label" htmlFor="type">Type :</label>
          <select className="StageAjout-Select" id="type" name="type">
            <option value="Reseaux">Réseaux</option>
            <option value="Developpement">Développement</option>
          </select>
        </div>
        <div className="StageAjout-FormRow">
          <label className="StageAjout-Label" htmlFor="nbPoste">Nombre de postes :</label>
          <input className="StageAjout-Input" type="number" id="nbPoste" name="nbPoste" />
        </div>
        <div className="StageAjout-FormRow">
          <label className="StageAjout-Label" htmlFor="description">Description :</label>
          <textarea className="StageAjout-Textarea" id="description" name="description" rows="4"></textarea>
        </div>
        <div className="StageAjout-FormRow">
          <button className="StageAjout-SubmitButton" type="submit">Ajouter</button>
        </div>
      </form>
    </div>
    </div>
  );
}
export default StageAjout;
// import './StageAjout.css';

// function StageAjout() {


//   return (
//     <div className="StageAjout-Main">
//         <form>
//           <label className="StageAjout-Label" for="titre">Titre:</label>
//           <input className="StageAjout-Input" type="text" id="titre" name="titre"></input>
//           <br/>
//           <label className="StageAjout-Label" for="prenom">Prenom Contact:</label>
//           <input className="StageAjout-Input" type="text" id="prenom" name="prenom"></input>
//           <br/>
//           <label className="StageAjout-Label" for="nom">Nom Contact:</label>
//           <input className="StageAjout-Input" type="text" id="nom" name="nom"></input>
//           <br/>
//           <label className="StageAjout-Label" for="courriel">Courriel:</label>
//           <input className="StageAjout-Input" type="email" id="courriel" name="courriel"></input>
//           <br/>
//           <label className="StageAjout-Label" for="numeroCell">Telephone:</label>
//           <input className="StageAjout-Input" type="tel" id="numeroCell" name="numeroCell"></input>
//           <br/>
//           <label className="StageAjout-Label" for="nomEntreprise">Nom Entreprise:</label>
//           <input className="StageAjout-Input" type="text" id="nomEntreprise" name="nomEntreprise"></input>
//           <br/>
//           <label className="StageAjout-Label" for="adresseEntreprise">Adresse Entreprise:</label>
//           <input className="StageAjout-Input" type="text" id="adresseEntreprise" name="adresseEntreprise"></input>
//           <br/>
//           <label>Type:</label>
//           <select id="type">
//                     <option value="Types.Reseaux">Reseaux</option>
//                     <option value="Types.Developpement">Developpement</option>
//           </select>
//           <br/>
//           <label className="StageAjout-Label" for="nomEntreprise">Nom Entreprise:</label>
//           <input className="StageAjout-Input" type="text" id="nomEntreprise" name="nomEntreprise"></input>
//           <br/>
//           <label className="StageAjout-Label" for="nbPoste">Nombre de Poste:</label>
//           <input className="StageAjout-Input" type="number" id="nbPoste" name="nbPoste"></input>
//           <br/>
//           <label className="StageAjout-Label" for="description">Description:</label>
//           <input className="StageAjout-Input" type="text" id="description" name="description"></input>
//         </form>
//     </div>
//   );
// }

// export default StageAjout;