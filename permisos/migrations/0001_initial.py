# Generated by Django 2.1.5 on 2019-03-09 02:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0009_alter_user_last_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='AditionalDefaultPermission',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'permissions': (('list_user', 'Can list user'), ('list_permission', 'Can list permission'), ('list_group', 'Can list group'), ('make_user_superuser', 'Can make user superuser'), ('make_user_staff', 'Can make user staff'), ('make_user_active', 'Can make user active')),
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
