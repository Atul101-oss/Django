from django import forms
from . import models


class LoginCredentials(forms.ModelForm):
    class Meta:
        model = models.LoginCredentials
        fields = ['userName','passwd']

class newUser(forms.ModelForm):
    class Meta:
        model = models.LoginCredentials
        fields = ['userName','passwd','email']

class recovery(forms.ModelForm):
    class Meta:
        model = models.LoginCredentials
        fields = ['email']
