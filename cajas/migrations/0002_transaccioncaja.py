# Generated by Django 2.1.5 on 2019-03-13 19:04

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import model_utils.fields


class Migration(migrations.Migration):

    dependencies = [
        ('puntos_venta', '0001_initial'),
        ('cajas', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='TransaccionCaja',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('concepto', models.TextField()),
                ('tipo', models.CharField(blank=True, choices=[('I', 'Ingreso'), ('E', 'Egreso')], max_length=3, null=True)),
                ('tipo_dos', models.CharField(blank=True, choices=[('SER_ACOM', 'Venta Servicios'), ('CAM_TIE_SER_ACOM', 'Cambio Tiempo Servicio Acompañanate'), ('CAM_HABITACION', 'Cambio de Habitacion Servicio'), ('LIQ_ACOM', 'Liquidacion Acompañante'), ('ANU_SER_ACOM', 'Anulacion Servicio Acompañante'), ('BASE_INI', 'Base Inicial'), ('OPE_CAJ_EGR', 'Operación Caja Egreso'), ('OPE_CAJ_ING', 'Operación Caja Ingreso')], max_length=30, null=True)),
                ('valor_efectivo', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('valor_tarjeta', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('franquicia', models.CharField(max_length=30, null=True)),
                ('nro_autorizacion', models.CharField(max_length=30, null=True)),
                ('punto_venta_turno', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='transacciones_caja', to='puntos_venta.PuntoVentaTurno')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
