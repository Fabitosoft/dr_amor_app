# Generated by Django 2.2.7 on 2019-11-20 11:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0011_update_proxy_permissions'),
    ]

    operations = [
        migrations.CreateModel(
            name='AditionalDefaultPermission',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'permissions': (('list_user', 'Can list user'), ('list_permission', 'Can list permission'), ('list_group', 'Can list group'), ('change_user_permission', 'Can change user permission'), ('make_user_superuser', 'Can make user superuser'), ('make_user_staff', 'Can make user staff'), ('make_user_active', 'Can make user active')),
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='MenuAdminPermission',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'permissions': (('menu_admin_empresas', 'Menu Admin Empresas'), ('menu_admin_habitaciones', 'Menu Admin Habitaciones'), ('menu_admin_productos', 'Menu Admin Productos'), ('menu_admin_puntos_ventas', 'Menu Admin Puntos Ventas'), ('menu_admin_parqueadero', 'Menu Admin Parqueadero'), ('menu_admin_permisos', 'Menu Admin Permisos'), ('menu_admin_permisos_grupos', 'Menu Admin Grupos Permisos'), ('menu_admin_terceros_usuarios', 'Menu Admin Terceros Usuarios'), ('menu_admin_terceros_acompanantes', 'Menu Admin Terceros Acompanantes'), ('menu_admin_terceros_colaboradores', 'Menu Admin Terceros Colaboradores'), ('menu_admin_terceros_proveedores', 'Menu Admin Terceros Proveedores'), ('menu_admin_bodegas', 'Menu Admin Bodegas'), ('menu_admin_bodegas_kardex', 'Menu Admin Bodegas Kardex'), ('menu_admin_bodegas_kardex_traslados', 'Menu Admin Bodegas Kardex Traslados'), ('menu_admin_cajas_billetes_monedas', 'Menu Admin Cajas Billetes Monedas'), ('menu_admin_cajas_conceptos_operaciones_cajas', 'Menu Admin Cajas Conceptos Operaciones')),
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='ModuloPermission',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'permissions': (('modulo_admin', 'Modulo Administracion'), ('modulo_mi_cuenta', 'Modulo Mi Cuenta'), ('modulo_acceso', 'Modulo Acceso'), ('modulo_consultas', 'Modulo Consultas')),
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='PermissionPlus',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(blank=True, max_length=200, null=True)),
                ('activo', models.BooleanField(default=False)),
                ('permiso', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='plus', to='auth.Permission')),
            ],
        ),
    ]
