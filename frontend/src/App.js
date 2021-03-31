import React, { useEffect } from 'react';
import Main from './pages/Main';
import './styles/App.css';
import { BrowserRouter } from "react-router-dom";
import { StateServiceContextProvider } from './services/StateService';
import ApiService from './services/ApiService';


function App() {
	// get CSRF token from the backend for current session
	useEffect(() => {
		ApiService.getCsrf();
	}, []);

	return (
		<BrowserRouter>
			<div className="app">
				<StateServiceContextProvider>
					<Main />
				</StateServiceContextProvider>
			</div>
		</BrowserRouter>
  );
}

export default App;
