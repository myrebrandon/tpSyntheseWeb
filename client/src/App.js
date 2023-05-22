import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Navigationbar from './components/Navbar/Navigationbar.js'
import PageDeConnexion from './components/PageDeConnexion/PageDeConnexion';
import FAQ from './components/FAQ/FAQ';
import Accueil from './components/Accueil/Accueil';
import contexteAuthentification from './shared/User/User';
import StageInfo from './components/StageInfo/StageInfo';
import StageList from './components/StageList/StageList'
import ProfilEtCompetence from './components/ProfilEtCompetence/ProfilEtCompetence';
import StageAjout from './components/StageAjout/StageAjout';
import DeroulementStage from './components/DeroulementStage/DeroulementStage';
import Postulation from './components/Postulation/Postulation';
import PiedPage from './components/PiedPage/PiedPage';
import Inscription from './components/PageDeConnexion/Inscription';
import jwtDecode from "jwt-decode";
import axios from 'axios';
import InfoProfil from './components/InfoProfil/InfoProfil';
import EtudiantList from './components/EtudiantListe/EtudiantListe';
import EntrepreneurListe from './components/EntrepreneurListe/EntrepreneurListe';
import InfoCoordinateur from './components/InfoCoordinateur/InfoCoordinateur';

function App() {
  useEffect(() => {
    let token = localStorage.getItem("jwt");
    if(token != null && token !== "") {
      axios.defaults.headers.common["authorization"] = token;

      let decodedToken
      try {
        decodedToken = jwtDecode(token);
      } catch(err) {
        console.log(err + "Invalid token");
      }

      setToken(token);
      setUserId(decodedToken.id);
      setRole(decodedToken.type);
    } else {
      setToken(null);
      setUserId(null);
      setRole("guess");
    }
  });



  async function verifExisteEncore(id, type) {
    let existe;
    await axios.get(process.env.REACT_APP_URL + type + "s/" + id)
      .then((res) => {
        existe = true;
      })
      .catch((err) => {
        existe = false;
      });

      return existe;
  }

  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");

  const handleLogin = (id, token, type) => {
    localStorage.setItem("jwt", token);
    setToken(token);
    setUserId(id);
    setRole(type);
  }

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setToken(null);
    setUserId(null);
    setRole("guess");
  }

  return (
    <contexteAuthentification.Provider
    value={{
      token,
      userId,
      role,
      handleLogin,
      handleLogout
    }}>

    <div className="App">
      <Router>
        <Navigationbar />
        <Routes>
          <Route path="/Accueil"
            exact
            element={
              <Accueil />
            }
          />
          
          {role === "guess" && <Route path="/Login"
            exact
            element={
              <PageDeConnexion type={"connexion"}/>
            }
          />}

          {role === "guess" && <Route path="/Register"
            exact
            element={
              <PageDeConnexion type={"inscription"}/>
            }
          />}

          <Route path="/FAQ"
            element={
              <FAQ />
            }
          />
          <Route path="/stage/:stageid"
            element={
              <StageInfo />
            }
          />

          <Route path="/Profil-et-competence"
            element={
              <ProfilEtCompetence/>
            }
          />

          {role === "entrepreneur" && <Route path="/temp/AjoutStage"
            element={
              <StageAjout action="Ajouter"/>
            }
          />}

          {role === "entrepreneur" && <Route path="/temp/ModifierStage/:stageid"
            element={
              <StageAjout action="Modifier"/>
            }
          />}

          {role != "guess" && <Route path="/profil"
            element={
              <InfoProfil/>
            }
          />}

          {role != "guess" && <Route path="/profil/:userId"
            element={
              <InfoProfil/>
            }
          />}

          {role === "etudiant" && <Route path="/Stages/:idStage/Postulation"
            element={<Postulation />}
          />}

          {role !== "guess" && <Route path="/Stages"
            element={
              <StageList/>
            }
          />}

          {role === "entrepreneur" && <Route path="/temp/StageEntrepreneur"
            element={
              <StageList entrepreneur={userId}/>
            }
          />}

          {role === "entrepreneur" && <Route path="/Employeurs"
            element={
              <EtudiantList/>
            }
          />}

          {role === "coordinateur" && <Route path="/Coordinateurs"
            element={
              <div>
                <EtudiantList/>
                <EntrepreneurListe/>
              </div>
            }
          />}

          {role === "coordinateur" && <Route path="/:idEtudiant/Affectation"
            element={
              <StageList />
            }  
          />}

          {role === "coordinateur" && <Route path="/:idEtudiant/Affectation/:stageid"
            element={
              <StageInfo />
            }  
          />}

          <Route path="/Deroulement" 
          element={
            <DeroulementStage/>
          }
          />

          <Route path="/Coordonnateurs" 
          element={
            <InfoCoordinateur/>
          }
          />

        </Routes>
      </Router>
      <PiedPage/>
    </div>
    </contexteAuthentification.Provider>
  );
}

export default App;
