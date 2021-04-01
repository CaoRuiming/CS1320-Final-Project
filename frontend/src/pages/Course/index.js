import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import PostFeed from '../../components/PostFeed';
import PostView from '../../components/PostView';
import ApiService from '../../services/ApiService';
import useStateService from '../../services/StateService';
import styles from './courseStyles.module.css';

export default function Course() {
  const { courseId, postId } = useParams();
  const [course, setCourse] = useState(null);
  const [course404, setCourse404] = useState(false);
  const { state: { user } } = useStateService();

  useEffect(() => {
    const getCourse = async () => {
      try {
        setCourse(await ApiService.getCourse(courseId));
      } catch (error) {
        const status = error.response?.status;
        if (status === 404) {
          setCourse404(true);
        }
      }
    };
    getCourse();
  }, [courseId]);

  // if user is not logged in, redirect to home/login page
  if (!user) {
    return <Redirect to="/home" />;
  }

  if (course404) {
    return (
      <main><h2>Course not found!</h2></main>
    );
  }

  return (
    <main className={styles.main}>
      <section className={styles.leftSection}>
        <h2 className="sr-only">Course Posts</h2>
        <PostFeed />
      </section>
      <section className={styles.rightSection}>
        {postId ? <PostView /> : null}
      </section>
    </main>
  );
}