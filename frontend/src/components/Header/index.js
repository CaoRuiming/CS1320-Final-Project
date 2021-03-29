import React from 'react';
import SearchForm from '../forms/SearchForm';
import headerStyles from './headerStyles.module.css';

export default function Header() {

	return (
		<header>
			<nav id="navbar" className={headerStyles.navBar}>
			 	<h1>Discourse</h1>
				<a href="/"> Profile</a> 
			
				<a href="/" > Courses</a>

				<SearchForm></SearchForm>
				
				<button> Make a Post </button>
			</nav>
		</header>
	);
}
// Search Bar, Header 
/** LOGO, Profile Button, Search Bar, New Post  */