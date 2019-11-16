# Generated by Django 2.2.6 on 2019-11-04 15:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('contabilidad_cuentas', '0003_auto_20190509_0052'),
        ('puntos_venta', '0007_auto_20190506_0005'),
    ]

    operations = [
        migrations.AddField(
            model_name='puntoventa',
            name='cuenta_contable_caja',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='cuenta_contable_caja_puntos_ventas', to='contabilidad_cuentas.CuentaContable'),
        ),
    ]