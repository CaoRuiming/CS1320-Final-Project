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
        <div className="single-course">
          <Link to={`/courses/${course.id}`} className="course-name">{course.name}</Link>
        </div>
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
      <div id="courses-list">
        <div id="enrolled-courses">
          <h2 >Enrolled Courses</h2>
        </div>
        <div className="sub-courses">
          {studentCourses.length ? <h3>Student Courses</h3> : null}
          {studentCourses.length ? <ul className="sub-courses-list"><div>{studentCourses}</div></ul> : null}
        </div>
        {instructorCourses.length ? <h3>Instructor Courses</h3> : null}
        {instructorCourses.length ? <ul className="sub-courses-list"><div className="single-course">{instructorCourses}</div></ul> : null}
      </div>
      <JoinCourseButton />
    </main>
  );
}