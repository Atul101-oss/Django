from django.contrib import admin

from .models import *
# Register your models here.
admin.site.register(Books)
admin.site.register(Authors)
admin.site.register(Categories)
admin.site.register(Average_rating)

