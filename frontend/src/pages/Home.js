import React from 'react';
import LoginForm from '../components/forms/LoginForm';
import { SignUpButton } from '../components/forms/SignUpForm';

export default function Home(props) {
	return (
		<main>
			<h1>Discourse</h1>
			<p>Log in using the form below:</p>
			<LoginForm />
			<p>or</p>
			<SignUpButton />
		</main>
	);
}