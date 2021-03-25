from json import loads
from typing import Optional, Tuple
from django.http import HttpRequest
from django.utils.crypto import get_random_string
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from backend.api.models import Course, Post, Tag


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


class TagService:
    """Class that bundles convenience functions for tags."""

    def __init__(self, user: User, tag_id: int) -> None:
        self.user = user
        self.tag = Tag.objects.get(id=tag_id)
