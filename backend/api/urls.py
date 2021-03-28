from django.urls import path
from django.http import HttpRequest, HttpResponse
from . import views

from api.views import UserView, CourseView, PostView, TagView


def test(request: HttpRequest):
    """Test endpoint for debugging purposes"""
    return HttpResponse("Hello, world!")


urlpatterns = [
    path("test/", test),
    # User routes
    # Login logout routes handled by django
    path("csrf", UserView.csrf),
    path("login", UserView.login),
    # path('logout/$', views.logout),
    path("users/create", UserView.create),
    path("users/<int:user_id>", UserView.as_view()),
    # Courses routes
    # path("courses/create", CourseView.join),
    path("courses/<int:course_id>/join", CourseView.join),
    path("courses/<int:course_id>/leave", CourseView.leave),
    path("courses/<int:course_id>", CourseView.as_view()),
    # Post routes
    path("courses/<int:course_id>/posts/create", PostView.create),
    path("courses/<int:course_id>/posts/<int:post_id>", PostView.as_view()),
    path("courses/<int:course_id>/posts", CourseView.get_posts),
    # Tag routes
    path("courses/<int:course_id>/tags/create", TagView.create),
    path("courses/<int:course_id>/tags/<int:tag_id>", TagView.as_view()),
    path("courses/<int:course_id>/tags", CourseView.get_tags),
    # # Search routes
    # path("courses/<int:course_id>/search", views.search),
]
