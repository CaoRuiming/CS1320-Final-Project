import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ApiService from '../../services/ApiService';
import feedStyles from '../PostFeed/feedStyles.module.css';
import Tag from '../../components/Tag';


export default function PostView() {
  const { courseId, postId } = useParams();
  const [postData, setPostData] = useState(null);
  const [post404, setPost404] = useState(false);

  useEffect(() => {
    const getPostData = async () => {
      try {
        setPostData(await ApiService.getPost(courseId, postId));
      } catch (error) {
        const status = error.response?.status;
        if (status === 404) {
          setPost404(true);
        }
      }
    };
    getPostData();
  }, [courseId,postId]);

  if (!postData) {
    return <article><h2>Loading post...</h2></article>;
  }
  if (post404) {
    return <article><h2>Post not found</h2></article>;
  }

  const { title, content, tags, student_reply, instructor_reply } = postData;

  return (
    <article className={feedStyles.postViewMain}>
      <div className={feedStyles.postViewContentContainer}> 
        <div className={feedStyles.postViewHeader}>
          <h2 className={feedStyles.viewTitle}>{title}</h2>
        </div>
        <div className={feedStyles.tags}>{tags.map(t => <Tag><span key={`tag-${t.id}`}>{t.name}</span> </Tag>)}</div>
        <div className={feedStyles.postContentContainer}><p>{content}</p></div>
        {student_reply ? <div><p>{student_reply}</p></div> : null}
        {instructor_reply ? <div style={feedStyles.instructorReplyContainer}><p>{instructor_reply}</p></div> : null}
        <form name="responseForm" >
          <label for="responseForm">
            <h3 className={feedStyles.responseFormTitle}>Add to the discussion:</h3>
          </label>
          <textarea name="responseFormText" id="responseForm" placeholder="Add to the discussion" className={feedStyles.responseForm}></textarea>
    
        </form>
      </div>
    </article>
  );
}
