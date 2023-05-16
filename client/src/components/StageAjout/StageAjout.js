import './StageAjout.css';

function StageAjout() {


  return (
    <div className="StageAjout-Main">
        <form>
          <label className="StageAjout-Label" for="titre">Titre:</label>
          <input className="StageAjout-Input" type="text" id="titre" name="titre"></input>
          <br/>
          <label className="StageAjout-Label" for="prenom">Prenom Contact:</label>
          <input className="StageAjout-Input" type="text" id="prenom" name="prenom"></input>
          <br/>
          <label className="StageAjout-Label" for="nom">Nom Contact:</label>
          <input className="StageAjout-Input" type="text" id="nom" name="nom"></input>
          <br/>
          <label className="StageAjout-Label" for="courriel">Courriel:</label>
          <input className="StageAjout-Input" type="email" id="courriel" name="courriel"></input>
          <br/>
          <label className="StageAjout-Label" for="numeroCell">Telephone:</label>
          <input className="StageAjout-Input" type="tel" id="numeroCell" name="numeroCell"></input>
          <br/>
          <label className="StageAjout-Label" for="nomEntreprise">Nom Entreprise:</label>
          <input className="StageAjout-Input" type="text" id="nomEntreprise" name="nomEntreprise"></input>
          <br/>
          <label className="StageAjout-Label" for="adresseEntreprise">Adresse Entreprise:</label>
          <input className="StageAjout-Input" type="text" id="adresseEntreprise" name="adresseEntreprise"></input>
          <br/>
          <label>Type:</label>
          <select id="type">
                    <option value="Types.Reseaux">Reseaux</option>
                    <option value="Types.Developpement">Developpement</option>
          </select>
          <br/>
          <label className="StageAjout-Label" for="nomEntreprise">Nom Entreprise:</label>
          <input className="StageAjout-Input" type="text" id="nomEntreprise" name="nomEntreprise"></input>
          <br/>
          <label className="StageAjout-Label" for="nbPoste">Nombre de Poste:</label>
          <input className="StageAjout-Input" type="number" id="nbPoste" name="nbPoste"></input>
          <br/>
          <label className="StageAjout-Label" for="description">Description:</label>
          <input className="StageAjout-Input" type="text" id="description" name="description"></input>
        </form>
    </div>
  );
}

export default StageAjout;