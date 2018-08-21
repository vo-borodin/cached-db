# Generated by Django 2.1 on 2018-08-21 07:53

from django.db import migrations, models
import django.db.models.deletion
import django.db.models.manager


class Migration(migrations.Migration):

    dependencies = [
        ('nodes', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelManagers(
            name='node',
            managers=[
                ('nodes', django.db.models.manager.Manager()),
            ],
        ),
        migrations.AlterField(
            model_name='node',
            name='parent_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='children', to='nodes.Node'),
        ),
    ]