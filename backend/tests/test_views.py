from django.test import TestCase, Client, RequestFactory
from django.urls import reverse
from api.views import PostView, UserView

import json


class PostViewTest(TestCase):
    def setUp(self):
        self.c = Client()
        self.factory = RequestFactory()
        

    def setup_view(view, request, *args, **kwargs):
        
        view.request = request
        response = PostView(request,  UserView() , **kwargs)
        view.args = args
        view.kwargs = kwargs
        return view


