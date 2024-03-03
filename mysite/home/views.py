from django.shortcuts import render
from django.http import HttpResponse
from .models import *

# Create your views here.

def index(request):
    students = Student.objects.all()
    return render(request,'index.html',{'students':students})

def about(request):
    return render(request,'about.html',{})
