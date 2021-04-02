import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import ApiService from '../../services/ApiService';
import useStateService from '../../services/StateService';
import { VISIBILITY, POST_TYPE } from '../../utils/constants';
import './style.scss';

export function NewPostButton() {
  const { actions: { setShowModal, setModalContent } } = useStateService();
  const handleClick = () => {
    setModalContent(<PostForm />);
    setShowModal(true);
  };
  return (
    <button id="new-post-button" onClick={handleClick}>
      New Post
    </button>
  );
}

export default function PostForm({ post, response=false }) {
  const originalPost = post ? post : {};
  const defaultValues = {
    title: '',
    content: '',
    tags: [],
    anonymous: true,
    visibility: VISIBILITY.PUBLIC,
    type: POST_TYPE.QUESTION,
    instructor_answer: '',
    student_answer: '',
  };
  const startingValues = { ...defaultValues, ...originalPost };

  const [title, setTitle] = useState(startingValues.title);
  const [content, setContent] = useState(startingValues.content);
  const [tags, setTags] = useState(startingValues.tags);
  const [anonymous, setAnonymous] = useState(startingValues.anonymous);
  const [visibility, setVisibility] = useState(startingValues.visibility);
  const [type, setType] = useState(startingValues.type);
  const [studentAnswer, setStudentAnswer] = useState(startingValues.student_answer)
  const [instructorAnswer, setInstructorAnswer] = useState(startingValues.student_answer)
  const { pathname } = useLocation();
  const { state: { user }, actions: { setShowModal } } = useStateService();

	const courseId = pathname.match(/^\/courses\/([0-9]+)/)[1];
  const isInstructor = !!(post?.course?.instructors?.find(x => x.id === user.id));

  // used for the post response form
  useEffect(() => {
    setInstructorAnswer(post?.instructor_answer || '');
    setStudentAnswer(post?.student_answer || '');
  }, [post]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title || !content) {
      return false;
    }

    try {
      const postData = {
        title,
        content, 
        tags,
        anonymous,
        visibility,
        type,
        student_answer: studentAnswer,
        instructor_answer: instructorAnswer,
      };

      // if post object is defined, then we are updating an existing post
      if (post) {
        await ApiService.patchPost(post.course.id, post.id, postData);
      } else {
        await ApiService.createPost(courseId, postData);
        setShowModal(false);
      }
    } catch (error) {
      const status = error.response?.status;
      console.error(`request failed with status code of ${status}`);
    }
    return false;
  };

  if (response) {
    return (
      <form id="post-response-form" >
        <label htmlFor="post-response">
          <h3>Reply to the Post:</h3>
        </label>
        <textarea
          id="post-response"
          value={isInstructor ? instructorAnswer : studentAnswer}
          onChange={e => {
            if (isInstructor) {
              setInstructorAnswer(e.target.value);
            } else {
              setStudentAnswer(e.target.value);
            }
          }}
          placeholder="Add to the discussion"></textarea>
        
        <button onClick={handleSubmit}>Save Response</button>
      </form>
    );
  }

  return (
    <form id="post-form" onSubmit={handleSubmit}>
      <div id="post-form-title">
        <h2 id="post-title-content">Create a Post</h2>
      </div>
      <div id="post-title-settings">
        <label className="sr-only">Title</label>
        <input
          id="post-title"
          type="text"
          value={title}
          placeholder={`${type === POST_TYPE.NOTE ? 'Note' : 'Question'} Title`}
          onChange={e => setTitle(e.target.value)} required>
        </input>
      </div>
      <div id="post-content-settings">

      <div className="form-radio-group">
        <p>Post Type</p>
        <div>
          <input
            id="post-type-question"
            type="radio"
            value={POST_TYPE.QUESTION}
            checked={type === POST_TYPE.QUESTION}
            onChange={e => setType(parseInt(e.target.value))}></input>
          <label htmlFor="post-type-question">Question</label>
        </div>
        <div>
          <input
            id="post-type-note"
            type="radio"
            value={POST_TYPE.NOTE}
            checked={type === POST_TYPE.NOTE}
            onChange={e => setType(parseInt(e.target.value))}></input>
          <label htmlFor="post-type-question">Note</label>
        </div>
      </div>

      <div className="form-radio-group">
        <p>Post Visibility</p>
        <div>
          <input
            id="post-visibility-public"
            type="radio"
            value={VISIBILITY.PUBLIC}
            checked={visibility === VISIBILITY.PUBLIC}
            onChange={e => setVisibility(parseInt(e.target.value))}></input>
          <label htmlFor="post-visibility-public">Public</label>
        </div>
        <div>
          <input
            id="post-visibility-private"
            type="radio"
            value={VISIBILITY.PRIVATE}
            checked={visibility === VISIBILITY.PRIVATE}
            onChange={e => setVisibility(parseInt(e.target.value))}></input>
          <label htmlFor="post-visibility-private">Private</label>
        </div>
      </div>
   
   </div>

      <div className="form-checkbox-group">
        <input
          id="post-anonymous"
          type="checkbox"
          checked={anonymous}
          onChange={e => setAnonymous(e.target.checked)}></input>
        <label htmlFor="post-anonymous">Enable Anonymity</label>
      </div>

      <div>
        <label htmlFor="post-content">Content</label>
        <textarea
          id="post-content"
          value={content}
          onChange={e => setContent(e.target.value)}
          required>
        </textarea>
      </div>

      <div>
        <button onClick={handleSubmit}>Post</button>
        <button onClick={() => setShowModal(false)}>Cancel</button>
      </div>
    </form>
  );
}