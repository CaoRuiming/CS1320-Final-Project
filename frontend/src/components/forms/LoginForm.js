import React, { useState } from 'react';
import ApiService from '../../services/ApiService';

export default function LoginForm(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await ApiService.login(username, password);
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
    <form id="login-form" onSubmit={handleSubmit}>
      <label for="login-username">Email Address</label>
      <input
        id="login-username"
        type="email"
        value={username}
        onChange={e => setUsername(e.target.value)}
        onKeyPress={handleSubmitOnEnter} required></input>

      <label for="login-password">Password</label>
      <input
        id="login-password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        onKeyPress={handleSubmitOnEnter} required></input>
      
      <input type="submit" value="Submit"></input>
    </form>
  );
}