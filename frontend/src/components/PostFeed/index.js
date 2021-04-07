import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import useStateService from '../../services/StateService';
import Tags from '../Tags';
import './style.scss';

export default function PostFeed() {
  const { courseId, postId } = useParams();
  const {
    state: { searchString, posts },
    actions: { refreshPosts },
  } = useStateService();
  const [searchedPosts, setSearchPosts] = useState([]);


  useEffect(() => {
    refreshPosts(courseId);
    const interval = setInterval(() =>refreshPosts(courseId), 5000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);


  useEffect(()=> {
    const searchPosts = async () => {
      try{
        if (searchString) {
          setSearchPosts(await ApiService.search(courseId, searchString));
        }
      } catch (error) {
        const status = error.response?.status;
        if (status === 404) {
          console.error('no posts found')
        }
      }
    }   
    searchPosts();
  }, [courseId, searchString] );
 
  const filteredPosts = (searchString ? searchedPosts : posts);
  const sortedPosts = filteredPosts.sort((a, b) => a.created_at < b.created_at ? 1 : -1);
  const renderedPosts = sortedPosts.map(post => {
    const { id, title, content } = post;
    const activeClass = id.toString() === postId ? 'active' : '';
    const classes = `feedItem ${activeClass}`;
    return (
      <li key={`post-${id}`} className={classes}>
        {/* <div className="feedItemTitle">Needs an answer</div> */}
        <Link to={`/courses/${courseId}/posts/${id}`}>
          <article>
            <div className="feedItemTitle flex-horizontal">
              <h2>{title}</h2>
              <time>current date</time>
            </div>
            <div className="feedItemContent">
              <p>{content.substring(0, 50)}</p>
            </div>
            <Tags tags={[{id:1,name:'Tag'},{id:2,name:'Tag'}]} />
          </article>
        </Link>
      </li>
    );
  });

  return (
    <ul id="post-feed" role="feed" className="feed">
      {searchString ? <li> 
        <h2>Showing results: <emph>{searchString}</emph></h2> 
      </li> : null}
      {renderedPosts || null}
    </ul>
  );
}
