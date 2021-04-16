import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Select from 'react-select';
import ApiService from '../../services/ApiService';
import useStateService from '../../services/StateService';

export function JoinCourseButton() {
  const { actions: { setShowModal, setModalContent } } = useStateService();
  const handleClick = () => {
    setShowModal(true);
    setModalContent(<JoinCourseForm />);
  };
  return (
    <button id="join-course-button" onClick={handleClick} style={{width: "100px", backgroundColor:"$color-b", marginTop:"20px"}}>
      Join Course
    </button>
  );
}

export default function JoinCourseForm() {
  const [courseOptions, setCourseOptions] = useState([]);
  const [courseId, setCourseId] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();
  const { actions: { setShowModal } } = useStateService();

  useEffect(() => {
    const getCourseOptions = async() => {
      try {
        const courses = await ApiService.getCourses();
        const options = courses.map(c => ({ value: c.id, label: c.name }));
        setCourseOptions(options);
      } catch (error) {
        const status = error.response?.status;
        if (status === 404) {
          setErrorMessage('Could not find courses to join.');
        }
      }
    };
    getCourseOptions();
  }, [setCourseOptions]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    try {
      await ApiService.joinCourse(courseId, joinCode);
    } catch (error) {
      const status = error.response?.status;
      if (status === 406) {
        setErrorMessage('Incorrect course join code.');
      } else {
        setErrorMessage('An unknown error occurred.');
        console.error('login failed for unknown reason', error);
      }
      return false;
    }
    setShowModal(false);
    history.go(0); // reloads the page
    return false;
  };

  return (
    <form id="join-course-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="join-course-id">Course</label>
        <Select
          id="join-course-id"
          value={courseOptions.find(x => x.value === courseId)}
          onChange={opt => setCourseId(opt.value)}
          options={courseOptions}
          required
        />
      </div>

      <div>
        <label htmlFor="join-course-code">Join Code</label>
        <input
          id="join-course-code"
          type="password"
          value={joinCode}
          placeholder="Join Code"
          onChange={e => setJoinCode(e.target.value)} required></input>
      </div>
      
      {errorMessage ? <p className="error">{errorMessage}</p> : null}

      <div>
        <button onClick={handleSubmit}>Join Course</button>
      </div>
    </form>
  );
}