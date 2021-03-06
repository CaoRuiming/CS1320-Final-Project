from django.urls import path
from django.http import HttpRequest, HttpResponse
from . import views

from api.views import UserView, CourseView, PostView, TagView, SearchView


def test(request: HttpRequest):
    """Test endpoint for debugging purposes"""
    return HttpResponse("Hello, world!")


urlpatterns = [
    path("test/", test),
    # User routes
    # Login logout routes handled by django
    path("csrf", UserView.csrf),
    path("login", UserView.login, name="login"),
    path("checkLogin", UserView.checkLogin),
    path("logout", UserView.logout),
    path("users/create", UserView.create, name="register"),
    path("users/<int:user_id>", UserView.as_view()),
    # Courses routes
    # path("courses/create", CourseView.join),
    path("courses/<int:course_id>/join", CourseView.join, name="join"),
    path("courses/<int:course_id>/leave", CourseView.leave, name="leave"),
    path("courses/<int:course_id>", CourseView.as_view()),
    path("courses", CourseView.get_active_courses, name="courses"),
    # Post routes
    path("courses/<int:course_id>/posts/create", PostView.create, name="create_post"),
    path(
        "courses/<int:course_id>/posts/<int:post_id>",
        PostView.as_view(),
        name="view_post",
    ),
    path("courses/<int:course_id>/posts", CourseView.get_posts),
    # Tag routes
    path("courses/<int:course_id>/tags/create", TagView.create, name="create_tag"),
    path("courses/<int:course_id>/tags/<int:tag_id>", TagView.as_view()),
    path("courses/<int:course_id>/tags", CourseView.get_tags),
    # # Search routes
    path("courses/<int:course_id>/search", SearchView.as_view()),
    # path("courses/<int:course_id>/search/users", SearchView.search)
]
