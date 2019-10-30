from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Session(models.Model):
    title = models.CharField(max_length = 255, blank=True)
    description = models.TextField(blank=True)
    rating = models.FloatField(null=True, blank=True, default=0)
    num_of_ratings = models.IntegerField(null=True, blank=True, default=0)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sessions", null=True)
    def __str__(self):
        return self.title

class Speaker(models.Model):
    name = models.CharField(max_length = 100)
    bio = models.TextField(null=True, blank=True)
    photo = models.URLField(null=True, blank=True)
    phone_number = models.CharField(max_length = 50, null=True, blank=True)
    email = models.EmailField()
    session = models.ManyToManyField(Session, related_name="speakers", blank=True)

    def __str__(self):
        return self.name