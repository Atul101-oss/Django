import os
import json
from asgiref.sync import sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'AryaWeb.settings')
django.setup()
from . import models

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Accept the WebSocket connection
        print("server is connected.................")
        await self.accept()

    async def disconnect(self, close_code):
        # Handle the WebSocket disconnection
        print("Websocket disconnected")
        pass

    async def receive(self, text_data):
        # Echo back the received message
        message1=json.loads(text_data)
        print("Message received..........",text_data)
        await sync_to_async(models.message.objects.create)(message=message1)
        print("Meassage saved...........")       

        # Send the message back to WebSocket
        await self.send(text_data=(message1+"\n")*10)
        print("Meassge Sent.........")