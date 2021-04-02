export const mockUser = {
  "id": 1,
  "username": "josiah_carberry@brown.edu",
  "first_name": "Josiah",
  "last_name": "Carberry",
  "email": "josiah_carberry@brown.edu",
  "student_courses": [],
  "instructor_courses": [
    {
      "id": 1,
      "name": "Course 1",
      "active": true
    }
  ]
};

export const mockCourse = {"id": 1, "name": "Course 1", "active": true, "join_code": "", "students": [{"id": 2, "first_name": "", "last_name": "", "email": "blueno@brown.edu"}, {"id": 3, "first_name": "", "last_name": "", "email": "random@brown.edu"}], "instructors": [{"id": 1, "first_name": "", "last_name": "", "email": "josiah_carberry@brown.edu"}]};
export const mockCoursePosts = [{"id": 1, "title": "I have a question", "content": "idk what im doing", "instructor_answer": "Don't worry! I think we can solve this together", "student_answer": "There's something else I don't quite understand...", "anonymous": true, "type": 1, "visibility": 1, "tags": [{"id": 1, "name": "Tag 1"}, {"id": 2, "name": "Tag 2"}], "author": {"id": 1, "first_name": "Anonymous", "last_name": "User", "email": ""}, "parent": null, "children": [], "course": {"id": 1, "name": "Course 1", "active": true}, "created_at": "2021-03-30 22:56:49.176873+00:00", "updated_at": "2021-03-30 22:56:49.176897+00:00"}, {"id": 2, "title": "I have a question", "content": "idk what im doing", "instructor_answer": "", "student_answer": "", "anonymous": false, "type": 0, "visibility": 0, "tags": [{"id": 2, "name": "Tag 2"}], "author": {"id": 1, "first_name": "", "last_name": "", "email": "josiah_carberry@brown.edu"}, "parent": null, "children": [], "course": {"id": 1, "name": "Course 1", "active": true}, "created_at": "2021-03-30 22:56:49.178550+00:00", "updated_at": "2021-03-30 22:56:49.178572+00:00"}];
export const mockPost = {"id": 1, "title": "I have a question", "content": "idk what im doing", "instructor_answer": "Don't worry! I think we can solve this together", "student_answer": "This article was really helpful in understanding this!", "anonymous": true, "type": 1, "visibility": 1, "tags": [{"id": 1, "name": "Tag 1"}, {"id": 2, "name": "Tag 2"}], "author": {"id": 1, "first_name": "Anonymous", "last_name": "User", "email": ""}, "parent": null, "children": [], "course": {"id": 1, "name": "Course 1", "active": true}, "created_at": "2021-03-30 22:56:49.176873+00:00", "updated_at": "2021-03-30 22:56:49.176897+00:00"};
export const mockCourseTags = [{"id": 1, "name": "Tag 1"}, {"id": 2, "name": "Tag 2"}];
export const mockTag = {"id": 1, "name": "Tag 1"};