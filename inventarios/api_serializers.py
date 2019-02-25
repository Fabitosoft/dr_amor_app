from channels.binding.websockets import WebsocketBinding
from rest_framework import serializers

from .models import Bodega, MovimientoInventario, MovimientoInventarioDetalle, TrasladoInventario, \
    TrasladoInventarioDetalle


class BodegaSerializer(serializers.ModelSerializer):
    to_string = serializers.SerializerMethodField()

    def get_to_string(self, instance):
        return instance.nombre

    class Meta:
        model = Bodega
        fields = [
            'url',
            'id',
            'nombre',
            'to_string',
            'es_principal',
        ]


class MovimientoInventarioDetalleSerializer(serializers.ModelSerializer):
    cuenta = serializers.PrimaryKeyRelatedField(source='movimiento.cuenta_id', read_only=True, allow_null=True)
    cuenta_liquidada = serializers.NullBooleanField(source='movimiento.cuenta.liquidada', read_only=True)
    cuenta_usuario = serializers.IntegerField(
        source='movimiento.cuenta.propietario_id',
        read_only=True,
        allow_null=True
    )
    cuenta_tipo = serializers.IntegerField(source='movimiento.cuenta.tipo', read_only=True, allow_null=True)
    producto_nombre = serializers.CharField(source='producto.nombre', read_only=True)
    movimiento_detalle = serializers.CharField(source='movimiento.detalle', read_only=True)
    movimiento_fecha = serializers.CharField(source='movimiento.fecha', read_only=True)
    movimiento_proveedor_nombre = serializers.CharField(source='movimiento.proveedor.nombre', read_only=True)
    bodega = serializers.IntegerField(source='movimiento.bodega_id', read_only=True)
    producto_categoria_nombre = serializers.CharField(source='producto.categoria_dos.categoria.nombre', read_only=True)
    producto_categoria_dos_nombre = serializers.CharField(source='producto.categoria_dos.nombre', read_only=True)
    producto_precio_venta = serializers.DecimalField(source='producto.precio_venta', read_only=True, decimal_places=2,
                                                     max_digits=12)

    class Meta:
        model = MovimientoInventarioDetalle
        fields = [
            'url',
            'id',
            'modified',
            'cuenta',
            'cuenta_tipo',
            'cuenta_liquidada',
            'cuenta_usuario',
            'movimiento',
            'bodega',
            'movimiento_detalle',
            'movimiento_proveedor_nombre',
            'precio_venta_total',
            'producto',
            'producto_nombre',
            'producto_precio_venta',
            'movimiento_fecha',
            'costo_unitario',
            'entra_cantidad',
            'entra_costo',
            'sale_cantidad',
            'sale_costo',
            'saldo_cantidad',
            'saldo_costo',
            'es_ultimo_saldo',
            'producto_categoria_nombre',
            'producto_categoria_dos_nombre',
        ]


class MovimientoInventarioDetalleBinding(WebsocketBinding):
    model = MovimientoInventarioDetalle
    stream = "movimientos_inventarios_detalles"
    fields = ["id", ]

    def serialize_data(self, instance):
        serializado = MovimientoInventarioDetalleSerializer(instance, context={'request': None})
        return serializado.data

    @classmethod
    def group_names(cls, *args, **kwargs):
        return ["binding.pos_servicios"]

    def has_permission(self, user, action, pk):
        return True


class MovimientoInventarioSerializer(serializers.ModelSerializer):
    proveedor_nombre = serializers.CharField(source='proveedor.nombre', read_only=True)
    bodega_nombre = serializers.CharField(source='bodega.nombre', read_only=True)
    fecha = serializers.DateTimeField(format="%Y-%m-%d", input_formats=['%Y-%m-%d', 'iso-8601'])
    entra_costo = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)
    entra_cantidad = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)
    sale_cantidad = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)
    sale_costo = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)
    cuenta_liquidada = serializers.NullBooleanField(source='cuenta.liquidada', read_only=True)
    cuenta_usuario = serializers.IntegerField(source='cuenta.propietario_id', read_only=True, allow_null=True)

    class Meta:
        model = MovimientoInventario
        fields = [
            'url',
            'id',
            'fecha',
            'proveedor',
            'proveedor_nombre',
            'bodega',
            'bodega_nombre',
            'cuenta',
            'cuenta_liquidada',
            'cuenta_usuario',
            'detalle',
            'tipo',
            'motivo',
            'cargado',
            'entra_costo',
            'entra_cantidad',
            'sale_costo',
            'sale_cantidad',
            'observacion',
        ]
        extra_kwargs = {
            'cuenta': {'read_only': True}
        }


class TrasladoInventarioSerializer(serializers.ModelSerializer):
    bodega_origen_nombre = serializers.CharField(source='bodega_origen.nombre', read_only=True)
    bodega_destino_nombre = serializers.CharField(source='bodega_destino.nombre', read_only=True)

    class Meta:
        model = TrasladoInventario
        fields = [
            'url',
            'id',
            'bodega_origen',
            'bodega_origen_nombre',
            'bodega_destino',
            'bodega_destino_nombre',
            'movimiento_origen',
            'movimiento_destino',
            'trasladado',
        ]
        extra_kwargs = {
            'movimiento_origen': {'read_only': True},
            'movimiento_destino': {'read_only': True},

        }


class TrasladoInventarioDetalleSerializer(serializers.ModelSerializer):
    producto_nombre = serializers.CharField(source='producto.nombre', read_only=True)
    cantidad_origen = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)
    cantidad_destino = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)

    class Meta:
        model = TrasladoInventarioDetalle
        fields = [
            'url',
            'id',
            'traslado',
            'producto',
            'producto_nombre',
            'cantidad',
            'cantidad_realmente_trasladada',
            'cantidad_origen',
            'cantidad_destino',
        ]
