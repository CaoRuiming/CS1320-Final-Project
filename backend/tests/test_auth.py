from django.test import TestCase
from django.urls import reverse
import json

class BaseTest(TestCase):

    def setUp(self):
        self.register_url = reverse('register')
        self.login_url = reverse('login')
        self.invalid_credentials =  {'username' : 'testuser1', 'password' : '1234', 'email' : 'test@email.org', 'first_name' : 'test', 'last_name' : 'user' }
        self.test_credentails =  {'username' : 'gido1', 'password' : '000000', 'email' : 'gido@theshore.org', 'first_name' : 'test', 'last_name' : 'user' }
        self.valid_credentials_ta= {
            'username' : 'josiah_carberry@brown.edu' , 'password' : 'mwjt73xw'
        }
        self.valid_credentials_student= {
            'username' : 'random@brown.edu' , 'password' : 'p1j448x8'
        }

        self.client.post(self.register_url, json.dumps(self.test_credentails), content_type="application/json")
        
        return super().setUp()

class CreateUserTest(BaseTest):
    def test_register_user(self):
        
        registerCred =  {'username' : 'registered', 'password' : '000000', 'email' : 'fake@email.org', 'first_name' : 'test', 'last_name' : 'register' }
        response=self.client.post(self.register_url, json.dumps(registerCred), content_type="application/json")
        self.assertEqual(response.status_code, 201)
      

class LoginTest(BaseTest):
    def test_can_access_login(self):
        response = self.client.get(reverse('login'))
        self.assertEqual(response.status_code, 405)

        response = self.client.get(reverse('home'))
        self.assertEqual(response.status_code, 201)


    def test_login_user(self):
        response=self.client.post(self.login_url, json.dumps(self.invalid_credentials), content_type="application/json" )
        self.assertEqual(response.status_code, 406)

        response = self.client.post(self.login_url, json.dumps(self.test_credentails), content_type="application/json")
        self.assertEqual(response.status_code, 201)
