from json import loads
from typing import Optional, Tuple, Union, Dict, Any
from django.http import HttpRequest
from django.utils.crypto import get_random_string
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from api.models import Course, Post, Tag


class UserService:
    """Class that bundles convenience functions for users."""

    def __init__(self, user_id: int) -> None:
        self.user = User.objects.get(id=user_id)

    @staticmethod
    def _get_credentials_from_request(request: HttpRequest) -> Tuple[str, str]:
        json_payload = loads(request.body)
        return json_payload["username"], json_payload["password"]

    @staticmethod
    def create_user(username: str, password: str, **kwargs) -> User:
        """Creates and returns a new User model."""
        return User.objects.create_user(username, password=password, **kwargs)

    @staticmethod
    def generate_password(length: int = 8):
        """Returns a randomly generated password."""
        return get_random_string(length, "abcdefghijklmnopqrstuvwxyz0123456789")

    @staticmethod
    def user_to_dict(user: User) -> Dict[str, Any]:
        """Converts a user model into a Dict for the API to return."""

        def course_to_dict(c: Course) -> Dict[str, Union[int, str]]:
            return {
                "id": c.id,
                "name": c.name,
                "active": c.active,
            }

        result: Dict[str, Any] = {
            "id": user.id,
            "username": user.username,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "student_courses": [course_to_dict(x) for x in user.student_courses.all()],
            "instructor_courses": [
                course_to_dict(x) for x in user.instructor_courses.all()
            ],
        }
        return result

    @staticmethod
    def login(
        request: HttpRequest,
        username: Optional[str] = None,
        password: Optional[str] = None,
    ) -> Optional[User]:
        """
        Authenticates login credentials for a user and associates that user to
        the current session.
        """
        if username == None or password == None:
            username, password = UserService._get_credentials_from_request(request)
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return user
        else:
            return None

    @staticmethod
    def logout(request: HttpRequest) -> None:
        """Logs out user from current session."""
        logout(request)


class CourseService:
    """Class that bundles convenience functions for courses."""

    def __init__(self, user: User, course_id: int) -> None:
        self.user = user
        self.course = Course.objects.get(id=course_id)

    @staticmethod
    def course_to_dict(course: Course) -> Dict[str, Any]:
        """Converts a course model into a Dict for the API to return."""

        def user_to_dict(u: User) -> Dict[str, Union[int, str]]:
            return {
                "id": u.id,
                "first_name": u.first_name,
                "last_name": u.last_name,
                "email": u.email,
            }

        result: Dict[str, Any] = {
            "id": course.id,
            "name": course.name,
            "active": course.active,
            "join_code": course.join_code,
            "students": [user_to_dict(x) for x in course.students.all()],
            "instructors": [user_to_dict(x) for x in course.instructors.all()],
        }
        return result

    def set_join_code(self, join_code: Optional[str] = None) -> None:
        """
        Assigns a new join code to course. If no code is provided, a new one is
        generated automatically.
        """
        if join_code == None:
            join_code = get_random_string(8, "abcdefghijklmnopqrstuvwxyz0123456789")
        self.course.join_code = join_code
        self.course.save()


class PostService:
    """Class that bundles convenience functions for posts."""

    def __init__(self, user: User, post_id: int) -> None:
        self.user = user
        self.post = Post.objects.get(id=post_id)

    @staticmethod
    def post_to_dict(post: Post, is_instructor: bool = False) -> Dict[str, Any]:
        """Converts a post model into a Dict for the API to return."""

        def user_to_dict(u: User, anon: bool = False) -> Optional[Dict]:
            if not u:
                return None
            hide_user = anon and not is_instructor
            dictionary = {
                "id": u.id,
                "first_name": "Anonymous" if hide_user else u.first_name,
                "last_name": "User" if hide_user else u.last_name,
                "email": "" if hide_user else u.email,
            }
            dictionary["name"] = f"{dictionary['first_name']} {dictionary['last_name']}"
            return dictionary

        def course_to_dict(c: Course) -> Dict[str, Union[int, str]]:
            return {
                "id": c.id,
                "name": c.name,
                "active": c.active,
            }

        def tag_to_dict(t: Tag) -> Dict[str, Union[int, str]]:
            return {
                "id": t.id,
                "name": t.name,
            }

        result: Dict[str, Any] = {
            "id": post.id,
            "title": post.title,
            "content": post.content,
            "instructor_answer": post.instructor_answer,
            "instructor_answer_author": user_to_dict(post.instructor_answer_author),
            "student_answer": post.student_answer,
            "student_answer_author": user_to_dict(post.student_answer_author),
            "anonymous": post.anonymous,
            "type": post.type,
            "visibility": post.visibility,
            "tags": [tag_to_dict(x) for x in post.tags.all()],
            "author": user_to_dict(post.author, post.anonymous),
            "parent": PostService.post_to_dict(post.parent) if post.parent else None,
            "children": [PostService.post_to_dict(x) for x in post.child_posts.all()],
            "course": course_to_dict(post.course),
            "created_at": str(post.created_at),
            "updated_at": str(post.updated_at),
        }
        return result


class TagService:
    """Class that bundles convenience functions for tags."""

    def __init__(self, user: User, tag_id: int) -> None:
        self.user = user
        self.tag = Tag.objects.get(id=tag_id)

    @staticmethod
    def tag_to_dict(tag: Tag) -> Dict[str, Union[str, int]]:
        """Converts a tag model into a Dict for the API to return."""

        result: Dict[str, Union[str, int]] = {
            "id": tag.id,
            "name": tag.name,
        }
        return result
