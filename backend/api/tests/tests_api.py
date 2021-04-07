from django.contrib.auth.models import AnonymousUser, User
from django.test import TestCase, Client

class APITestCase(TestCase):
    def setUp(self):
    
        c = Client()

    def test_post(self):
        self.c.force_login()
        response = self.c.get('courses/1/')
        self.assertEqual(response.status_code, 200)
