from django.db import models

LEAD_SOURCE = (
    ('call', 'Call'),
    ('email', 'Email'),
    ('existing customer', 'Existing Customer'),
    ('partner', 'Partner'),
    ('public relations', 'Public Relations'),
    ('compaign', 'Campaign'),
    ('other', 'Other'),
)

LEAD_STATUS = (
    ('assigned', 'Assigned'),
    ('in process', 'In Process'),
    ('converted', 'Converted'),
    ('recycled', 'Recycled'),
    ('dead', 'Dead')
)

class Node(models.Model):
    parent_id = models.ForeignKey('self', on_delete=models.CASCADE, db_index=True, null=True)
    is_deleted = models.BooleanField(default=False)
    value = models.TextField(blank=False)

    def __str__(self):
        return self.value
