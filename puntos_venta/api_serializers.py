from rest_framework import serializers

from .models import PuntoVenta


class PuntoVentaSerializer(serializers.ModelSerializer):
    usuario_actual_nombre = serializers.CharField(source='usuario_actual.username', read_only=True)
    bodega_nombre = serializers.CharField(source='bodega.nombre', read_only=True)
    tipo_nombre = serializers.SerializerMethodField()
    to_string = serializers.SerializerMethodField()

    def get_to_string(self, instance):
        return instance.nombre

    class Meta:
        model = PuntoVenta
        fields = [
            'url',
            'id',
            'nombre',
            'to_string',
            'bodega',
            'bodega_nombre',
            'tipo',
            'tipo_nombre',
            'abierto',
            'usuario_actual',
            'usuario_actual_nombre',
        ]

    def get_tipo_nombre(self, obj):
        return obj.get_tipo_display()
