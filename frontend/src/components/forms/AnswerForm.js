import React, { useState } from 'react';
import ApiService from '../../services/ApiService';
import useStateService from '../../services/StateService';
import './style.scss';

export function AnswerFormButton({ post }) {
  const { actions: { setShowModal, setModalContent } } = useStateService();
  const handleClick = () => {
    setModalContent(<AnswerForm post={post} />);
    setShowModal(true);
  };
  return (
    <button id="edit-post-button" onClick={handleClick}>Edit Post</button>
  );
}

export default function AnswerForm({ post, instructor=false, onSubmit=() => {} }) {
  const originalPost = post ? post : {};
  const defaultValues = {
    instructor_answer: '',
    student_answer: '',
  };
  const startingValues = { ...defaultValues, ...originalPost };
  const { instructor_answer, student_answer } = startingValues;

  const [answer, setAnswer] = useState(
    instructor ? instructor_answer : student_answer
  );
  const {
    actions: { setShowModal },
  } = useStateService();

  // useEffect(() => {
  //   setAnswer(instructor ? instructor_answer : student_answer);
  // }, [instructor, post, instructor_answer, student_answer, setAnswer]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!answer) {
      return false;
    }

    try {
      const postData = {};
      postData[instructor ? 'instructor_answer' : 'student_answer'] = answer;

      // if post object is defined, then we are updating an existing post
      await ApiService.patchPost(post.course.id, post.id, postData);
      onSubmit();
      setShowModal(false);
    } catch (error) {
      const status = error.response?.status;
      console.error(`request failed with status code of ${status}`);
    }
    return false;
  };

  return (
    <form id="post-response-form" >
      <label htmlFor="post-response">
        <h3>Reply to the Post:</h3>
      </label>
      <textarea
        id="post-response"
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        placeholder="Add to the discussion"></textarea>
      
      <button onClick={handleSubmit}>Save Response</button>
    </form>
  );
}
