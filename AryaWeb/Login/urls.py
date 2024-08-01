from django.urls import path,include
from . import views

urlpatterns = [
    path('', views.LoginPage, name='loginPage'),
    path('newUser', views.newUser, name="newUser"),
    path('passwdRecover', views.passwdRecover,name='passwdRecover'),
]   