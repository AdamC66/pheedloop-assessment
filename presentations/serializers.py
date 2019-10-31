from rest_framework import serializers
from .models import *


class SpeakerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Speaker
        fields = ('id','name', 'bio', 'photo', 'phone_number', 'email', 'session')


class SessionSerializer(serializers.ModelSerializer):
    speakers = SpeakerSerializer(many=True, required=False)
    class Meta:
        model = Session
        fields = ('id', 'title', 'description', 'rating', 'num_of_ratings', 'speakers')
