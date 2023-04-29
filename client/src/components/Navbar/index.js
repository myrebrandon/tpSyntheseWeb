import React from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';

const Navbar = () => {
return (
	<>
	<Nav>
		<Bars />
		<NavMenu>
		<NavLink to='/acceuil'>
			Accueil
		</NavLink>
		<NavLink to='/Professeurs'>
			Professeurs
		</NavLink>
		<NavLink to='/cours'>
			Cours
		</NavLink>
		{/* Second Nav */}
		{/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
		</NavMenu>
		<NavBtn>
		<NavBtnLink href="https://www.cmontmorency.qc.ca/" target="_blank">College Montmorency</NavBtnLink>
		</NavBtn>
	</Nav>
	</>
);
};

export default Navbar;
