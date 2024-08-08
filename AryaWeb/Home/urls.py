from django.urls import path
from . import views

urlpatterns = [
    path('',views.Home, name='HomePage'),
    path('$<str:user>',views.Home, name='HomePageU'),
    path('cal01/',views.calc01, name='calc01'),
    path('sort01/',views.sort01, name='sort01'),
    path('gart01/',views.gart01, name='gart01'),

]
