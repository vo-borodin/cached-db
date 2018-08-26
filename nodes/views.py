from django.shortcuts import render
from rest_framework import generics
from .models import Node
from .serializers import NodeSerializer, CacheNodeSerializer
from rest_framework.permissions import IsAdminUser
from django.http import HttpResponse, HttpResponseBadRequest
from nodes.default_data import reset_nodes
from django.db import transaction
from django.db.models import Q
import operator
import json
# Create your views here.

def index(request):
    return render(request, 'index.html')


class NodeListAPIView(generics.ListCreateAPIView):
    queryset = Node.nodes.all()
    serializer_class = CacheNodeSerializer # NodeSerializer
    #permission_classes = (IsAdminUser,)


class SingleNodeView(generics.ListCreateAPIView):
    serializer_class = CacheNodeSerializer

    def get_queryset(self):
        id = int(self.request.query_params.get('id'))
        r = self.request.query_params.get('reload')
        reload = (False if r.lower() == 'false' else True)
        cache = Node.nodes.filter(Q(way_to_root__isnull=False) | Q(pk=id))
        
        if reload:
            cache.update(way_to_root=None)
            cache = []
        ids = [x.id for x in cache]
        
        new_relations = {}
        node = Node.nodes.get(pk=id)
        node.way_to_root = Node.nodes.ancestor_in_cache(node, ids) or '0'
        new_relations[node.id] = node.way_to_root
        node.save()
        
        for c in cache:
            key = str(c.id)
            a = Node.nodes.ancestor_in_cache(c, ids) or '0'
            if c.way_to_root != a:
                new_relations[c.id] = a
                c.way_to_root = a
                c.save()
        
        node.way_to_root = json.dumps(new_relations)
        return [node]


def reset_view(request):
    Node.nodes.all().delete()
    reset_nodes(Node)
    return HttpResponse('Database is reset')


def apply_view(request):
    body = request.body
    operations = json.loads(body)['params']['changes']
    
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
                    node = Node(parent_id=parent, is_deleted=False, value=value, way_to_root=None)
                    node.save()
                    for op in operations:
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
    
    return HttpResponse(json.dumps({'result': 'Changes are applied', 'changes': operations}))

