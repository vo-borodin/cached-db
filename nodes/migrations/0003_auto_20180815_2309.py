# Generated by Django 2.1 on 2018-08-15 16:09

from django.db import migrations
from nodes import default_data

class Migration(migrations.Migration):

    dependencies = [
        ('nodes', '0002_auto_20180821_1453'),
    ]

    operations = [
        migrations.RunPython(default_data.default_nodes),
    ]