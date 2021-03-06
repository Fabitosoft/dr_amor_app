# Generated by Django 2.2.7 on 2019-11-20 11:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('contabilidad_impuestos', '0001_initial'),
        ('empresas', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='TipoHabitacion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=30, unique=True)),
                ('valor', models.DecimalField(decimal_places=0, default=0, max_digits=10)),
                ('valor_adicional_servicio', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('impuestos', models.ManyToManyField(related_name='tipos_habitaciones', to='contabilidad_impuestos.Impuesto')),
            ],
            options={
                'permissions': [['list_tipohabitacion', 'Puede listar tipos habitaciones']],
            },
        ),
        migrations.CreateModel(
            name='Habitacion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('numero', models.PositiveIntegerField()),
                ('estado', models.PositiveIntegerField(choices=[(0, 'Disponible'), (1, 'Ocupada'), (2, 'Sucia'), (3, 'En Mantenimiento'), (4, 'Bloqueada')], default=0)),
                ('activa', models.BooleanField(default=False)),
                ('fecha_ultimo_estado', models.DateTimeField(blank=True, null=True)),
                ('empresa', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='mis_habitaciones', to='empresas.Empresa')),
                ('tipo', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='mis_habitaciones', to='habitaciones.TipoHabitacion', verbose_name='Tipo de Habitación')),
            ],
            options={
                'verbose_name_plural': 'Habitaciones',
                'permissions': [['list_habitacion', 'Puede listar habitaciones']],
            },
        ),
    ]
