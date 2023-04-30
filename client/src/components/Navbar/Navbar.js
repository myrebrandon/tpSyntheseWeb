// // import './navbar.css';
// // import React, { useState } from 'react';
// // import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import {
// // NavLink,
// // Bars,
// // NavMenu,
// // NavBtn,
// // NavBtnLink,
// // } from './NavbarElements';
// // function Navbar() {
// // 	const [isActive, setIsActive] = useState(false);
  
// // 	const handleToggle = (isOpen) => {
// // 	  setIsActive(isOpen);
// // 	};
// // 	return (
// // 		<div className="App">
// // 		<Navbar bg="light" expand="lg" onToggle={handleToggle}>
// // 		<Navbar.Brand href="#Acceuil">
// // 			<img
// // 			src="https://i.imgur.com/a834LGK.png"
// // 			width="50"
// // 			className='imgLogoNavbar'
// // 			alt="Logo"
// // 			/>{' '}
// // 		</Navbar.Brand>
// // 		<div className='StageMomoTitle title-with-border'>
// // 			Stages Montmorency
// // 			</div>
// // 		<Navbar.Toggle aria-controls="basic-navbar-nav" />
// // 		<Navbar.Collapse id="basic-navbar-nav">
// // 			<Nav className="mr-auto">
// // 			<Nav.Link className="navElements" href="#Acceuil">Acceuil</Nav.Link>
// // 			<Nav.Link className="navElements" href="#employeurs">Espace Employeurs</Nav.Link>
// // 			<Nav.Link className="navElements" href="#employeurs">Espace Stagiaires</Nav.Link>
// // 			<NavDropdown className="navElements" title="Autres" id="basic-nav-dropdown">
// // 				<NavDropdown.Item href="#action/3.1">FAQ</NavDropdown.Item>
// // 				<NavDropdown.Item href="#action/3.2">Coordonnateurs</NavDropdown.Item>
// // 				<NavDropdown.Item href="#action/3.3">College Montmorency</NavDropdown.Item>
// // 				<NavDropdown.Divider className='Divider'/>
// // 				<NavDropdown.Item href="#action/3.4">Equipe de developpement</NavDropdown.Item>
// // 			</NavDropdown>
// // 			</Nav>
// // 			<div className={isActive ? "divImgProfilNavbarActive" : "divImgProfilNavbar"}>
// // 			<img
// // 				src="https://i.imgur.com/gGYpde6.png"
// // 				className="ImgProfilNavBar"
// // 				alt="Profile"
// // 			/>
// // 			</div>
// // 			<NavDropdown title="S'identifier" className='loginTitle' id="basic-nav-dropdown">
// // 			<NavDropdown.Item href="#action/3.1">Connexion</NavDropdown.Item>
// // 			<NavDropdown.Item href="#action/3.2">S'enregistrer</NavDropdown.Item>
// // 			</NavDropdown>
// // 		</Navbar.Collapse>
// // 		</Navbar>
// // 	</div>
// // 	);
// // };

// // export default Navbar;


// import './navbar.css';
// import React, { useState } from 'react';
// import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function AppNavbar() {
//   const [isActive, setIsActive] = useState(false);

//   const handleToggle = (isOpen) => {
//     setIsActive(isOpen);
//   };
//   return (
//     <div className="Navbar">
//       <Navbar bg="light" expand="lg" onToggle={handleToggle}>
//         <Navbar.Brand href="#Acceuil">
//           <img
//             src="https://i.imgur.com/a834LGK.png"
//             width="50"
//             className='imgLogoNavbar'
//             alt="Logo"
//           />{' '}
//         </Navbar.Brand>
//         <div className='StageMomoTitle title-with-border'>
//           Stages Montmorency
//           </div>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="mr-auto">
//             <Nav.Link className="navElements" href="#Acceuil">Acceuil</Nav.Link>
//             <Nav.Link className="navElements" href="#employeurs">Espace Employeurs</Nav.Link>
//             <Nav.Link className="navElements" href="#employeurs">Espace Stagiaires</Nav.Link>
//             <NavDropdown className="navElements" title="Autres" id="basic-nav-dropdown">
//               <NavDropdown.Item href="#action/3.1">FAQ</NavDropdown.Item>
//               <NavDropdown.Item href="#action/3.2">Coordonnateurs</NavDropdown.Item>
//               <NavDropdown.Item href="#action/3.3">College Montmorency</NavDropdown.Item>
//               <NavDropdown.Divider className='Divider'/>
//               <NavDropdown.Item href="#action/3.4">Equipe de developpement</NavDropdown.Item>
//             </NavDropdown>
//           </Nav>
//           <div className={isActive ? "divImgProfilNavbarActive" : "divImgProfilNavbar"}>
//             <img
//               src="https://i.imgur.com/gGYpde6.png"
//               className="ImgProfilNavBar"
//               alt="Profile"
//             />
//           </div>
//           <NavDropdown title="S'identifier" className='loginTitle' id="basic-nav-dropdown">
//             <NavDropdown.Item href="#action/3.1">Connexion</NavDropdown.Item>
//             <NavDropdown.Item href="#action/3.2">S'enregistrer</NavDropdown.Item>
//           </NavDropdown>
//         </Navbar.Collapse>
//       </Navbar>
//     </div>
//   );
// }

// export default Navbar;
