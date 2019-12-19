# Generated by Django 2.2.7 on 2019-12-13 22:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('contabilidad_comprobantes', '0001_initial'),
        ('parqueadero', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='modalidadfracciontiempo',
            name='tipo_comprobante_contable_empresa',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.PROTECT, to='contabilidad_comprobantes.TipoComprobanteContableEmpresa'),
            preserve_default=False,
        ),
    ]
