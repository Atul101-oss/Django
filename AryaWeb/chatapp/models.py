from django.db import models

# Create your models here.
class message(models.Model):
    message = models.TextField(null=True, blank=True)
