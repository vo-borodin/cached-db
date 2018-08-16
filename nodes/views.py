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
        ids = list(map(int, self.request.query_params.getlist('id')))
        if len(ids):
            return Node.objects.filter(id__in=ids)
        else:
            return Node.objects.all()

def reset_view(request):
    Node.objects.all().delete()
    reset_nodes(Node)
    return HttpResponse("Database is reset")