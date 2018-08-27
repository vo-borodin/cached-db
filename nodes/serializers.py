from rest_framework import serializers
from .models import Node

class NodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Node
        exclude = ['relation', 'relation_info']


class CacheNodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Node
        fields = '__all__'
