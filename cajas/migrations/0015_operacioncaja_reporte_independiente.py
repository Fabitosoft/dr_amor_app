# Generated by Django 2.2 on 2019-04-29 20:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cajas', '0014_conceptooperacioncaja_puntos_de_venta'),
    ]

    operations = [
        migrations.AddField(
            model_name='operacioncaja',
            name='reporte_independiente',
            field=models.BooleanField(default=False),
        ),
    ]
