from django.db import models

# Create your models here.

class LoginCredentials(models.Model):
    userName = models.CharField(max_length=30,primary_key=True)
    passwd = models.CharField(max_length=20, default="Atul")
    email = models.EmailField(default="    @gamil.com")

    def __str__(self):
        return self.userName