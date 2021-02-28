import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Home from './Home';

export default function Main() {
	return (
		<div>
			<Header />
			<Switch>
				<Route path="/home" component={Home} />
				{/* <Route path="/page2" component={Page2} /> */}
				{/* <Route path="/page3" component={Page3} /> */}
				<Redirect to="/home" />
			</Switch>
		</div>
	);
}