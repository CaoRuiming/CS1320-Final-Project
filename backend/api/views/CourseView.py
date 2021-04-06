from json import loads, dumps
from django.http import HttpRequest, HttpResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.http import require_POST, require_GET
from django.contrib.auth.models import User

from api.decorators import authenticated, handle_nonexistence
from api.services import CourseService, PostService, TagService
from api.models import Course, Post


class CourseView(View):
    """View class for a given course."""

    def permissioned(view):
        """
        View decorator that checks if a user has permission to access/edit the
        course specified in the url.
        """

        def decorated_view(request: HttpRequest, course_id: int, *args, **kwargs):
            course = Course.objects.get(id=course_id)
            user = request.user
            is_student = user in course.students.all()
            is_instructor = user in course.instructors.all()

            # allow all students and instructors associated with course to view
            if request.method == "GET" and (is_student or is_instructor):
                return view(request, course_id, *args, **kwargs)

            # only a course's instructors can create, update, or delete a course
            if request.method != "GET" and is_instructor:
                return view(request, course_id, *args, **kwargs)
            return HttpResponse("Unauthorized", status=401)

        return decorated_view

    @method_decorator(permissioned)
    @method_decorator(handle_nonexistence)
    @method_decorator(authenticated)
    def get(self, request: HttpRequest, course_id: int) -> HttpResponse:
        """Return course data."""
        course = Course.objects.get(id=course_id)
        return HttpResponse(dumps(CourseService.course_to_dict(course)))

    @method_decorator(permissioned)
    @method_decorator(handle_nonexistence)
    @method_decorator(authenticated)
    def patch(self, request: HttpRequest, course_id: int) -> HttpResponse:
        """Update course data."""
        course = Course.objects.get(id=course_id)
        updated_values = loads(request.body)

        # update the keys that we can directly update
        updateable_keys = ["name", "join_code", "active"]
        for key in updateable_keys:
            if key in updated_values:
                setattr(course, key, updated_values[key])

        # add instructors, if specified
        if "add_instructors" in updated_values:
            new_instructors = User.objects.filter(
                id__in=updated_values["add_instructors"]
            )
            course.instructors.add(*new_instructors)

        # remove instructors, if specified
        if "remove_instructors" in updated_values:
            ex_instructors = course.instructors.filter(
                id__in=updated_values["remove_instructors"]
            )
            course.instructors.remove(*ex_instructors)

        course.save()
        return HttpResponse(dumps(CourseService.course_to_dict(course)))

    @method_decorator(permissioned)
    @method_decorator(handle_nonexistence)
    @method_decorator(authenticated)
    def delete(self, request: HttpRequest, course_id: int) -> HttpResponse:
        """Delete course data."""
        course = Course.objects.get(id=course_id)
        course.delete()
        return HttpResponse("Course successfully deleted")

    @require_POST
    @handle_nonexistence
    @authenticated
    def join(request: HttpRequest, course_id: int) -> HttpResponse:
        """Add request's user to course as a student."""
        course = Course.objects.get(id=course_id)
        user = request.user
        if loads(request.body)["join_code"] == course.join_code:
            course.students.add(user)
            return HttpResponse(f"Course successfully joined")
        return HttpResponse(f"Incorrect course join code", status=406)

    @require_POST
    @method_decorator(handle_nonexistence)
    @method_decorator(authenticated)
    def leave(request: HttpRequest, course_id: int) -> HttpResponse:
        """Remove request's user from course's student list."""
        course = Course.objects.get(id=course_id)
        user = request.user
        course.students.remove(user)
        return HttpResponse("Unenrollment successful")

    @require_GET
    @handle_nonexistence
    @authenticated
    def get_posts(request: HttpRequest, course_id: int) -> HttpResponse:
        """Get all posts under course."""
        course = Course.objects.get(id=course_id)
        user = request.user

        # get a list of all posts that user has access to
        posts = []
        for post in course.posts.all():
            if (
                post.visibility == Post.Visibility.PUBLIC
                or post.author == user
                or user in course.instructors.all()
            ):
                posts.append(PostService.post_to_dict(post))
        return HttpResponse(dumps(posts))

    @require_GET
    @handle_nonexistence
    @authenticated
    def get_tags(request: HttpRequest, course_id: int) -> HttpResponse:
        """Get all tags under course."""
        course = Course.objects.get(id=course_id)
        tags = [TagService.tag_to_dict(x) for x in course.tags.all()]
        return HttpResponse(dumps(tags))

    @require_GET
    @handle_nonexistence
    @authenticated
    def get_active_courses(request: HttpRequest) -> HttpResponse:
        """Get all tags under course."""
        user = request.user
        courses = Course.objects.filter(active=True).all()
        result = []
        for course in courses:
            if (
                not user in course.students.all()
                and not user in course.instructors.all()
            ):
                result.append(CourseService.course_to_dict(course))
        return HttpResponse(dumps(result))
