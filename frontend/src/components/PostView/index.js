import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ApiService from '../../services/ApiService';
import PostForm, { EditPostButton } from '../forms/PostForm';
import Tags from '../Tags';
import './style.scss';

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
  }, [courseId, postId]);

  if (!postData) {
    return <article><h2>Loading post...</h2></article>;
  }
  if (post404) {
    return <article><h2>Post not found</h2></article>;
  }

  const { title, content, tags, student_answer, instructor_answer } = postData;

  return (
    <article id="postView">
      <h2 className="viewTitle">{title}</h2>
      <Tags tags={tags} />
      <EditPostButton post={postData} />
      <div className="postViewContent"><p>{content}</p></div>
      {student_answer ? <div><p>{student_answer}</p></div> : null}
      {instructor_answer ? <div className="instructorReplyContainer"><p>{instructor_answer}</p></div> : null}
      <PostForm post={postData} response={true} />
    </article>
  );
}
