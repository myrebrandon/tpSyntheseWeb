import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigationbar from './components/Navbar/Navigationbar.js'
import PageDeConnexion from './components/PageDeConnexion/PageDeConnexion';

function App() {
  return (
    <div className="App">
      <Router>
        <Navigationbar />
        <Routes>

          <Route path="/action/3.1"
            element={
              <PageDeConnexion />
            }
          />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
// https://www.cmontmorency.qc.ca/wp-content/uploads/2023/04/Accueil-nouveau-site-web-1-992x365.png