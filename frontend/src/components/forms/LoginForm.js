import React, { useState } from 'react';
import ApiService from '../../services/ApiService';
import useStateService from '../../services/StateService';
import formStyles from './formStyles.module.css';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { actions: { setUser } } = useStateService();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await ApiService.login(username, password);
      setUser(user); // save data of logged in user to StateService
    } catch (error) {
      const status = error.response?.status;
      if (status === 406) {
        console.error('incorrect login credentials');
      } else {
        console.error('login failed for unknown reason', error);
      }
    }
    setUsername('');
    setPassword('');
    return false;
  };
  const handleSubmitOnEnter = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  return (
    <form id="login-form" class={formStyles.form} onSubmit={handleSubmit}>
      <label for="login-username">Email Address</label>
      <input
        id="login-username"
        type="email"
        value={username}
        placeholder="Email Address"
        onChange={e => setUsername(e.target.value)}
        onKeyPress={handleSubmitOnEnter} required></input>

      <label for="login-password">Password</label>
      <input
        id="login-password"
        type="password"
        value={password}
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
        onKeyPress={handleSubmitOnEnter} required></input>
      
      <input type="submit" value="Submit"></input>
    </form>
  );
}