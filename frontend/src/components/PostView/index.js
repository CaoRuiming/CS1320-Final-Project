import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { useParams } from 'react-router';
import moment from 'moment';
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
  const {
    state: { course, user }, actions: { refreshPosts }
  } = useStateService();

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
    refreshPosts(courseId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, postId]);

  if (!postData) {
    return <article><h2>Loading post...</h2></article>;
  }
  if (post404) {
    return <article><h2>Post not found</h2></article>;
  }

  const {
    title,
    content,
    tags,
    student_answer,
    student_answer_author,
    instructor_answer,
    instructor_answer_author,
    created_at
  } = postData;

  const isInstructor = !!(course?.instructors?.find(x => x.id === user.id));
  const Answer = function({label, author='', content, instructor=false}) {
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
          <h3 className="reply-label">{label}{author ? ` by ${author}` : ''}</h3>
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

  const hasEditPermission = isInstructor || postData.author.id === user.id;

  return (
    <article id="postView">
      <div className="flex-horizontal">
        <h2 className="viewTitle">{title}</h2>
        <time>{moment(created_at).format('LLL')}</time>
      </div>
      <Tags tags={tags} />
      {hasEditPermission ? (
        <EditPostButton post={postData} onSubmit={getPostData} style={{margin:"0", padding:"0"}}/>
      ) : null}
      <div className="postViewContent"><p>{content}</p></div>
      <Answer
        label="Instructor Answer"
        author={instructor_answer_author?.name}
        content={instructor_answer}
        instructor={true}
      />
      <Answer
        label="Student Answer"
        author={student_answer_author?.name}
        content={student_answer}
      />
    </article>
  );
}
