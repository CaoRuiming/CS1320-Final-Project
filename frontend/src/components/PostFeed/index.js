import React, { useEffect, useState } from 'react';
import ApiService from '../../services/ApiService';
import feedStyles from './feedStyles.module.css';

export default function PostFeed({ courseId }) {
  const [posts, setPosts] = useState([]);
  const [posts404, setPosts404] = useState(false);

  useEffect(() => {
    const refreshPosts = async () => {
      try {
        setPosts(await ApiService.getCoursePosts(courseId));
      } catch (error) {
        const status = error.response?.status;
        if (status === 404) {
          setPosts404(true);
        }
      }
    };
    refreshPosts();
  }, [courseId]);

  const renderedPosts = posts.map(post => {
    const { id, title, content } = post;
    return (
      <li key={`post-${id}`} className={feedStyles.feedItem}>
        <article tabIndex="0">
          <h2>{title}</h2>
          <p>{content.substring(0, 50)}</p>
        </article>
      </li>
    );
  });

  if (posts404) {
    return (
      <ul id="post-feed" className={feedStyles.feed}>
        <li>Posts not found!</li>
      </ul>
    );
  }

  return (
    <ul id="post-feed" role="feed" className={feedStyles.feed}>
      {renderedPosts || null}
    </ul>
  );
}
