import React from 'react';
import SearchForm from '../forms/SearchForm';
import headerStyles from './headerStyles.module.css';

export default function Header() {

	return (
		<header>
			<nav id="navbar" className={headerStyles.navBar}>
				<div id="navLinks" className={headerStyles.navLinks}>
					<h1 id="discourseHeader" className={headerStyles.discourseHeader}>Discourse</h1>
						<a id="profileLink" className={headerStyles.profileLink} href="/"> Profile</a> 
						<a id="coursesLink" className={headerStyles.coursesLink} href="/"> Courses</a>
				</div>
				<SearchForm></SearchForm>
				
				<button> Make a Post </button>
			</nav>
		</header>
	);
}
// Search Bar, Header 
/** LOGO, Profile Button, Search Bar, New Post  */