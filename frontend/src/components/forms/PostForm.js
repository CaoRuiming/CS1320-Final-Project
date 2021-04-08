import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import CreatableSelect from 'react-select/creatable';
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

export function EditPostButton(props) {
  const { actions: { setShowModal, setModalContent } } = useStateService();
  const handleClick = () => {
    setModalContent(<PostForm {...props} />);
    setShowModal(true);
  };
  return (
    <button id="edit-post-button" onClick={handleClick}>Edit Post</button>
  );
}

export default function PostForm({ post, onSubmit=() => {} }) {
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
  startingValues.tags = startingValues.tags.map(t => t.id);

  const [title, setTitle] = useState(startingValues.title);
  const [content, setContent] = useState(startingValues.content);
  const [tags, setTags] = useState(startingValues.tags);
  const [tagOptions, setTagOptions] = useState([]);
  const [anonymous, setAnonymous] = useState(startingValues.anonymous);
  const [visibility, setVisibility] = useState(startingValues.visibility);
  const [type, setType] = useState(startingValues.type);
  const { pathname } = useLocation();
  const {
    actions: { setShowModal, refreshPosts },
  } = useStateService();

	const courseId = pathname.match(/^\/courses\/([0-9]+)/)[1];

  useEffect(() => {
    const getTagOptions = async() => {
      try {
        const tags = await ApiService.getCourseTags(courseId);
        const options = tags.map(t => ({ value: t.id, label: t.name }));
        setTagOptions(options);
      } catch (error) {
        console.error('failed to get tags', error);
      }
    };
    getTagOptions();
  }, [setTagOptions, courseId]);

  const handleCreateTag = async (newTagName) => {
    const newTag = await ApiService.createTag(courseId, { name: newTagName });
    setTags([...tags, newTag.id]);
    setTagOptions([...tagOptions, { value: newTag.id, label: newTag.name }]);
  };

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
      };

      // if post object is defined, then we are updating an existing post
      if (post) {
        await ApiService.patchPost(post.course.id, post.id, postData);
        refreshPosts(post.course.id);
      } else {
        await ApiService.createPost(courseId, postData);
        refreshPosts(courseId);
      }
      onSubmit();
      setShowModal(false);
    } catch (error) {
      const status = error.response?.status;
      console.error(`request failed with status code of ${status}`);
    }
    return false;
  };

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
        <label htmlFor="tag-selection">Tags</label>
        <CreatableSelect
          id="tag-selection"
          value={tagOptions.filter(x => tags.includes(x.value))}
          onChange={opts => setTags(opts.map(x => x.value))}
          onCreateOption={handleCreateTag}
          options={tagOptions}
          isMulti
          required
        />
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
