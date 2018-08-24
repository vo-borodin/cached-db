from django.shortcuts import render
from rest_framework import generics
from .models import Node
from .serializers import NodeSerializer, CacheNodeSerializer
from rest_framework.permissions import IsAdminUser
from django.http import HttpResponse, HttpResponseBadRequest
from nodes.default_data import reset_nodes
from django.db import transaction
import operator
import json
# Create your views here.

def index(request):
    return render(request, 'index.html')

class NodeListAPIView(generics.ListCreateAPIView):
    queryset = Node.nodes.all()
    serializer_class = NodeSerializer
    #permission_classes = (IsAdminUser,)


class SingleNodeView(generics.ListCreateAPIView):
    serializer_class = CacheNodeSerializer
    
    def get_way_to_root(self, node):
        ancestors = Node.nodes.ancestors(node)
        return [x.id for x in ancestors]

    def get_queryset(self):
        id = int(self.request.query_params.get('id'))
        cache = list(map(int, self.request.query_params.getlist('cache')))
        node = Node.nodes.get(pk=id)
        node.way_to_root = ','.join([str(w) for w in self.get_way_to_root(node) if w in cache])
        return [node]


def reset_view(request):
    Node.nodes.all().delete()
    reset_nodes(Node)
    return HttpResponse('Database is reset')

    
def apply_view(request):
    body = request.body
    operations = json.loads(body)['params']['changes']
    ret = operations[:]
    
    try:
        with transaction.atomic():
            for operation in operations:
                if operation['name'] == 'Create':
                    id = operation['id']
                    parent_id = operation['parentId']
                    value = operation['value']
                    parent = Node.nodes.get(pk=parent_id)
                    if parent.is_deleted:
                        raise Exception('Unable to add child "{0}" to deleted node "{1}". {2}', value, parent.value)
                    node = Node(parent_id=parent, is_deleted=False, value=value)
                    node.save()
                    for op in ret:
                        if op['name'] == 'Create' and 'id' in op and op['id'] == id:
                            op['id'] = node.id
                        if op['name'] == 'Create' and 'parentId' in op and op['parentId'] == id:
                            op['parentId'] = node.id
                        if op['name'] == 'Delete' and 'id' in op and op['id'] == id:
                            op['id'] = node.id
                        if op['name'] == 'Update' and 'id' in op and op['id'] == id:
                            op['id'] = node.id
                elif operation['name'] == 'Delete':
                    id = operation['id']
                    node = Node.nodes.get(pk=id)
                    Node.nodes.descendants(node).update(is_deleted=True)
                elif operation['name'] == 'Update':
                    id = operation['id']
                    value = operation['value']
                    node = Node.nodes.get(pk=id)
                    if node.is_deleted:
                        raise Exception('Unable to set value "{0}" to deleted node "{1}". {2}', value, node.value)
                    node.value = value
                    node.save()
    except Exception as e:
        return HttpResponseBadRequest(e.args[0].format(e.args[1], e.args[2], 'Changes were not applied.'))
    
    return HttpResponse(json.dumps({'result': 'Changes are applied', 'changes': ret}))

