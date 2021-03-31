import React, {useState, createContext, useContext, useEffect} from 'react';
// import StorageService from './StorageService';
import ApiService from './ApiService';

export const StateServiceContext = createContext();

/**
 * Context provider for StateService. This is where most of the logic for
 * StateService lives. This component should only be directly used in
 * `App.js`.
 * @param {*} props props for React Component
 * @returns {Component} React Component to be rendered
 */
export function StateServiceContextProvider(props) {
	// example value that is store in StateService
	const [example, setExample] = useState(undefined);
	const [user, setUser] = useState(null);
	const [searchString, setSearchString] = useState('');

	useEffect(() => {
		ApiService.test();
	}, []);

	// this is the object that will be returned by the `useStateService` hook
	const contextValue = {
		state: {
			example,
			user,
			searchString,
		},
		actions: {
			setExample,
			setUser,
			setSearchString,
		},
	};

	return (
		<StateServiceContext.Provider value={contextValue}>
			{props.children}
		</StateServiceContext.Provider>
	);
};

/**
 * React hook for accessing state and actions from StateService. Values in 
 * the `state` field of the returned object are visible to all components that
 * use this hook. Calls using functions from the `action` field of the returned
 * object updates the values in `state`, and triggers updates appropriately
 * for components watching for changes in the updated `state` value.
 * @returns {Object} Object like { state: {val, ...}, actions: {setVal, ...} }
 */
export default function useStateService() {
	return useContext(StateServiceContext);
};
