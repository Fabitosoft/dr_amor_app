from rest_framework import serializers
from .models import (
    TipoVehiculo,
    ModalidadFraccionTiempo,
    ModalidadFraccionTiempoDetalle,
    Vehiculo,
    RegistroEntradaParqueo
)
from contabilidad_impuestos.api_serializers import ImpuestoSerializer


class RegistroEntradaParqueoSerializer(serializers.ModelSerializer):
    vehiculo_placa = serializers.CharField(source='vehiculo.placa', read_only=True)
    placa = serializers.CharField(write_only=True)
    tipo_vehiculo_nombre = serializers.CharField(source='vehiculo.tipo_vehiculo.nombre', read_only=True)
    tipo_vehiculo = serializers.PrimaryKeyRelatedField(source='vehiculo.tipo_vehiculo', read_only=True)
    modalidad_fraccion_tiempo_nombre = serializers.PrimaryKeyRelatedField(
        source='modalidad_fraccion_tiempo.nombre',
        read_only=True
    )
    usuario_pv = serializers.HiddenField(default=serializers.CurrentUserDefault())

    def create(self, validated_data):
        from .services import registro_entrada_parqueo_crear
        usuario_pv = validated_data.get('usuario_pv')
        modalidad_fraccion_tiempo = validated_data.get('modalidad_fraccion_tiempo')
        placa = validated_data.get('placa', None)
        registro = registro_entrada_parqueo_crear(
            usuario_pdv_id=usuario_pv.id,
            modalidad_fraccion_tiempo_id=modalidad_fraccion_tiempo.id,
            placa=placa
        )
        return registro

    class Meta:
        model = RegistroEntradaParqueo
        fields = [
            'url',
            'id',
            'created',
            'vehiculo',
            'usuario_pv',
            'hora_ingreso',
            'hora_salida',
            'hora_pago',
            'vehiculo_placa',
            'valor_parqueadero',
            'valor_iva_parqueadero',
            'valor_impuesto_unico',
            'modalidad_fraccion_tiempo',
            'modalidad_fraccion_tiempo_nombre',
            'placa',
            'detalle',
            'tipo_vehiculo',
            'tipo_vehiculo_nombre',
        ]


class TipoVehiculoSerializer(serializers.ModelSerializer):
    to_string = serializers.SerializerMethodField()

    def get_to_string(self, instance):  # pragma: no cover
        return instance.nombre

    class Meta:
        model = TipoVehiculo
        fields = [
            'url',
            'id',
            'to_string',
            'nombre',
            'tiene_placa'
        ]


class ModalidadFraccionTiempoSerializer(serializers.ModelSerializer):
    tipo_vehiculo_nombre = serializers.CharField(source='tipo_vehiculo.nombre', read_only=True)
    to_string = serializers.SerializerMethodField()

    def get_to_string(self, instance):  # pragma: no cover
        return instance.nombre

    class Meta:
        model = ModalidadFraccionTiempo
        fields = [
            'url',
            'id',
            'to_string',
            'nombre',
            'tipo_vehiculo',
            'tipo_vehiculo_nombre',
            'hora_inicio',
            'tipo_comprobante_contable_empresa',
            'numero_horas',
            'fracciones',
            'impuestos',
            'lunes',
            'martes',
            'miercoles',
            'jueves',
            'viernes',
            'sabado',
            'domingo',
        ]
        read_only_fields = ['fracciones', 'impuestos']


class ModalidadFraccionTiempoDetalleSerializer(serializers.ModelSerializer):
    modalidad_fraccion_tiempo_nombre = serializers.CharField(source='modalidad_fraccion_tiempo.nombre', read_only=True)
    tipo_vehiculo_nombre = serializers.CharField(
        source='modalidad_fraccion_tiempo.tipo_vehiculo.nombre',
        read_only=True
    )
    to_string = serializers.SerializerMethodField()

    def get_to_string(self, instance):  # pragma: no cover
        return '%s para %s' % (instance.minutos, instance.modalidad_fraccion_tiempo.nombre)

    def create(self, validated_data):
        from .services import modalida_fraccion_tiempo_detalle_crear_actualizar
        minutos = validated_data.get('minutos')
        valor = validated_data.get('valor')
        modalidad_fraccion_tiempo = validated_data.get('modalidad_fraccion_tiempo')

        instancia = modalida_fraccion_tiempo_detalle_crear_actualizar(
            minutos=minutos,
            modalidad_fraccion_tiempo_id=modalidad_fraccion_tiempo.id,
            valor=valor
        )
        return instancia

    def update(self, instance, validated_data):
        from .services import modalida_fraccion_tiempo_detalle_crear_actualizar
        minutos = validated_data.get('minutos')
        valor = validated_data.get('valor')
        modalidad_fraccion_tiempo = validated_data.get('modalidad_fraccion_tiempo')
        instancia = modalida_fraccion_tiempo_detalle_crear_actualizar(
            minutos=minutos,
            modalidad_fraccion_tiempo_id=modalidad_fraccion_tiempo.id,
            valor=valor,
            modalidad_fraccion_tiempo_detalle_id=instance.id
        )
        return instancia

    class Meta:
        model = ModalidadFraccionTiempoDetalle
        fields = [
            'url',
            'id',
            'to_string',
            'minutos',
            'valor',
            'valor_antes_impuestos',
            'impuesto',
            'modalidad_fraccion_tiempo',
            'modalidad_fraccion_tiempo_nombre',
            'tipo_vehiculo_nombre',
        ]
        extra_kwargs = {
            'valor_antes_impuestos': {'read_only': True},
            'impuesto': {'read_only': True},
        }


class ModalidadFraccionTiempoConDetalleSerializer(ModalidadFraccionTiempoSerializer):
    impuestos = ImpuestoSerializer(many=True, read_only=True)
    fracciones = ModalidadFraccionTiempoDetalleSerializer(many=True, read_only=True)


class VehiculoSerializer(serializers.ModelSerializer):
    tipo_vehiculo_nombre = serializers.CharField(
        source='tipo_vehiculo.nombre',
        read_only=True
    )
    to_string = serializers.SerializerMethodField()

    def get_to_string(self, instance):  # pragma: no cover
        return '%s %s' % (instance.tipo_vehiculo.nombre, instance.placa)

    class Meta:
        model = Vehiculo
        fields = [
            'url',
            'id',
            'to_string',
            'placa',
            'tipo_vehiculo',
            'tipo_vehiculo_nombre',
        ]
