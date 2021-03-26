from django.http import HttpRequest, HttpResponse
from django.core.exceptions import ObjectDoesNotExist


def authenticated(view):
    """
    View decorator that checks if the request's user is authenticated. Returns
    401 HttpResponse if user is not authenticated.
    """

    def decorated_view(request: HttpRequest, *args, **kwargs):
        if not request.user.is_authenticated:
            return HttpResponse("Unauthorized", status=401)
        return view(request, *args, **kwargs)

    return decorated_view


def handle_nonexistence(view):
    """
    View decorator that catches ObjectDoesNotExist exceptions and returns a 404
    HttpResponse.
    """

    def decorated_view(*args, **kwargs):
        try:
            result = view(*args, **kwargs)
        except ObjectDoesNotExist:
            return HttpResponse("Object not found", status=404)
        return result

    return decorated_view
