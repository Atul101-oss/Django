from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from . import models
# Create your views here.

def browse(request):
    books = models.Books.objects.all()
    context = {'books':books}
    return render(request, 'books/browse.html', context)

def book_description(request,title):
    desc = get_object_or_404(models.Books, title=title)
    return HttpResponse(desc.description)