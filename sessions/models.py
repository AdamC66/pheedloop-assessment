from django.db import models

# Create your models here.
class Session(models.Model):
    title = models.CharField(max_length = 255)
    description = models.TextField()
    rating = models.IntegerField(null=True, blank=True)


class Speaker(models.Model):
    name = models.CharField(max_length = 100)
    bio = models.TextField(null=True, blank=True)
    photo = models.URLField(null=True, blank=True)
    phone_number = models.CharField(max_lenth = 50, null=True, blank=True)
    email = models.EmailField()
    Session = models.ForeignKey(Session, on_delete=models.CASCADE, related_name="speakers", null=True, blank=True)