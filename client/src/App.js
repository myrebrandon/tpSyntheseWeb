import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigationbar from './components/Navbar/Navigationbar.js'
import PageDeConnexion from './components/PageDeConnexion/PageDeConnexion';
import FAQ from './components/FAQ/FAQ';
import Accueil from './components/Accueil/Accueil';
import useContext from './useContext';
import StageInfo from './components/StageInfo/StageInfo';
import StageList from './components/StageList/StageList'
import ProfilEtCompetence from './components/ProfilEtCompetence/ProfilEtCompetence';
import StageAjout from './components/StageAjout/StageAjout';
import DeroulementStage from './components/DeroulementStage/DeroulementStage';
import PiedPage from './components/PiedPage/PiedPage';
import Inscription from './components/PageDeConnexion/Inscription';

function App() {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [type, setType] = useState("");

  const handleLogin = (id, token, type) => {
    localStorage.setItem("jwt", token)
    setToken(token);
    setUserId(id);
    setType(type);
  }

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setToken(null);
    setUserId(null);
    setType("guess");
  }

  return (
    <useContext.Provider
    value={{
      token,
      type,
      userId,
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
          <Route path="/Login"
            exact
            element={
              <PageDeConnexion />
            }
          />

          <Route path="/Register"
            exact
            element={
              <Inscription />
            }
          />

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

          <Route path="/temp/profil-et-competence"
            element={
              <ProfilEtCompetence/>
            }
          />

          <Route path="/temp/AjoutStage"
            element={
              <StageAjout/>
            }
          />

          <Route path="/Employeurs"
            element={
              <>

              </>
              // <FAQ />
            }
          />

          <Route path="/Stages"
            element={
              <StageList/>
            }
          />

          <Route path="/temp/StageEntrepreneur"
            element={
              <StageList entrepreneur="6462881124439bed25ad7ef9"/>
            }
          />

          <Route path="/temp/Deroulement" 
          element={
            <DeroulementStage/>
          }
          />


        </Routes>
        <PiedPage/>
      </Router>
    </div>
    </useContext.Provider>
  );
}

export default App;
// https://www.cmontmorency.qc.ca/wp-content/uploads/2023/04/Accueil-nouveau-site-web-1-992x365.png