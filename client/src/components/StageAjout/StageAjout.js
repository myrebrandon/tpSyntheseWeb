import './StageAjout.css';

function StageAjout() {


  return (
    <div className="spacing">
    <div className="StageAjout-Container">
    <div className="StageAjout-Title">
      <h2>Ajouter un stage</h2>
    </div>
  <div class="formbold-form-wrapper">
    <form action="https://formbold.com/s/FORM_ID" method="POST">
      <div class="formbold-mb-3">
        <label for="Titre" class="formbold-form-label"> Titre: </label>
        <input
          type="text"
          name="titre"
          id="titre"
          placeholder="Stage en Developpement Web FullStack"
          class="formbold-form-input"
          required
        />
      </div>

      <div class="formbold-input-flex">
        <div>
          <label for="nomEntreprise" class="formbold-form-label">Nom de l'Entreprise :</label>
          <input
            type="text"
            name="nomEntreprise"
            id="nomEntreprise"
            placeholder="TokiLab"
            class="formbold-form-input"
            required
          />
        </div>
        <div>
          <label for="city" class="formbold-form-label">Telephone du recruteur :</label>
          <input
            type="text"
            name="tel"
            id="tel"
            placeholder="Numero de Telephone "
            class="formbold-form-input"
            required
          />
        </div>
      </div>
      <div class="formbold-input-flex">
        <div>
          <label for="adresseEntreprise" class="formbold-form-label">Adresse de l'Entreprise :</label>
          <input
            type="address"
            name="adresseEntreprise"
            id="adresseEntreprise"
            placeholder="475 Bd de l'Avenir, Laval, QC"
            class="formbold-form-input"
            required
          />
        </div>
        <div>
          <label for="nom" class="formbold-form-label">Nom du recruteur :</label>
          <input
            type="text"
            name="nom"
            id="nom"
            placeholder="Charles Leclerc "
            class="formbold-form-input"
            required
          />
        </div>
      </div>

      <div class="formbold-mb-3">
        <label for="courriel" class="formbold-form-label"> Courriel du recruteur </label>
        <input
          type="text"
          name="courriel"
          id="courriel"
          placeholder="stage@cmontmorency.qc.ca"
          class="formbold-form-input"
          required
        />
      </div>
      <div class="formbold-mb-3">
        <label class="formbold-form-label">Type de Stage :</label>

        <select class="formbold-form-input" name="occupation" id="occupation" placeholder="Choisissez une option" required>
        <option value="" disabled selected>
                      Choisissez une option
                    </option>
          <option value="Reseaux">Réseaux</option>
          <option value="Developpement">Développement</option>
        </select>
      </div>
      <div class="formbold-input-flex">
        <div>
          <label for="adresseEntreprise" class="formbold-form-label">Salaire proposé :</label>
          <input
            type="address"
            name="adresseEntreprise"
            id="adresseEntreprise"
            placeholder="27.50$/h"
            class="formbold-form-input"
            required
          />
        </div>
        <div>
        <label for="nbposte" class="formbold-form-label">Nombre de postes disponibles</label>
        <input
          type="text"
          name="nbPoste"
          id="nbPoste"
          placeholder="Nombre de postes disponibles"
          class="formbold-form-input formbold-mb-3"
          required
        />
        </div>
      </div>

      <div class="formbold-checkbox-wrapper">
        <label for="supportCheckbox" class="formbold-checkbox-label">
          <div class="formbold-relative">
            <input
              type="checkbox"
              id="supportCheckbox"
              class="formbold-input-checkbox"
              required
            />
            <div class="formbold-checkbox-inner">
              <span class="formbold-opacity-0">
                <svg
                  width="11"
                  height="8"
                  viewBox="0 0 11 8"
                  class="formbold-stroke-current"
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
      <button class="formbold-btn">Ajouter</button>
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
