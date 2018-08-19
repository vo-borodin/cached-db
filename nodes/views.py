from django.shortcuts import render
from rest_framework import generics
from .models import Node
from .serializers import NodeSerializer
from rest_framework.permissions import IsAdminUser
from django.http import HttpResponse
from nodes.default_data import reset_nodes
import json
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

    
def apply_view(request):
    body = request.body
    operations = json.loads(body)['params']['changes']
    
    def replace_uuid_with_real(fake, real):
        for op in operations:
            if op['name'] == 'Create' and 'parentId' in op and op['parentId'] == fake:
                op['parentId'] = real
            if op['name'] == 'Delete' and 'ids' in op and fake in op['ids']:
                op['ids'].remove(fake)
                op['ids'].append(real)
            if op['name'] == 'Update' and 'id' in op and op['id'] == fake:
                op['id'] = real
    
    for operation in operations:
        if operation['name'] == 'Create':
            id = operation['id']
            parent_id = operation['parentId']
            value = operation['value']
            parent = Node.objects.get(pk=parent_id)
            node = Node(parent_id=parent, is_deleted=False, value=value)
            node.save()
            replace_uuid_with_real(id, node.id)
        elif operation['name'] == 'Delete':
            ids = operation['ids']
            Node.objects.filter(id__in=ids).update(is_deleted=True)
        elif operation['name'] == 'Update':
            id = operation['id']
            value = operation['value']
            node = Node.objects.get(pk=id)
            node.value = value
            node.save()
    
    return HttpResponse(json.dumps({'result': 'Changes are applied'}))

