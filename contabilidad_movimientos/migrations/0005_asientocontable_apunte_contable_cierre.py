# Generated by Django 2.2.7 on 2019-11-13 19:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('contabilidad_movimientos', '0004_auto_20191104_1046'),
    ]

    operations = [
        migrations.AddField(
            model_name='asientocontable',
            name='apunte_contable_cierre',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='contabilidad_movimientos.AsientoContable'),
        ),
    ]