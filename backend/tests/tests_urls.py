from django.test import TestCase, Client
from django.urls import reverse, resolve
from backend.api.models import models 

class URLTestCase(TestCase):

    def setUp(self):
        c = Client()

    def test_post(self):
        self.c.force_login()
        response = self.c.get('courses/1/')
        self.assertEqual(response.status_code, 200)

    

    