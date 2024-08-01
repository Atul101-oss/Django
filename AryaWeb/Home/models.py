from django.db import models

# Create your models here.

class games(models.Model):
    gID = models.CharField(max_length=6,null=False,primary_key=True)
    gName = models.CharField(max_length=30,null=False)
    gTag = models.CharField(max_length=10,null=True)
    gDesc = models.CharField(max_length=200,null=True)

    def __str__(self) -> str:
        return self.gName