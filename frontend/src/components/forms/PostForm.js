import React, { useState } from 'react';
import ApiService from '../../services/ApiService';
import useStateService from '../../services/StateService';
import { VISIBILITY, POST_TYPE } from '../../utils/constants';
import './style.scss';


export default function PostForm({ post }) {
  const originalPost = post ? post : {};
  const defaultValues = {
    title: '',
    content: '',
    tags: [],
    anonymous: true,
    visibility: VISIBILITY.PUBLIC,
    type: POST_TYPE.QUESTION,
  };
  const startingValues = { ...defaultValues, ...originalPost };

  const [title, setTitle] = useState(startingValues.title);
  const [content, setContent] = useState(startingValues.content);
  const [tags, setTags] = useState(startingValues.tags);
  const [anonymous, setAnonymous] = useState(startingValues.anonymous);
  const [visibility, setVisibility] = useState(startingValues.visibility);
  const [type, setType] = useState(startingValues.type);
  const { actions: { setShowModal } } = useStateService();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title || !content) {
      return false;
    }

    try {
      const postData = { title, content, tags, anonymous, visibility, type };

      // if post object is defined, then we are updating an existing post
      if (post) {
        await ApiService.patchPost(post.course.id, post.id, postData);
      } else {
        // await ApiService.createPost()
        console.log('not implemented yet');
        setShowModal(false);
      }
    } catch (error) {
      const status = error.response?.status;
      console.error(`request failed with status code of ${status}`);
    }
    return false;
  };

  return (
    <form id="post-form" onSubmit={handleSubmit}>
      <h2>Create a Post</h2>

      <div>
        <label htmlFor="post-title">Title</label>
        <input
          id="post-title"
          type="text"
          value={title}
          placeholder={`${type === POST_TYPE.NOTE ? 'Note' : 'Question'} Title`}
          onChange={e => setTitle(e.target.value)} required></input>
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