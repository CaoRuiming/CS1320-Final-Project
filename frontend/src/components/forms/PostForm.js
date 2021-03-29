import React, { useState } from 'react';
import ApiService from '../../services/ApiService';
import { VISIBILITY, POST_TYPE } from '../../utils/constants';
import formStyles from './formStyles.module.css';


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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const postData = { title, content, tags, anonymous, visibility, type };

      // if post object is defined, then we are updating an existing post
      if (post) {
        await ApiService.patchPost(post.course.id, post.id, postData);
      } else {
        // await ApiService.createPost()
        console.log('not implemented yet');
      }
    } catch (error) {
      const status = error.response?.status;
      console.error(`request failed with status code of ${status}`);
    }
    return false;
  };
  const handleSubmitOnEnter = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  return (
    <form id="post-form" class={formStyles.form} onSubmit={handleSubmit}>
      <label for="post-title">Title</label>
      <input
        id="post-title"
        type="text"
        value={title}
        placeholder={`${type === POST_TYPE.NOTE ? 'Note' : 'Question'} Title`}
        onChange={e => setTitle(e.target.value)} required></input>

      <label for="post-content">Content</label>
      <textarea
        id="post-content"
        value={content}
        onChange={e => setContent(e.target.value)}
        required>
      </textarea>
      
      <input type="submit" value="Submit"></input>
    </form>
  );
}