# Generated by Django 2.2 on 2019-05-14 05:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('servicios', '0006_servicio_empresa'),
    ]

    operations = [
        migrations.RenameField(
            model_name='servicio',
            old_name='valor_iva_habitacion',
            new_name='impuestos',
        ),
        migrations.RemoveField(
            model_name='servicio',
            name='comision',
        ),
    ]