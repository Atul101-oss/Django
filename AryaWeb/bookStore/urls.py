from django.urls import path
from . import views

urlpatterns = [
    path('',views.browse, name='browse'),
    path('desc/<str:title>',views.book_description, name='book_description'),
]
