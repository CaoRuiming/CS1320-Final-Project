from django.http import HttpRequest, HttpResponse

<<<<<<< HEAD
import json


def test(request: HttpRequest):
  return HttpResponse("Hello, world!")

def users(request: HttpRequest):
  return HttpResponse("Hope" + request.params)

def getCourse(request: HttpRequest):
  if request.method == "GET":
    #Get list of courses
    return HttpResponse("List of courses")
    pass
  elif request.method == "POST":
    #Patch, Create new course
    pass

def joinCourse(request: HttpRequest, response: HttpResponse):
  pass

def post(request: HttpRequest, response : HttpResponse):
  if request.method == "GET":
    return HttpResponse("Post made")
    
  elif request.method == "POST":
    pass


def getPost(request: HttpRequest):
  return HttpResponse("Grabbed post:" + request.params)
  pass

def search(request: HttpRequest, response : HttpResponse):
  pass
=======

def test(request: HttpRequest):
    return HttpResponse("Hello, world!")
>>>>>>> dd0af6184fc6c40f5d027bc68eaac087f6f3f06e
