import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import feedStyles from './feedStyles.module.css';
import Tag from '../../components/Tag';


export default function PostFeed() {
  const { courseId, postId } = useParams();
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
    const activeClass = id.toString() === postId ? feedStyles.active : '';
    const classes = `${feedStyles.feedItem} ${activeClass}`;
    return (
      <li key={`post-${id}`} className={classes}>

        <Link to={`/courses/${courseId}/posts/${id}`}>
          <article tabIndex="0">
           <div className={feedStyles.feedItemTitle}>
             <h2>{title}</h2>
             <p>current date</p>
            </div>
            <div>
              <p>{content.substring(0, 50)}</p>
            </div>
            <div id="tags" className={feedStyles.tags}>
              
            </div>
          </article>
        </Link>
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
