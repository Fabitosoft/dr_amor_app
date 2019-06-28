# Generated by Django 2.2 on 2019-05-02 04:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('liquidaciones', '0013_remove_liquidacioncuenta_fecha_liquidacion'),
    ]

    operations = [
        migrations.AddField(
            model_name='liquidacioncuenta',
            name='tipo_cuenta',
            field=models.CharField(choices=[('ACOMPANANTE', 'Acompañante'), ('COLABORADOR', 'Colaborador'), ('MESERO', 'Mesero')], default='ACOMPANANTE', max_length=30),
            preserve_default=False,
        ),
    ]