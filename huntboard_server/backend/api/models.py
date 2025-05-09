from django.db import models
from django.contrib.auth.models import User

class Application(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    company = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    date = models.DateField()
    status = models.CharField(max_length=50, default="Applied")

    def __str__(self):
        return f"{self.company} - {self.position}"