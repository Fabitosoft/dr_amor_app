# Generated by Django 2.2 on 2019-05-10 17:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('contabilidad_diario', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='diariocontable',
            options={'permissions': [['list_diariocontable', 'Puede listar Diarios Contables']]},
        ),
    ]
