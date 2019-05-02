# Generated by Django 2.2 on 2019-04-30 02:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cajas', '0018_conceptooperacioncaja_tipo_cuenta'),
    ]

    operations = [
        migrations.AlterField(
            model_name='conceptooperacioncaja',
            name='tipo_cuenta',
            field=models.CharField(choices=[('CXC', 'Cuenta x Cobrar'), ('CXP', 'Cuenta x Pagar'), ('NA', 'No Aplica')], max_length=3, null=True),
        ),
    ]
