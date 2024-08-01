from django.db import models

# Create your models here.

class Books(models.Model):
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    author = models.ForeignKey("Authors", on_delete=models.CASCADE)
    category = models.ForeignKey("Categories", on_delete=models.SET_DEFAULT , default=1, null=True)
    thumbnail = models.URLField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    published_year = models.IntegerField(null=True)
    average_rating = models.ForeignKey("Average_rating", on_delete=models.SET_NULL, null=True, blank=True)
    num_pages = models.IntegerField(null=True, blank=True)
    ratings_count = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.title
    
class Average_rating(models.Model):
    average_rating = models.FloatField(null=True, blank=True)

    def __str__(self):
        return str(self.average_rating)

class Authors(models.Model):
    author =  models.CharField(max_length=255,null=True,blank=True)

    def __str__(self):
        return self.author


class Categories(models.Model):
    category = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.category
