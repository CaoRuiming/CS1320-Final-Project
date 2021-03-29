import React, { useState } from 'react';
import ApiService from '../../services/ApiService';
import formStyles from './formStyles.module.css';

export default function SignUpForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newUserData = {
        first_name: firstName,
        last_name: lastName,
        email,
        username: email,
        password,
      };
      const user = await ApiService.createUser(newUserData);
    } catch (error) {
      const status = error.response?.status;
      console.error(`request failed with status code of ${status}`);
    }
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    return false;
  };
  const handleSubmitOnEnter = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  return (
    <form id="sign-up-form" className={formStyles.form} onSubmit={handleSubmit}>
      <label htmlFor="sign-up-first-name">First Name</label>
      <input
        id="sign-up-first-name"
        type="text"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        onKeyPress={handleSubmitOnEnter} required></input>

      <label htmlFor="sign-up-last-name">Last Name</label>
      <input
        id="sign-up-last-name"
        type="text"
        value={lastName}
        onChange={e => setLastName(e.target.value)}
        onKeyPress={handleSubmitOnEnter} required></input>

      <label for="sign-up-email">Email Address</label>
      <input
        id="sign-up-email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        onKeyPress={handleSubmitOnEnter} required></input>

      <label for="sign-up-password">Password</label>
      <input
        id="sign-up-password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        onKeyPress={handleSubmitOnEnter} required></input>
      
      <input type="submit" value="Submit"></input>
    </form>
  );
}