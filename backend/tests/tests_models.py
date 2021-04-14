from django.test import TestCase, Client
from django.urls import reverse, resolve
from api import models
from django.conf import settings
from django.contrib.auth.models import User
from typing import Optional, Tuple, Union
from django.http import HttpRequest, HttpResponse
from django import db
from json import dumps, loads
from django.contrib.sessions.middleware import SessionMiddleware
from api.views import PostView, UserView, CourseView


# # Create your tests here.
class TestUserSettings(TestCase):

	def setUp(self):

			self.course = models.Course.objects.create(
					name = "testcourse1",
					active = True,
			)
	
			self.test_user_data = {
					'username' : 'TestUser',
					'password' : '12345',
					'first_name' : 'Test',
					'last_name' : 'User',
					'email' : 'TestUser',
			}
			self.c = Client()
			user = User.objects.create_user(username='TestUser', password='12345')
			self.c.user = user
			self.registerClient = self.c.login(username=self.test_user_data['username'], password=self.test_user_data['password'])

			self.assertEqual(self.registerClient, True)
			
	def testJoinCourse(self):
			request = self.c.post('/courses/1/join', {'join_code' : ''}, content_type='application/json')
			# middleware = SessionMiddleware()
			# middleware.process_request(request)
			# request.session.save()
		#	request.user = self.user
		#	response = CourseView.join(request)
			print(request)
			#self.assertEqual(response.status_code, f"Course successfully joined" )

	def testPrivatePost(self):
			...
			#response=self.client.post('', dumps(self.test_user_data), content_type="application/json" )
			#models.Post.objects.create_post(user=self.registerClient)
			# print(response)