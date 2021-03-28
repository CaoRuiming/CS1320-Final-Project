import React, { useState } from 'react';
import ApiService from '../../services/ApiService';

export default function LoginForm(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    try {
      ApiService.login(username, password);
    } catch (error) {
      console.error('login failed');
    }
    setUsername('');
    setPassword('');
  };
  const handleSubmitOnEnter = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
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