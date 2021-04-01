import React from 'react';
import { Fragment } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import useStateService from '../../services/StateService';
import SearchForm from '../forms/SearchForm';
import PostForm from '../forms/PostForm';
import './style.scss';

export default function Header() {
	const { pathname } = useLocation();
	const { actions: { setShowModal, setModalContent } } = useStateService();
	const courseView = pathname.match(/^\/courses\/[0-9]+/);

	const handleNewPost = () => {
		setModalContent(<PostForm />);
		setShowModal(true);
	};

	const courseViewElements = (
		<Fragment>
			<SearchForm />
			<button id="new-post-button" onClick={handleNewPost}>
				New Post
			</button>
		</Fragment>
	);

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
					{courseView ? courseViewElements : null}
				</div>
			</nav>
		</header>
	);
}
