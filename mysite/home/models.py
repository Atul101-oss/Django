from django.db import models

# Create your models here.

class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField("date published")

    def __str__(self) -> str:
        return self.question_text


class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, default=1)
    answer_text = models.CharField(max_length=200)
    responce_time = models.DateTimeField()

    def __str__(self) -> str:
        return self.answer_text
    

class Student(models.Model):
    name = models.CharField(max_length=50)
    course = models.CharField(max_length=50, default='Computer Science')
    gender = models.CharField(max_length=1, null=True, default='m')
    rollNo = models.IntegerField(null=True)
    clg_roll_no = models.CharField(max_length=10, null=True)

    def __str__(self):
        return self.name
    

class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)