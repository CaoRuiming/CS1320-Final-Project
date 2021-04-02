import React from 'react';
import LoginForm from '../../components/forms/LoginForm';
import { SignUpButton } from '../../components/forms/SignUpForm';
import './style.scss';

export default function Home() {
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