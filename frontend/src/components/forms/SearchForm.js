import React, { useState } from 'react';
import useStateService from '../../services/StateService';
import formStyles from './formStyles.module.css';

export default function SearchForm() {
  const [search , setSearch] = useState(''); 
  const {
    actions: { setSearchString },
  } = useStateService();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSearchString(search);
    return false;
  };

  const handleSubmitOnEnter = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  return (
    <form role="search" id="search-form" className={formStyles.form} onSubmit={handleSubmit}>
      <label htmlFor="search-term">Search</label>
      <input
        id="search-term"
        type="search"
        value={search}
        placeholder="Search"
        onChange={e => setSearch(e.target.value)}
        onKeyPress={handleSubmitOnEnter} required></input>

    </form>
  );
}