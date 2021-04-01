import React, { useEffect } from 'react';
import Main from './pages/Main';
import { BrowserRouter } from "react-router-dom";
import { StateServiceContextProvider } from './services/StateService';
import ApiService from './services/ApiService';
import './styles/App.scss';


function App() {
	// get CSRF token from the backend for current session
	useEffect(() => {
		ApiService.getCsrf();
	}, []);

	return (
		<div id="app">
			<BrowserRouter>
				<StateServiceContextProvider>
					<Main />
				</StateServiceContextProvider>
			</BrowserRouter>
		</div>
  );
}

export default App;
