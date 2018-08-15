from django.shortcuts import render
from rest_framework import generics
from .models import Node
from .serializers import NodeSerializer
from rest_framework.permissions import IsAdminUser
# Create your views here.

class NodeListAPIView(generics.ListCreateAPIView):
    queryset = Node.objects.all()
    serializer_class = NodeSerializer
    #permission_classes = (IsAdminUser,)
