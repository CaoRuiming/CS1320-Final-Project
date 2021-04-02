import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import useStateService from '../../services/StateService';
import feedStyles from './feedStyles.module.css';

function Tag() {
  return(
      <Link href="/" className={feedStyles.linkStyle}>
          <div className={feedStyles.tagItem}>tag</div>
      </Link>
  ); 
}

export default function PostFeed() {
  const { courseId, postId } = useParams();
  const [posts, setPosts] = useState([]);
  const [posts404, setPosts404] = useState(false);
  const { state: { searchString } } = useStateService();
  const [searchedPosts, setSearchPosts] = useState([]);


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
    const interval = setInterval(refreshPosts, 5000);
    return () => clearInterval(interval);
  }, [courseId]);


  useEffect(()=> {
    const searchPosts = async () => {
      try{
        if (searchString) {
          setSearchPosts(await ApiService.search(courseId, searchString));
          console.log('changed');
        }
      } catch (error) {
        const status = error.response?.status;
        if (status === 404) {
          setPosts404(true);
        }
      }
    }   
    searchPosts();
  }, [courseId, searchString] );
 
  const filteredPosts = (searchString ? searchedPosts : posts);
  const renderedPosts = filteredPosts.map(post => {
    const { id, title, content } = post;
    const activeClass = id.toString() === postId ? feedStyles.active : '';
    const classes = `${feedStyles.feedItem} ${activeClass}`;
    return (
      <li key={`post-${id}`} className={classes}>
        {/* <div className={feedStyles.feedItemTitle}>Needs an answer</div> */}
        <Link className={feedStyles.linkStyle} to={`/courses/${courseId}/posts/${id}`}>
          <article className={feedStyles.feedItemContent} tabIndex="0">
           <div className={feedStyles.feedItemTitle}>
             <h2 className={feedStyles.titleContent}>{title}</h2>
             <p className={feedStyles.feedItemDate}>current date</p>
            </div>
            <div className={feedStyles.questionPreview}>
              <p className={feedStyles.previewContent}>{content.substring(0, 50)}</p>
            </div>
            <div id="tags" className={feedStyles.tags}>
              <Tag></Tag>
              <Tag></Tag>
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
      {searchString ? <li> 
        <h2>Showing results: <emph>{searchString}</emph></h2> 
      </li> : null}
      {renderedPosts || null}
    </ul>
  );
}
