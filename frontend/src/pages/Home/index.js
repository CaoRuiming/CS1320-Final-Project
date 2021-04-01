import React, {useEffect} from 'react';
import LoginForm from '../../components/forms/LoginForm';
//import SignUpForm from '../../components/forms/SignUpForm';
import useStateService from '../../services/StateService';
import './homeStyles.scss';

export default function UrlInput(props) {
	// example of using StateService
	const {
		state: { example },
		actions: { setExample },
	} = useStateService();

	// example
	// useEffect(() => {
	// 	setExample('example');
	// 	console.log('example value:', example);
	// }, []);

	return (
		<main>
            <div className="homeBase" >
                <div className="leftSection">

                    <h1>Discourse</h1>
                    <p>Learn Together</p>

                   
                </div>
                <div className="rightSection">
                
                    <LoginForm />
						{/* Having issues rending now when running frontend was working at first but stopped when 
						I started editing the loginform */}
                </div>
                
                {/* <p>Sign up for a new account using the form below:</p>

                <SignUpForm /> */}
            </div>
		</main>
	);
}