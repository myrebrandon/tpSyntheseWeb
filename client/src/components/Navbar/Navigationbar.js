import './Navigationbar.css';
import React, { useState, useContext, useEffect } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import contexteAuthentification from '../../shared/User/User';

function Navigationbar() {
  const {token, userId, role, handleLogout} = useContext(contexteAuthentification);

  const [isActive, setIsActive] = useState(false);

  const [isConnected, setIsConnected] = useState(false);

  const handleToggle = (isOpen) => {
    setIsActive(isOpen);
  };

  useEffect(() => {
    setIsConnected(token === null);
  }, [token]);

  return (
    <div className="Navigationbar">
      <Navbar bg="light" expand="lg" onToggle={handleToggle}>
        <Navbar.Brand href="/Accueil">
          <img
            src="https://i.imgur.com/a834LGK.png"
            width="50"
            className='imgLogoNavbar'
            alt="Logo"
          />{' '}
        </Navbar.Brand>
        <div className='StageMomoTitle title-with-border'>
          Stages Montmorency
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className={`navElements ${window.location.pathname === '/Accueil' ? 'active' : ''}`} href="/Accueil">Accueil</Nav.Link>
            {role === "employeur" && <Nav.Link className="navElements" href="/Employeurs">Espace Employeurs</Nav.Link>}
            {role === "coordinateur" && <Nav.Link className="navElements" href="/Coordinateurs">Espace Coordinateurs</Nav.Link>}
            <Nav.Link className="navElements" href="/Stages">Stages</Nav.Link>
            <Nav.Link className="navElements" href="/Deroulement">Déroulement</Nav.Link>
            <NavDropdown className="navElements" title="Autres" id="basic-nav-dropdown">
              <NavDropdown.Item href="/FAQ">FAQ</NavDropdown.Item>
              <NavDropdown.Item href="/Profil-et-competence">Profil et compétences</NavDropdown.Item>
              <NavDropdown.Item href="/Coordonnateurs">Coordonnateurs</NavDropdown.Item>
              <NavDropdown.Item href="https://www.cmontmorency.qc.ca/" target="_blank" >College Montmorency ↗</NavDropdown.Item>
              <NavDropdown.Divider className='Divider'/>
              <NavDropdown.Item href="/DevTeam">Equipe de developpement</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <div className={isActive ? "divImgProfilNavbarActive" : "divImgProfilNavbar"}>
            <img
              src="https://i.imgur.com/gGYpde6.png"
              className="ImgProfilNavBar"
              alt="Profile"
            />
          </div>
          {isConnected ? <NavDropdown title="S'identifier" className='loginTitle' id="basic-nav-dropdown">
            <NavDropdown.Item href="/Login">Connexion</NavDropdown.Item>
            <NavDropdown.Item href="/Register">S'enregistrer</NavDropdown.Item>
          </NavDropdown>: <NavDropdown title="Connecté" className='loginTitle' id="basic-nav-dropdown">
          <NavDropdown.Item href="/Profil">Profil</NavDropdown.Item>
            <NavDropdown.Item onClick={handleLogout}>Déconnection</NavDropdown.Item>
          </NavDropdown>}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Navigationbar;
