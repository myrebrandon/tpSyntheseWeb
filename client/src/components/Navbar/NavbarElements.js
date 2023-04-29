import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import { useState } from 'react';

import styled from 'styled-components';
export const Nav = styled.nav`
background: #88BDBC;
height: 70px;
display: flex;
justify-content: space-between;
padding: 0.2rem calc((100vw - 1000px) / 50);
z-index: 12;
/* Third Nav */
/* justify-content: flex-start; */
`;

export const NavLink = styled(Link)`
color: #254E58;
font-size: 19px;
display: flex;
align-items: center;
text-decoration: none;
padding: 0 1rem;
height: 100%;
cursor: pointer;
&.active {
	font-weight: bold;
	text-decoration: underline;
	color: #4F4A41;
}
`;

export const Bars = styled(FaBars)`
display: none;
color: #00000;
@media screen and (max-width: 300px) {
	display: block;
	position: absolute;
	top: 0;
	right: 0;
	transform: translate(-100%, 75%);
	font-size: 1.8rem;
	cursor: pointer;
}
`;

export const NavMenu = styled.div`
display: flex;
align-items: center;
margin-right: -24px;
/* Second Nav */
/* margin-right: 24px; */
/* Third Nav */
/* width: 100vw;
white-space: nowrap; */
@media screen and (max-width: 300px) {
	display: none;
}
`;

export const NavBtn = styled.nav`
display: flex;
align-items: center;
margin-right: 24px;
/* Third Nav */
/* justify-content: flex-end;
width: 100vw; */
@media screen and (max-width: 300px) {
	display: none;
}
`;

export const NavBtnLink = styled.a`
border-radius: 20px;
background: #112F32;
padding: 7px 22px;
color: #fff;
outline: none;
border: none;
cursor: pointer;
transition: all 0.4s ease-in-out;
text-decoration: none;
/* Second Nav */
margin-left: 24px;
&:hover {
	transition: all 0.4s ease-in-out;
	background: #fff;
	color: #112F32;
}
`;
