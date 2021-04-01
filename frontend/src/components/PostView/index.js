import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ApiService from '../../services/ApiService';

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
    <article>
      <h2>{title}</h2>
      <div>{tags.map(t => <span key={`tag-${t.id}`}>{t.name}</span>)}</div>
      <div><p>{content}</p></div>
      {student_reply ? <div><p>{student_reply}</p></div> : null}
      {instructor_reply ? <div><p>{instructor_reply}</p></div> : null}
    </article>
  );
}
