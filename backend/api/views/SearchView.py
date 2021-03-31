from json import loads, dumps
from django.http import HttpRequest, HttpResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.http import require_GET
from django.db.models import Q
from django.contrib.auth.models import User

from api.decorators import authenticated, handle_nonexistence
from api.services import PostService, TagService
from api.models import Course, Post, Tag


class SearchView(View):
    def permissioned(view):
        """
        View decorator that checks if a user has permission to access/edit the
        post specified in the url.
        """

        def decorated_view(request: HttpRequest, course_id: int, *args, **kwargs):
            course = Course.objects.get(id=course_id)
            user = request.user
            is_instructor = user in course.instructors.all()
            is_student = user in course.students.all()
            if is_instructor or is_student:
                return view(request, course_id, *args, **kwargs)

            return HttpResponse("Unauthorized", status=401)

        return decorated_view

    @method_decorator(permissioned)
    @method_decorator(handle_nonexistence)
    @method_decorator(authenticated)
    def post(self, request: HttpRequest, course_id: int) -> HttpResponse:
        """Post function for searching in courses"""
        payload = loads(request.body)
        result = []
        if payload.get("query", False):
            course = Course.objects.get(id=course_id)
            query_obj = Q(title__contains=payload["query"]) | Q(
                content=payload["query"]
            )
            search_results = course.posts.filter(query_obj).all()
            is_instructor = request.user in course.instructors.all()
    
            for post in search_results:
                if (
                    post.visibility == Post.Visibility.PUBLIC
                    or post.author == request.user
                    or request.user in post.course.instructors.all()
                ):
                    result.append(PostService.post_to_dict(post, is_instructor=is_instructor))

        return HttpResponse(dumps(result))

