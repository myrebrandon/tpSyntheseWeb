// import logo from './logo.svg';
import './App.css';
// import "bootstrap/dist/css/bootstrap.min.css";
// import Navbar from "./Navigation/Navbar.js";

// function App() {
//   return (
//     <div>
//       {/* <Navbar /> */}
//     </div>
//   );
// }

// export default App;
import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#Acceuil">
          <img
            src="https://i.imgur.com/a834LGK.png"
            width="50"
            className='imgLogoNavbar'
            // height="30"
            alt="Logo"
          />{' '}
        </Navbar.Brand>
        <div className='StageMomoTitle'>
          Stages Montmorency
          </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#Acceuil">Acceuil</Nav.Link>
            <Nav.Link href="#employeurs">Espace Employeurs</Nav.Link>
            <Nav.Link href="#employeurs">Espace Stagiaires</Nav.Link>
            <NavDropdown title="Autres" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">FAQ</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Coordonnateurs</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">College Montmorency</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Equipe de developpement</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <div className='divImgProfilNavbar'>
            <img
              src="https://i.imgur.com/gGYpde6.png"
              className="ImgProfilNavBar"
              alt="Profile"
            />
          </div>
          <NavDropdown title="S'identifier" className='loginTitle' id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Connexion</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">S'enregistrer</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default App;
