import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import PostFeed from '../components/PostFeed';
import ApiService from '../services/ApiService';

export default function Course() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [course404, setCourse404] = useState(false);

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
  }, []);

  if (course404) {
    return (
      <main><h1>Course not found!</h1></main>
    );
  }

  return (
    <main>
      <PostFeed courseId={courseId} />
    </main>
  );
}