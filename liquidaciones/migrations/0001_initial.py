# Generated by Django 2.2.7 on 2019-11-20 11:37

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import model_utils.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('cajas', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('terceros', '0001_initial'),
        ('puntos_venta', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='LiquidacionCuenta',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('tipo_cuenta', models.CharField(choices=[('ACOMPANANTE', 'Acompañante'), ('COLABORADOR', 'Colaborador'), ('MESERO', 'Mesero')], max_length=30)),
                ('saldo_anterior', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('a_pagar_a_tercero', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('a_cobrar_a_tercero', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('efectivo', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('tarjeta_o_transferencia', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('pagado', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('saldo', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('creado_por', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='liquidaciones', to=settings.AUTH_USER_MODEL)),
                ('cuenta', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='liquidacion', to='terceros.Cuenta')),
                ('punto_venta_turno', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='liquidaciones', to='puntos_venta.PuntoVentaTurno')),
                ('transacciones_caja', models.ManyToManyField(related_name='liquidaciones', to='cajas.TransaccionCaja')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
