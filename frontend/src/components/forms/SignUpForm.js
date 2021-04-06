import React, { useState } from 'react';
import ApiService from '../../services/ApiService';
import useStateService from '../../services/StateService';
import './style.scss';

export function SignUpButton() {
  const { actions: { setShowModal, setModalContent } } = useStateService();
  const handleClick = () => {
    setShowModal(true);
    setModalContent(<SignUpForm />);
  };
  return (
    <button id="sign-up-button" onClick={handleClick}>
      Create New Account
    </button>
  );
}

export default function SignUpForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { actions: { setShowModal } } = useStateService();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      return false;
    }

    try {
      const newUserData = {
        first_name: firstName,
        last_name: lastName,
        email,
        username: email,
        password,
      };
      await ApiService.createUser(newUserData);
      setMessage('Success!');
      await (new Promise((res) => setTimeout(res, 1000)));
    } catch (error) {
      const status = error.response?.status;
      console.error(`request failed with status code of ${status}`);
      return false;
    }
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setShowModal(false);
    return false;
  };
  const handleSubmitOnEnter = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  return (
    <form id="sign-up-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

      <div>
        <label htmlFor="sign-up-first-name">First Name</label>
        <input
          id="sign-up-first-name"
          type="text"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          onKeyPress={handleSubmitOnEnter} required></input>
      </div>

      <div>
        <label htmlFor="sign-up-last-name">Last Name</label>
        <input
          id="sign-up-last-name"
          type="text"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          onKeyPress={handleSubmitOnEnter} required></input>
      </div>

      <div>
        <label htmlFor="sign-up-email">Email Address</label>
        <input
          id="sign-up-email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyPress={handleSubmitOnEnter} required></input>
      </div>

      <div>
        <label htmlFor="sign-up-password">Password</label>
        <input
          id="sign-up-password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyPress={handleSubmitOnEnter} required></input>
      </div>
      
      {message ? <p className="message">{message}</p> : null}
      <button onClick={handleSubmit}>Sign Up</button>
    </form>
  );
}