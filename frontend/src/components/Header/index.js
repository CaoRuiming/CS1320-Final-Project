import React from 'react';
import { Link, NavLink } from 'react-router-dom';
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
						<li>
							<NavLink to="/profile" activeClassName="active">Profile</NavLink>
						</li>
						<li>
							<NavLink to="/courses" activeClassName="active">Courses</NavLink>
						</li>
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
