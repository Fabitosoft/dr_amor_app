from rest_framework import serializers

from .models import (
    BilleteMoneda,
    ArqueoCaja,
    ConceptoOperacionCaja,
    OperacionCaja
)


class OperacionCajaSerializer(serializers.ModelSerializer):
    class Meta:
        model = OperacionCaja
        fields = (
            'id',
            'tercero',
            'concepto',
            'grupo_operaciones',
            'punto_venta',
            'descripcion',
            'observacion',
            'valor',
        )


class ConceptoOperacionCajaSerializer(serializers.ModelSerializer):
    to_string = serializers.SerializerMethodField()
    tipo_display = serializers.SerializerMethodField()
    grupo_display = serializers.SerializerMethodField()

    def get_to_string(self, instance):
        return '%s de %s' % (instance.get_tipo_display(), instance.descripcion)

    def get_tipo_display(self, instance):
        return instance.get_tipo_display()

    def get_grupo_display(self, instance):
        return instance.get_grupo_display()

    class Meta:
        model = ConceptoOperacionCaja
        fields = (
            'id',
            'tipo',
            'tipo_display',
            'grupo',
            'grupo_display',
            'descripcion',
            'to_string',
        )


class BilleteMonedaSerializer(serializers.ModelSerializer):
    to_string = serializers.SerializerMethodField()

    def get_to_string(self, instance):
        return '%s de %s' % (instance.get_tipo_display(), instance.valor)

    class Meta:
        model = BilleteMoneda
        fields = (
            'id',
            'tipo',
            'valor',
            'activo',
            'to_string',
        )


class ArqueoCajaSerializer(serializers.ModelSerializer):
    usuario_username = serializers.CharField(source='usuario.username', read_only=True)
    punto_venta_nombre = serializers.CharField(source='punto_venta.nombre', read_only=True)
    tercero_nombre = serializers.CharField(source='usuario.tercero.full_name_proxy', read_only=True)
    valor_entrega_base_dia_siguiente = serializers.DecimalField(decimal_places=2, max_digits=10, read_only=True)
    valor_entrega_efectivo = serializers.DecimalField(decimal_places=2, max_digits=10, read_only=True)
    valor_entrega_dolares = serializers.DecimalField(decimal_places=2, max_digits=10, read_only=True)
    valor_entrega_total = serializers.DecimalField(decimal_places=2, max_digits=10, read_only=True)
    valor_mo_egresos_efectivo = serializers.DecimalField(decimal_places=2, max_digits=10, read_only=True)
    valor_mo_ingreso_efectivo = serializers.DecimalField(decimal_places=2, max_digits=10, read_only=True)
    valor_mo_ingreso_tarjeta = serializers.DecimalField(decimal_places=2, max_digits=10, read_only=True)
    valor_mo_total = serializers.DecimalField(decimal_places=2, max_digits=10, read_only=True)
    cuadre = serializers.DecimalField(decimal_places=2, max_digits=10, read_only=True)

    class Meta:
        model = ArqueoCaja
        fields = (
            'id',
            'usuario',
            'usuario_username',
            'tercero_nombre',
            'created',
            'punto_venta',
            'punto_venta_nombre',
            'dolares',
            'dolares_tasa',
            'nro_voucher',
            'valor_entrega_total',
            'valor_entrega_base_dia_siguiente',
            'valor_tarjeta',
            'valor_entrega_efectivo',
            'valor_entrega_dolares',
            'valor_mo_egresos_efectivo',
            'valor_mo_ingreso_efectivo',
            'valor_mo_ingreso_tarjeta',
            'valor_mo_total',
            'cuadre',
        )
