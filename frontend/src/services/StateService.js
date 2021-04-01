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
	const [initializing, setInitializing] = useState(true);
	const [user, setUser] = useState(null);
	const [searchString, setSearchString] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [modalContent, setModalContent] = useState(null);

	// run the test function in ApiService
	useEffect(() => {
		ApiService.test();
	}, []);

	useEffect(() => {
		const getUserData = async () => {
			let userData = null;
			try {
				userData = await ApiService.checkLogin();
			} catch (error) {
				console.log('User not logged in', error);
			}
			setUser(userData);
		};
		getUserData();
	}, []);

	// update the initializing variable
	useEffect(() => {
		if (user) {
			setInitializing(false);
		}
	}, [user]);

	// this is the object that will be returned by the `useStateService` hook
	const contextValue = {
		state: {
			initializing, // read-only to the rest of the app
			user,
			searchString,
			showModal,
			modalContent,
		},
		actions: {
			setUser,
			setSearchString,
			setShowModal,
			setModalContent,
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
