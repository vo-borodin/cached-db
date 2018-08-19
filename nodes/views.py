from django.shortcuts import render
from rest_framework import generics
from .models import Node
from .serializers import NodeSerializer
from rest_framework.permissions import IsAdminUser
from django.http import HttpResponse
from nodes.default_data import reset_nodes
# Create your views here.


class NodeListAPIView(generics.ListCreateAPIView):
    serializer_class = NodeSerializer
    #permission_classes = (IsAdminUser,)
    
    def get_queryset(self):
        if 'id' in self.request.query_params:
            id = int(self.request.query_params.get('id'))
            return Node.objects.filter(id=id)
        else:
            return Node.objects.all()

def reset_view(request):
    Node.objects.all().delete()
    reset_nodes(Node)
    return HttpResponse("Database is reset")