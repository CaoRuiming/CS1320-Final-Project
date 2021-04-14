import React, { useState } from 'react';
import { useHistory } from 'react-router';
import ApiService from '../../services/ApiService';
import useStateService from '../../services/StateService';
import './style.scss';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { actions: { setUser } } = useStateService();
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    try {
      const user = await ApiService.login(username, password);
      setUser(user); // save data of logged in user to StateService
    } catch (error) {
      const status = error.response?.status;
      if (status === 406) {
        setErrorMessage('Incorrect login credentials.');
      } else {
        setErrorMessage('An unknown error occurred.');
        console.error('login failed for unknown reason', error);
      }
      return false;
    }
    setUsername('');
    setPassword('');
    history.push('/courses');
    return false;
  };
  const handleSubmitOnEnter = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  return (
    <form id="login-form" onSubmit={handleSubmit}>
      <label htmlFor="login-username">Email Address</label>
      <input
        id="login-username"
        type="email"
        value={username}
        placeholder="Email Address"
        onChange={e => setUsername(e.target.value)}
        onKeyPress={handleSubmitOnEnter} required></input>

      <label htmlFor="login-password">Password</label>
      <input
        id="login-password"
        type="password"
        value={password}
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
        onKeyPress={handleSubmitOnEnter} required></input>
      
      {errorMessage ? <p className="error">{errorMessage}</p> : null}

      <div className="horizontal-center">
        <button onClick={handleSubmit} style={{padding:"0", minWidth:"90px"}}>Log In</button>
      </div>
    </form>
  );
}