import React from 'react';
import { Fragment } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import SearchForm from '../forms/SearchForm';
import { NewPostButton } from '../forms/PostForm';
import './style.scss';

export default function Header() {
	const { pathname } = useLocation();
	const courseView = pathname.match(/^\/courses\/[0-9]+/);

	const courseViewElements = (
		<Fragment>
			<SearchForm />
			<NewPostButton />
		</Fragment>
	);
	
	console.log(pathname);
	return pathname !== "/home" ? (
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
					{courseView ? courseViewElements : null}
				</div>
			</nav>
		</header>
	) : null;
}
