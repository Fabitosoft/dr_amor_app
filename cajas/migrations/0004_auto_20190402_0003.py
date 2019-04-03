# Generated by Django 2.1.5 on 2019-04-02 05:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cajas', '0003_auto_20190331_1612'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaccioncaja',
            name='valor_efectivo',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
        migrations.AlterField(
            model_name='transaccioncaja',
            name='valor_tarjeta',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
    ]
