# Generated by Django 2.2 on 2019-05-10 17:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('contabilidad_bancos', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='banco',
            options={'permissions': [['list_banco', 'Puede listar Bancos']]},
        ),
        migrations.AlterModelOptions(
            name='cuentabancariabanco',
            options={'permissions': [['list_cuentabancariabanco', 'Puede listar Cuentas Bancarias']]},
        ),
    ]
