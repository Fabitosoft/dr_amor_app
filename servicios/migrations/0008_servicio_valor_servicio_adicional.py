# Generated by Django 2.2.3 on 2019-07-07 17:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('servicios', '0007_auto_20190514_0007'),
    ]

    operations = [
        migrations.AddField(
            model_name='servicio',
            name='valor_servicio_adicional',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
    ]
