from json import loads, dumps
from django.http import HttpRequest, HttpResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.http import require_POST

from api.decorators import authenticated, handle_nonexistence
from api.services import PostService
from api.models import Course, Post, Tag


class PostView(View):
    """View class for a given post."""

    def permissioned(view):
        """
        View decorator that checks if a user has permission to access/edit the
        post specified in the url.
        """

        def decorated_view(
            request: HttpRequest, course_id: int, post_id: int, *args, **kwargs
        ):
            post = Post.objects.get(id=post_id)
            user = request.user
            is_student = user in post.course.students.all()
            is_instructor = user in post.course.instructors.all()

            # students and instructors can view and edit posts; more granular
            # permissions are handled in their respective view functions
            if request.method in ["GET", "PATCH"] and (is_student or is_instructor):
                return view(request, course_id, post_id, *args, **kwargs)

            # only instructors can delete a post
            if request.method == "DELETE" and is_instructor:
                return view(request, course_id, post_id, *args, **kwargs)
            return HttpResponse("Unauthorized", status=401)

        return decorated_view

    @method_decorator(permissioned)
    @method_decorator(handle_nonexistence)
    @method_decorator(authenticated)
    def get(self, request: HttpRequest, course_id: int, post_id: int) -> HttpResponse:
        """Return post data."""
        post = Post.objects.get(id=post_id)
        return HttpResponse(dumps(PostService.post_to_dict(post)))

    @method_decorator(permissioned)
    @method_decorator(handle_nonexistence)
    @method_decorator(authenticated)
    def patch(self, request: HttpRequest, course_id: int, post_id: int) -> HttpResponse:
        """Update post data."""
        post = Post.objects.get(id=post_id)
        user = request.user

        is_author = post.author == user
        is_instructor = user in post.course.instructors.all()
        updated_values = loads(request.body)

        # handle values that can be edited by any student/instructor
        student_updateable_keys = ["student_answer"]
        for key in student_updateable_keys:
            if key in updated_values:
                setattr(post, key, updated_values[key])
        if "tags" in updated_values:
            post.tags.clear()
            new_tags = Tag.objects.filter(id__in=updated_values["tags"])
            post.tags.add(*new_tags)

        # handle values that can be edited by the author and any instructor
        if is_author or is_instructor:
            author_updateable_keys = [
                "title",
                "content",
                "anonymous",
                "visibility",
                "type",
            ]
            for key in author_updateable_keys:
                if key in updated_values:
                    setattr(post, key, updated_values[key])

        # handle values that can only be edited by instructors
        if is_instructor:
            instructor_updateable_keys = ["instructor_answer"]
            for key in instructor_updateable_keys:
                if key in updated_values:
                    setattr(post, key, updated_values[key])

        post.save()
        return HttpResponse(dumps(PostService.post_to_dict(post)))

    @method_decorator(permissioned)
    @method_decorator(handle_nonexistence)
    @method_decorator(authenticated)
    def delete(
        self, request: HttpRequest, course_id: int, post_id: int
    ) -> HttpResponse:
        """Delete post data."""
        post = Post.objects.get(id=post_id)
        post.delete()
        return HttpResponse("Post successfully deleted")

    @require_POST
    @method_decorator(handle_nonexistence)
    def create(request: HttpRequest, course_id: int) -> HttpResponse:
        """Create a new post."""
        course = Course.objects.get(id=course_id)
        payload = loads(request.body)

        # create post with required fields
        new_post = Post(
            title=payload["title"],
            content=payload["content"],
            author=request.user,
            course=course,
        )

        # handle optional fields
        if payload.get("parent", False):
            parent_post = Post.objects.get(id=payload["parent"])
            new_post.parent = parent_post
        if payload.get("tags", False):
            tags = Tag.objects.filter(id__in=payload["tags"])
            new_post.tags.add(*tags)
        if payload.get("type", False):
            new_post.type = payload["type"]
        if payload.get("visibility", False):
            new_post.visibility = payload["visibility"]
        new_post.anonymous = payload.get("anonymous", False)

        # automatically add author as a follower
        new_post.followers.add(request.user)

        new_post.save()
        return HttpResponse(dumps(PostService.post_to_dict(new_post)))
