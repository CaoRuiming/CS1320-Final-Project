from django.test import TestCase, Client
from django.urls import reverse, resolve
from api import models
from django.conf import settings
from django.contrib.auth.models import User
from typing import Optional, Tuple, Union
from django.http import HttpRequest, HttpResponse
from django import db
from json import dumps, loads


# # Create your tests here.
class TestUserSettings(TestCase):

    def setUp(self):

        self.course = models.Course.objects.create(
            name = "testcourse1",
            active = True,
        )
        self.course.
        self.test_user_data = {
            'username' : 'TestUser',
            'password' : '12345',
            'first_name' : 'Test',
            'last_name' : 'User',
            'email' : 'TestUser',
        }
        self.c = Client()
        self.user = User.objects.create_user(username='TestUser', password='12345')
        self.registerClient = self.c.login(HttpRequest,username=self.test_user_data['username'], password=self.test_user_data['password'])
       
       # self.assertEqual(self.registerClient.status_code, 201)
        

    def testJoinCourse(self):
        response = self.registerClient.get(reverse('courses'))
        print(response.status_code )

    def testPrivatePost(self):
        response=self.client.post(self.login_url, dumps(self.test_user_data), content_type="application/json" )
        models.Post.objects.create_post(user=self.registerClient)
        print(response)

        

        

