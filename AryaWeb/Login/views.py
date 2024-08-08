from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.urls import reverse
from . import models
from . import forms

# Create your views here.

def LoginPage(request):
    error_message = None
    form = None
    if request.method == 'POST':
        print("enter in postt")
        userName = request.POST.get('userName')
        passwd = request.POST.get('passwd')
        try:
            user = models.LoginCredentials.objects.get(userName=userName)
            if user.passwd != passwd:
                error_message = "Entered password is wrong"
            else:
                return redirect(reverse('home:HomePageU', args=[user.userName]))
        except models.LoginCredentials.DoesNotExist:
            error_message = "user Doesn't Exists\nCreate new one"

    context = {'loginFields': forms.LoginCredentials, 'error_message': error_message}
    return render(request, 'Login/LoginPage.html', context)




def newUser(request):
    error_message = None
    if request.method == 'POST':
        userName = request.POST.get('userName')
        passwd = request.POST.get('passwd')
        email = request.POST.get('email')
        
        if  models.LoginCredentials.objects.filter(userName=userName):
            error_message = "userName already used!"
        else:
            models.LoginCredentials.objects.create(userName=userName, passwd=passwd, email=email.lower())
            error_message = "You Registered Successfully!"
    
    form = forms.newUser
    context = {'fields':form, 'error_message':error_message}
    return render(request, 'Login/newUser.html',context)




def passwdRecover(request):
    error_message = None
    record =None
    if request.method == 'POST':
        email = request.POST.get('email')

        record = models.LoginCredentials.objects.filter(email=email.lower())
        print(record,email)
        if not record:
            print("Nopt")
            print("emailnotfound")
            error_message = "User not Found Accosiated with email-"+email
    
    context = {'records':record, 'error_message':error_message}
    return render(request, 'Login/recover.html', context)