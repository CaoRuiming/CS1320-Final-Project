from django.urls import path
from . import views

urlpatterns = [
  path('test/', views.test),

  #User routes
  #Login logout routes handled by django 
   
  # path('login/$', views.login),
  # path('logout/$', views.logout),
  path('users/<user_id>', views.users),

  #Courses routes
  path('courses/', views.getCourse), #Handle different case in view func

  path('courses/<course_id>/join',views.joinCourse), #Handle different case in view func
 
  #Post routes
  path('courses/<course_id>/posts', views.post), 
  path('courses/<course_id>/posts/<post_id>',views.getPost),

  #Search routes
  path('courses/<course_id>/search', views.search )

]