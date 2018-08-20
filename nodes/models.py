from django.db import models
from django.db.models.query import QuerySet
from django.db.models import Q

class NodeQuerySet(QuerySet):
    def descendants(self, node):
        q = Q(pk=node.pk)
        for child in node.children.all():
            q |= Q(pk__in=self.descendants(child))
        return self.filter(q)


class Node(models.Model):
    parent_id = models.ForeignKey('self', on_delete=models.CASCADE, db_index=True, null=True, related_name='children')
    is_deleted = models.BooleanField(default=False)
    value = models.TextField(blank=False)
    
    nodes = NodeQuerySet.as_manager()

    def __str__(self):
        return self.value
