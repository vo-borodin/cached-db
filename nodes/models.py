from django.db import models
from django.db.models.query import QuerySet
from django.db.models import Q
import operator

class NodeQuerySet(QuerySet):
    def ancestor_in_cache(self, node, cache):
        ways = []
        if not node.parent_id or node.parent_id.id in cache or not len(cache):
            return None
        for c in cache:
            current = node.parent_id
            length = 1
            while current:
                if current.id == c:
                    ways.append((c, length))
                    break
                else:
                    current = current.parent_id
                    length += 1
        res = None
        if len(ways):
            res = str(min(ways, key=operator.itemgetter(1))[0])
        return res
    
    def descendants(self, node):
        q = Q(pk=node.pk)
        for child in node.children.all():
            q |= Q(pk__in=self.descendants(child))
        return self.filter(q)


class Node(models.Model):
    parent_id = models.ForeignKey('self', on_delete=models.CASCADE, db_index=True, null=True, related_name='children')
    is_deleted = models.BooleanField(default=False)
    value = models.TextField(blank=False)
    relation = models.IntegerField(db_index=True, null=True)
    relation_info = models.TextField(blank=True, max_length=127)
    
    nodes = NodeQuerySet.as_manager()

    def __str__(self):
        return self.value

