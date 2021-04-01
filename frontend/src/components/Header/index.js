import React from 'react';
import { Link } from 'react-router-dom';
import SearchForm from '../forms/SearchForm';
import './style.scss';

export default function Header() {
	return (
		<header>
			<nav>
				<div>
					<ul>
						<li>
							<Link to="/home">
								<h1 id="header-logo" className="logo">Discourse</h1>
							</Link>
						</li>
						<li><Link to="/profile"> Profile</Link></li>
						<li><Link to="/courses"> Courses</Link></li>
					</ul>
				</div>
				<div>
					<SearchForm />
					<button id="new-post-button">New Post</button>
				</div>
			</nav>
		</header>
	);
}
