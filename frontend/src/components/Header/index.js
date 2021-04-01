import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import SearchForm from '../forms/SearchForm';
import './style.scss';

export default function Header() {
	const { pathname } = useLocation();
	const courseView = pathname.match(/^\/courses\/[0-9]+/);
	// const { courseId } = useParams();

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
					{courseView ? <SearchForm /> : null}
					{courseView ? <button id="new-post-button">New Post</button> : null}
				</div>
			</nav>
		</header>
	);
}
