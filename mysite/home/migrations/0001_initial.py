# Generated by Django 5.0.2 on 2024-03-03 06:38

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='student',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Fname', models.CharField(max_length=50)),
                ('Lname', models.CharField(max_length=50)),
                ('RollNo', models.CharField(max_length=10)),
                ('Course', models.CharField(max_length=100)),
                ('Semister', models.IntegerField()),
            ],
        ),
    ]