import React, {useEffect, useState} from 'react';
import LoginForm from '../components/forms/LoginForm';
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
		<div>
			<h1>Discourse</h1>
			<p>Log in using the form Below:</p>
			<LoginForm />
		</div>
	);
}