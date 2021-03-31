import React from 'react';
import { Link } from 'react-router-dom';
import SearchForm from '../forms/SearchForm';
import './styles.scss';


export default function Header() {

	return (
		<header>
			<nav id="navbar">
				<div>
					<ul>
						<li><h1 id="header-logo" className="logo">Discourse</h1></li>
						<li><Link href="/profile"> Profile</Link></li>
						<li><Link href="/courses"> Courses</Link></li>
					</ul>
				</div>
				<div>
					<SearchForm />
					<button>New Post</button>
				</div>
			</nav>
		</header>
	);
}
