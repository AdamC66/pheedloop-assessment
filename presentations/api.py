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
from .sheets import addRow

class SessionViewSet(viewsets.ModelViewSet):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer
    permission_classes = [permissions.AllowAny,]

    permission_classes = [permissions.AllowAny, permissions.IsAuthenticated]

    def get_permissions(self):
        if self.request.method in ['POST','DELETE','PUT']:
            self.permission_classes = (permissions.IsAuthenticated,)
        elif self.request.method == 'GET':
            self.permission_classes = (permissions.AllowAny,)
        return super(SessionViewSet, self).get_permissions()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user) 

    def list(self, request, id=None):
        queryset = Session.objects.all()
        if id:
            queryset = queryset.filter(id=id)
        if request.user.is_anonymous:
            serializer = SessionSerializer(queryset, many = True)
            return Response(serializer.data)
        if request.user:
            queryset = queryset.filter(owner=request.user)
        serializer = SessionSerializer(queryset, many = True)
        return Response(serializer.data)
    #When a put request is made to /api/sessions/ this method will be called, it takes the id from the request
    # we can use get here because if someone is leaving a rating on a session, it must exist, 
    #then we multiply the current rating by the number of ratings, add the new rating, then divide again by the number of ratings +1 to properly weight the rating
    # then the rating is incremented by one, and the model is saved. this method also calls the send_message function from send_sms.py
    def put(self, request):
        myid=request.data.get('id')
        new_rating = request.data.get('rating')
        if myid and new_rating:
            session_to_update = Session.objects.get(id=myid)
            session_to_update.rating = ((session_to_update.rating * session_to_update.num_of_ratings) + int(new_rating))/ (session_to_update.num_of_ratings + 1)
            session_to_update.num_of_ratings += 1
            session_to_update.save()
            serializer = SessionSerializer(session_to_update)
            # send_message(session_to_update.speakers.all(), new_rating, session_to_update)
            # addRow(session_to_update.id, new_rating, first_name=request.user.first_name, last_name=request.user.last_name)
            return Response(data=serializer.data,status=status.HTTP_200_OK)
        else:
            myid=request.data.get('id')
            session = Session.objects.get(id=myid)
            session.title = request.data.get('title')
            session.description = request.data.get('description')
            if request.data.get('speakers'):
                new_speakers = request.data.get('speakers').split(',')
                print(new_speakers)
                session.speakers.add(*new_speakers)
            session.save()
            serializer = SessionSerializer(session)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
    def delete(self, request):
        myid = request.data.get('id')
        session = Session.objects.get(id=myid)
        session.delete()
        return Response({"Response":"Session Successfully Deleted"}, status=status.HTTP_200_OK)  
class SpeakerViewSet(viewsets.ModelViewSet):
    queryset = Speaker.objects.all()
    serializer_class = SpeakerSerializer
    permission_classes = [permissions.AllowAny,]

    def get_permissions(self):
        if self.request.method in ['POST','DELETE','PUT']:
            self.permission_classes = (permissions.IsAuthenticated,)
        elif self.request.method == 'GET':
            self.permission_classes = (permissions.AllowAny,)
        return super(SpeakerViewSet, self).get_permissions()

    def list(self, request, id=None):
        queryset = Speaker.objects.all()
        if id:
            queryset = queryset.filter(id=id)
        if request.user.is_anonymous:
            serializer = SpeakerSerializer(queryset, many = True)
            return Response(serializer.data)
        elif request.user:
            queryset = queryset.filter(owner=request.user)
        serializer = SpeakerSerializer(queryset, many = True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        serializer.save() 
