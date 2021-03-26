from json import loads, dumps
from django.http import HttpRequest, HttpResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.http import require_POST
from django.contrib.auth.models import User

from api.decorators import authenticated, handle_nonexistence
from api.services import UserService


class UserView(View):
    """View class for a given user."""

    def permissioned(view):
        """
        View decorator that checks if a user has permission to access/edit the
        user specified in the url.
        """

        def decorated_view(request: HttpRequest, user_id: int, *args, **kwargs):
            if request.user.id != user_id:
                return HttpResponse(f"Unauthorized", status=401)
            return view(request, user_id, *args, **kwargs)

        return decorated_view

    @method_decorator(permissioned)
    @method_decorator(handle_nonexistence)
    @method_decorator(authenticated)
    def get(self, request: HttpRequest, user_id: int) -> HttpResponse:
        """Return user data."""
        user = User.objects.get(id=user_id)
        return HttpResponse(dumps(UserService.user_to_dict(user)))

    @method_decorator(permissioned)
    @method_decorator(handle_nonexistence)
    @method_decorator(authenticated)
    def patch(self, request: HttpRequest, user_id: int) -> HttpResponse:
        """Update user data."""
        user = User.objects.get(id=user_id)
        updated_values = loads(request.body)
        updateable_keys = ["username", "first_name", "last_name", "email"]
        for key in updateable_keys:
            if key in updated_values:
                setattr(user, key, updated_values[key])
        user.save()
        return HttpResponse(dumps(UserService.user_to_dict(user)))

    @method_decorator(permissioned)
    @method_decorator(handle_nonexistence)
    @method_decorator(authenticated)
    def delete(self, request: HttpRequest, user_id: int) -> HttpResponse:
        """Delete user data."""
        user = User.objects.get(id=user_id)
        user.delete()
        return HttpResponse("User successfully deleted")

    @method_decorator(require_POST)
    @method_decorator(handle_nonexistence)
    def create(request: HttpRequest) -> HttpResponse:
        """Create a new user."""
        payload = loads(request.body)
        new_user = UserService.create_user(
            username=payload["username"], password=payload["password"]
        )
        if payload["email"]:
            new_user.email = payload["email"]
        new_user.save()
        return HttpResponse(f"User successfully created")

    @method_decorator(require_POST)
    @method_decorator(handle_nonexistence)
    def login(request: HttpRequest) -> HttpResponse:
        user = UserService.login(request)
        if user:
            return HttpResponse("logged in")
        else:
            return HttpResponse("login failed")
