from django.test import TestCase
from django.urls import reverse
from api.views import UserView
import json

class BaseTest(TestCase):

    def setUp(self):
        self.register_url = reverse('register')
        self.login_url = reverse('login')
        self.invalid_credentials =  {'username' : 'gido', 'password' : '000000', 'email' : 'gido@theshore.org', 'first_name' : 'test', 'last_name' : 'user' }
        self.valid_credentials_ta= {
            'username' : 'josiah_carberry@brown.edu' , 'password' : ''
        }
        self.valid_credentials_student= {
            'username' : 'josiah_carberry@brown.edu' , 'password' : ''
        }
        return super().setUp()

class UserTest(BaseTest):
    def test_register_user(self):
        
        response=self.client.post(self.register_url, json.dumps(self.invalid_credentials), content_type="application/json")
        self.assertEqual(response.status_code, 201)
       # self.assertTemplateUsed(response, UserView.create_user )

   
        # response=self.client.post(self.login_url, json.dumps(self.invalid_credentials), content_type="application/json" )
        # self.assertEqual(response.status_code, 406)
#test should fail for invalid login
class LoginTest(BaseTest):
    def test_can_access_login(self):
        response = self.client.get(self.login_url)
        self.assertEqual(response.status_code, 405)

    def test_login_user(self):
        response=self.client.post(self.login_url, json.dumps(self.invalid_credentials), content_type="application/json" )
        self.assertEqual(response.status_code, 406)


