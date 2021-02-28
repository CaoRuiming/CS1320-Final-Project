import React, {useEffect, useState} from 'react';
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
			<p>Hello, World!</p>
		</div>
	);
}