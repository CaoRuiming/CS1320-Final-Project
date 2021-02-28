import React from 'react';
import Main from './pages/Main';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import { StateServiceContextProvider } from './services/StateService';


function App() {
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
