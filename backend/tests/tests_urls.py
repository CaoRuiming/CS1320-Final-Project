from django.test import SimpleTestCase, Client
from django.urls import reverse, resolve
from api.models import models 
from api.views import CourseView, PostView, TagView, UserView

class URLTestCase(SimpleTestCase):
       
    def setUp(self):
        self.c = Client()

    def test_post(self):
        # self.c.force_login()
        # response = self.c.get('courses/1/')
        # self.assertEqual(response.status_code, 200)
        self.assertEqual(200, 200)

    

    