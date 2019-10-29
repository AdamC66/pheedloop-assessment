import logging
import os
from rest_framework import viewsets, permissions
from .serializers import *
from .models import *
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status, parsers
from django.db.models import Q
from .send_sms import send_message
import datetime



class SessionViewSet(viewsets.ModelViewSet):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer
    permission_classes = [permissions.AllowAny,]

    # def get_permissions(self):
    #     if self.request.method == 'GET':
    #         self.permission_classes = (permissions.AllowAny,)
    #         return super(SessionViewSet, self).get_permissions()
    #     if self.request.method == 'PUT':
    #         self.permission_classes = (permissions.AllowAny,)
    #         return super(SessionViewSet, self).get_permissions()

    def list(self, request, id=None):
        queryset = Session.objects.all()
        if id:
            queryset = queryset.filter(id=id)
        serializer = SessionSerializer(queryset, many = True)
        return Response(serializer.data)

    def put(self, request):
        myid=request.data.get('id')
        new_rating = request.data.get('rating')
        print("POST METHOD WAS CALLED", myid, new_rating)
        if myid:
            session_to_update = Session.objects.get(id=myid)
            print(session_to_update)
            session_to_update.rating = ((session_to_update.rating * session_to_update.num_of_ratings) + int(new_rating))/ (session_to_update.num_of_ratings + 1)
            session_to_update.num_of_ratings += 1
            session_to_update.save()
            serializer = SessionSerializer(session_to_update)
            send_message(session_to_update.speakers.all(), new_rating, session_to_update)
            return Response(data=serializer.data,status=status.HTTP_200_OK)
            
class SpeakerViewSet(viewsets.ModelViewSet):
    queryset = Speaker.objects.all()
    serializer_class = SpeakerSerializer
    permission_classes = [permissions.AllowAny,]

    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = (permissions.AllowAny,)
        return super(SpeakerViewSet, self).get_permissions()

    def list(self, request, id=None):
        queryset = Speaker.objects.all()
        if id:
            queryset = queryset.filter(id=id)
        serializer = SpeakerSerializer(queryset, many = True)
        return Response(serializer.data)
