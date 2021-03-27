from json import loads, dumps
from django.http import HttpRequest, HttpResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.http import require_POST

from api.decorators import authenticated, handle_nonexistence
from api.services import TagService
from api.models import Course, Tag


class TagView(View):
    """View class for a given tag."""

    def permissioned(view):
        """
        View decorator that checks if a user has permission to access/edit the
        post specified in the url.
        """

        def decorated_view(
            request: HttpRequest, course_id: int, tag_id: int, *args, **kwargs
        ):
            tag = Tag.objects.get(id=tag_id)
            user = request.user
            is_student = user in tag.course.students.all()
            is_instructor = user in tag.course.instructors.all()

            # any enrolled student or instructor can view tags
            if request.method == "GET" and (is_student or is_instructor):
                return view(request, course_id, tag_id, *args, **kwargs)
            
            # only instructors can update or delete tags
            if request.method in ["PATCH", "DELETE"] and is_instructor:
                return view(request, course_id, tag_id, *args, **kwargs)

            return HttpResponse("Unauthorized", status=401)

        return decorated_view

    @method_decorator(permissioned)
    @method_decorator(handle_nonexistence)
    @method_decorator(authenticated)
    def get(self, request: HttpRequest, course_id: int, tag_id: int) -> HttpResponse:
        """Return tag data."""
        tag = Tag.objects.get(id=tag_id)
        return HttpResponse(dumps(TagService.tag_to_dict(tag)))

    @method_decorator(permissioned)
    @method_decorator(handle_nonexistence)
    @method_decorator(authenticated)
    def patch(self, request: HttpRequest, course_id: int, tag_id: int) -> HttpResponse:
        """Update tag data."""
        tag = Tag.objects.get(id=tag_id)
        payload = loads(request.body)
        if payload.get("name", False):
            tag.name = payload["name"]
            tag.save()
        return HttpResponse(dumps(TagService.tag_to_dict(tag)))

    @method_decorator(permissioned)
    @method_decorator(handle_nonexistence)
    @method_decorator(authenticated)
    def delete(self, request: HttpRequest, course_id: int, tag_id: int) -> HttpResponse:
        """Delete tag data."""
        tag = Tag.objects.get(id=tag_id)
        tag.delete()
        return HttpResponse("Tag successfully deleted")

    @require_POST
    @method_decorator(handle_nonexistence)
    def create(request: HttpRequest, course_id: int) -> HttpResponse:
        """Create a new tag."""
        course = Course.objects.get(id=course_id)
        payload = loads(request.body)
        new_tag = Tag(name=payload["name"], course=course)
        new_tag.save()
        return HttpResponse(dumps(TagService.tag_to_dict(new_tag)))
