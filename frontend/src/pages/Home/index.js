import React from 'react';
import { Redirect } from 'react-router';
import LoginForm from '../../components/forms/LoginForm';
import { SignUpButton } from '../../components/forms/SignUpForm';
import useStateService from '../../services/StateService';
import './style.scss';

export default function Home() {
	const { state: { user } } = useStateService();

	// if user is already logged in
	if (user) {
		return <Redirect to="/courses" />;
	}

	return (
		<main id="home-page">
			<div id="home-base" className="row" style={{marginRight:"0"}}>
				<div id="left-section" className="col-md-8">
					<h1>Discourse</h1>
					<p>Learn Together</p>
				</div>
				<div id="right-section" className="col-md-4 ">
					<LoginForm />
					<div className="horizontal-center" style={{padding: "0", margin: "0"}}>
						<p>or</p>
						<SignUpButton />
					</div>
				</div>
			</div>
		</main>
	);
}