import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigationbar from './components/Navbar/Navigationbar.js'
import PageDeConnexion from './components/PageDeConnexion/PageDeConnexion';
import FAQ from './components/FAQ/FAQ';
import Accueil from './components/Accueil/Accueil';
import useContext from './useContext';
import StageInfo from './components/StageInfo/StageInfo';
import ProfilEtCompetence from './components/ProfilEtCompetence/ProfilEtCompetence';
import StageAjout from './components/StageAjout/StageAjout';

function App() {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [type, setType] = useState("");

  const handleLogin = () => {
    
  }

  const handleLogout = () => {
    
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
          <Route path="/action/3.1"
            exact
            element={
              <PageDeConnexion />
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

          <Route path="/Stagiaires"
            element={
              <>

              </>
            }
          />
        </Routes>
      </Router>
    </div>
    </useContext.Provider>
  );
}

export default App;
// https://www.cmontmorency.qc.ca/wp-content/uploads/2023/04/Accueil-nouveau-site-web-1-992x365.png