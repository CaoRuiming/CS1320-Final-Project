import React from 'react';
import LoginForm from '../components/forms/LoginForm';
import SignUpForm from '../components/forms/SignUpForm';

export default function Home(props) {
	return (
		<main>
			<h1>Discourse</h1>
			<p>Log in using the form below:</p>
			<LoginForm />
			<p>Sign up for a new account using the form below:</p>
			<SignUpForm />
		</main>
	);
}