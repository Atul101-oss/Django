from django.db import models

# Create your models here.

class Student(models.Model):
    Fname = models.CharField(max_length=50)
    Lname = models.CharField(max_length=50)
    RollNo = models.CharField(max_length=10)
    Course = models.CharField(max_length=100)
    Semister = models.IntegerField()