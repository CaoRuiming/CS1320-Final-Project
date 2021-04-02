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
			<div className="home-base" >
				<div className="left-section">
					<h1>Discourse</h1>
					<p>Learn Together</p>
				</div>
				<div className="right-section">
					<LoginForm />
					<div className="horizontal-center">
						<p>or</p>
						<SignUpButton />
					</div>
				</div>
			</div>
		</main>
	);
}