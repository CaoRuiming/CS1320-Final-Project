from django.test import TestCase, Client, RequestFactory
from django.contrib.auth.models import User
from django.urls import reverse
from django.contrib.sessions.middleware import SessionMiddleware
from api.views import PostView, UserView, CourseView
import json


class CourseViewTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(username='TestUser', password='12345', first_name='Test', last_name='User', email='testuser@gmail.com')
        
        self.user.save()
        self.view = CourseView.as_view()
        self.factory = RequestFactory()
        test_user_data = {
            'username' : 'TestUser',
            'password' : '12345',
            'first_name' : 'Test',
            'last_name' : 'User',
            'email' : 'TestUser',
        }
        request = self.factory.post(reverse('register'), json.dumps(test_user_data), content_type="application/json")
        response = UserView.as_view()(request)
        
        
    
    def testJoin(self):
        request = self.factory.post('courses/1/join')
        middleware = SessionMiddleware()
        middleware.process_request(request)
        request.session.save()
        request.user = self.user
        response = CourseView.as_view()(request)
        self.assertEqual(response.content, '')



class PostViewTest(TestCase):
    def setUp(self):
        self.user = User.objects.get(username='TestUser',)
        self.view = PostView.as_view()
        self.factory = RequestFactory()
        

