from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse
from home.models import Student

# Create your views here.
def index(request):
    index_page = loader.get_template('index.html')
    return render(request,'index.html',{})

def student(request):
    studentList = Student.objects.all()
    # student_list=loader.get_template('student_list.html')
    return render(request,'student_list.html',{'list': studentList})