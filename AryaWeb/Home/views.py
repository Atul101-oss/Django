from django.shortcuts import HttpResponse, render,redirect
from django.urls import reverse
from . import models

app_name = 'home'

# Create your views here.
def Home(request,user="anynomus"):
    games = models.games.objects.all()
    context = {'games':games,'user':user}
    return render(request, 'Home/HomePage.html', context)


def calc01(request):
    return render(request, 'Home/CalcView.html')

def sort01(request):
    return render(request, 'Home/sorting.html')

def gart01(request):
    return render(request, 'Home/gart.html')