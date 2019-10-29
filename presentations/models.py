from django.db import models

# Create your models here.
class Session(models.Model):
    title = models.CharField(max_length = 255, blank=True)
    description = models.TextField(blank=True)
    rating = models.FloatField(null=True, blank=True)
    num_of_ratings = models.IntegerField(null=True, blank=True, default=0)

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