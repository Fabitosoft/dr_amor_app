# Generated by Django 2.2.7 on 2019-11-17 04:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('contabilidad_comprobantes', '0004_auto_20191116_2245'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tipocomprobantecontableempresa',
            name='empresa',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='tipos_comprobantes_empresas', to='empresas.Empresa'),
        ),
    ]