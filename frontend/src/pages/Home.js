import React, {useEffect, useState} from 'react';
import LoginForm from '../components/forms/LoginForm';
import PostForm from '../components/forms/PostForm';
import SignUpForm from '../components/forms/SignUpForm';
import useStateService from '../services/StateService';

export default function UrlInput(props) {
	// example of using StateService
	const {
		state: { example },
		actions: { setExample },
	} = useStateService();

	// example
	useEffect(() => {
		setExample('example');
		console.log('example value:', example);
	}, []);

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