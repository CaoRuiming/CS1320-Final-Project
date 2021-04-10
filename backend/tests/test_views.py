from django.test import TestCase, Client
from django.urls import reverse
from api.models import Course,  Post, Tag 
import json

class TestViews(TestCase):
    ...