from django.db import models

class Node(models.Model):
    parent_id = models.ForeignKey('self', on_delete=models.CASCADE, db_index=True, null=True)
    is_deleted = models.BooleanField(default=False)
    value = models.TextField(blank=False)

    def __str__(self):
        return self.value
