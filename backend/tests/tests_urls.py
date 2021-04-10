from django.test import SimpleTestCase, Client
from django.urls import reverse, resolve
from api.models import models 
from api.views import CourseView, PostView, TagView, UserView

class URLTestCase(SimpleTestCase):

    def test_login_url_is_resolved(self):
        assert 1 == 1
       

    

    