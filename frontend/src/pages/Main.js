import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Home from './Home';
import Course from './Course';
import CourseList from './CourseList';
import useStateService from '../services/StateService';
import Profile from './Profile';

export default function Main() {
	const { state: { initializing } } = useStateService();

	if (initializing) {
		return null;
	}

	return (
		<div>
			<Header />
			<Switch>
				<Route path="/home" component={Home} />
				<Route path="/courses/:courseId/posts/:postId" component={Course} />
				<Route path="/courses/:courseId/posts" component={Course} />
				<Route path="/courses/:courseId" component={Course} />
				<Route exact path="/courses" component={CourseList} />
				<Route exact path="/profile" component={Profile} />
				<Redirect to="/home" />
			</Switch>
		</div>
	);
}