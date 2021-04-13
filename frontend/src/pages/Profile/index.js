import React from 'react';
import { Redirect } from 'react-router';
import useStateService from '../../services/StateService';
import ApiService from '../../services/ApiService';
import { useHistory } from 'react-router';


export default function Profile() {
  const { state: { user }, actions: { setUser }  } = useStateService();
  const history = useHistory();

  if (!user) {
    return <Redirect to="home" />;
  }
  const handleClick = async () => {
    await ApiService.logout();
    setUser(null);
    history.go(0);
    
  };

  const {
    email,
    pronouns,
    first_name: firstName,
    last_name: lastName,
  } = user;

  return (
    <main>
      <h2>User Profile</h2>
      <p><strong>First Name:</strong> {firstName}</p>
      <p><strong>Last Name:</strong> {lastName}</p>
      <p><strong>Pronouns:</strong> {pronouns || 'Not provided'}</p>
      <p><strong>Email Address:</strong> {email}</p>
      <button onClick={handleClick}>Logout</button>
    </main>
  );
}