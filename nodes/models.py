from django.db import models
from django.db.models.query import QuerySet
from django.db.models import Q

class NodeQuerySet(QuerySet):
    def ancestors(self, node):
        if node:
            return [node] + self.ancestors(node.parent_id)
        else:
            return []
    
    def descendants(self, node):
        q = Q(pk=node.pk)
        for child in node.children.all():
            q |= Q(pk__in=self.descendants(child))
        return self.filter(q)


class Node(models.Model):
    parent_id = models.ForeignKey('self', on_delete=models.CASCADE, db_index=True, null=True, related_name='children')
    is_deleted = models.BooleanField(default=False)
    value = models.TextField(blank=False)
    way_to_root = models.TextField(blank=True)
    
    nodes = NodeQuerySet.as_manager()

    def __str__(self):
        return self.value

