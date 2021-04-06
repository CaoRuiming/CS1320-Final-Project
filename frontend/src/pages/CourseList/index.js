import React from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import useStateService from '../../services/StateService';
import { JoinCourseButton } from '../../components/forms/JoinCourseForm';
import './style.scss';

export default function CourseList() {
  const { state: { user } } = useStateService();

  if (!user) {
    return <Redirect to="/home" />;
  }

  const studentCourses = user.student_courses.map(course => {
    return (
      <li key={`course=${course.id}`}>
        <Link to={`/courses/${course.id}`}>{course.name}</Link>
      </li>
    );
  });
  const instructorCourses = user.instructor_courses.map(course => {
    return (
      <li key={`course=${course.id}`}>
        <Link to={`/courses/${course.id}`}>{course.name}</Link>
      </li>
    );
  });

  return (
    <main id="courses-page">
      <JoinCourseButton />
      <h2>Enrolled Courses</h2>
      {studentCourses.length ? <h3>Student Courses</h3> : null}
      {studentCourses.length ? <ul>{studentCourses}</ul> : null}
      {instructorCourses.length ? <h3>Instructor Courses</h3> : null}
      {instructorCourses.length ? <ul>{instructorCourses}</ul> : null}
    </main>
  );
}