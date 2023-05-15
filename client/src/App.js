import './App.css';
import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigationbar from './components/Navbar/Navigationbar.js'
import StageList from './components/StageList/StageList.js'
import StageInfo from './components/StageInfo/StageInfo';
import ProfilEtCompetence from './components/ProfilEtCompetence/ProfilEtCompetence';

function App() {

  return (
    <div className="App">

      <Router>
        <Navigationbar />
        <Routes>

          <Route path="/stage"
            element={
              <StageList />
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

        </Routes>
      </Router>

    </div>
  );
}

export default App;
// https://www.cmontmorency.qc.ca/wp-content/uploads/2023/04/Accueil-nouveau-site-web-1-992x365.png