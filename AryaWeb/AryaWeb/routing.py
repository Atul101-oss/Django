# AryaWeb/routing.py

from django.urls import path
from chatapp import consumers

websocket_urlpatterns = [
    path('ws/', consumers.ChatConsumer.as_asgi()),
]
