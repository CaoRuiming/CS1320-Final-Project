import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Home from './Home';
import Course from './Course';
import CourseList from './CourseList';
import useStateService from '../services/StateService';
import Profile from './Profile';
import ReactModal from 'react-modal';

export default function Main() {
	const {
		state: { initializing, showModal, modalContent },
		actions: { setShowModal },
	} = useStateService();

	if (initializing) {
		return null;
	}

	// required for accessibility reasons
	ReactModal.setAppElement('#app');

	return (
		<div>
			<a href="#main-content">Skip Navigation</a>
			<Header />
			
			<div id="main-content"></div>
			<Switch>
				<Route path="/home" component={Home} />
				<Route path="/courses/:courseId/posts/:postId" component={Course} />
				<Route path="/courses/:courseId/posts" component={Course} />
				<Route path="/courses/:courseId" component={Course} />
				<Route exact path="/courses" component={CourseList} />
				<Route exact path="/profile" component={Profile} />
				<Redirect to="/home" />
			</Switch>
			<ReactModal
				isOpen={showModal}
				onRequestClose={() => setShowModal(false)}>
				{modalContent}
			</ReactModal>
		</div>
	);
}