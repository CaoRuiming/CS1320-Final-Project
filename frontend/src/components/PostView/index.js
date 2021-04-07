import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { useParams } from 'react-router';
import ApiService from '../../services/ApiService';
import useStateService from '../../services/StateService';
import AnswerForm from '../forms/AnswerForm';
import { EditPostButton } from '../forms/PostForm';
import Tags from '../Tags';
import './style.scss';

export default function PostView() {
  const { courseId, postId } = useParams();
  const [postData, setPostData] = useState(null);
  const [post404, setPost404] = useState(false);
  const { state: { course, user } } = useStateService();

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

  useEffect(() => {
    getPostData();
  }, [courseId, postId]);

  if (!postData) {
    return <article><h2>Loading post...</h2></article>;
  }
  if (post404) {
    return <article><h2>Post not found</h2></article>;
  }

  const { title, content, tags, student_answer, instructor_answer } = postData;

  const isInstructor = !!(course?.instructors?.find(x => x.id === user.id));
  const Answer = function({label, content, instructor=false}) {
    const { actions: { setShowModal, setModalContent } } = useStateService();
    const handleClick = () => {
      setModalContent(
        <AnswerForm
          post={postData}
          instructor={instructor}
          onSubmit={getPostData}
        />
      );
      setShowModal(true);
    };
    return (
      <Fragment>
        <div className="flex-horizontal">
          <h3 className="reply-label">{label}</h3>
          {((isInstructor && instructor) || !instructor) ? (
            <button onClick={handleClick}>Edit</button>
          ) : null}
        </div>
        <div className="reply-container">
          <p>{content || '   '}</p>
        </div>
      </Fragment>
    );
  };

  return (
    <article id="postView">
      <h2 className="viewTitle">{title}</h2>
      <Tags tags={tags} />
      <EditPostButton post={postData} />
      <div className="postViewContent"><p>{content}</p></div>
      <Answer label="Instructor Answer" content={instructor_answer} instructor={true} />
      <Answer label="Student Answer" content={student_answer} />
    </article>
  );
}
