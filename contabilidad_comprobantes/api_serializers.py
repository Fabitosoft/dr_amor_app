from rest_framework import serializers

from .models import TipoComprobanteContable, TipoComprobanteContableEmpresa


class TipoComprobanteContableSerializer(serializers.ModelSerializer):
    to_string = serializers.SerializerMethodField()

    def get_to_string(self, instance):  # pragma: no cover
        return instance.descripcion

    class Meta:
        model = TipoComprobanteContable
        fields = [
            'url',
            'id',
            'codigo_comprobante',
            'tipos_comprobantes_empresas',
            'descripcion',
            'titulo_comprobante',
            'to_string',
        ]
        read_only_fields = ['tipos_comprobantes_empresas']


class TipoComprobanteContableEmpresaSerializer(serializers.ModelSerializer):
    empresa_nombre = serializers.CharField(
        source='empresa.nombre',
        read_only=True
    )
    fecha_autorizacion = serializers.DateField(
        format="%Y-%m-%d",
        input_formats=['%Y-%m-%dT%H:%M:%S.%fZ', 'iso-8601'],
        required=False
    )
    fecha_inicial_vigencia = serializers.DateField(
        format="%Y-%m-%d",
        input_formats=['%Y-%m-%dT%H:%M:%S.%fZ', 'iso-8601'],
        required=False
    )
    fecha_final_vigencia = serializers.DateField(
        format="%Y-%m-%d",
        input_formats=['%Y-%m-%dT%H:%M:%S.%fZ', 'iso-8601'],
        required=False
    )
    to_string = serializers.SerializerMethodField()

    def get_to_string(self, instance):  # pragma: no cover
        return '%s - %s' % (instance.tipo_comprobante.descripcion, instance.empresa.nombre)

    def create(self, validated_data):
        tipo_comprobante = validated_data.get('tipo_comprobante', None)
        empresa = validated_data.get('empresa', None)
        consecutivo_actual = validated_data.get('consecutivo_actual', None)
        rango_inferior_numeracion = validated_data.get('rango_inferior_numeracion', None)
        rango_superior_numeracion = validated_data.get('rango_superior_numeracion', None)
        numero_autorizacion = validated_data.get('numero_autorizacion', None)
        fecha_autorizacion = validated_data.get('fecha_autorizacion', None)
        tiene_vigencia = validated_data.get('tiene_vigencia', False)
        fecha_inicial_vigencia = validated_data.get('fecha_inicial_vigencia', None)
        fecha_final_vigencia = validated_data.get('fecha_final_vigencia', None)
        pais_emision = validated_data.get('pais_emision', None)
        ciudad_emision = validated_data.get('ciudad_emision', None)
        direccion_emision = validated_data.get('direccion_emision', None)
        telefono_emision = validated_data.get('telefono_emision', None)
        from .services import tipo_comprobante_contable_empresa_crear_actualizar
        tipo_comprobante_empresa = tipo_comprobante_contable_empresa_crear_actualizar(
            tipo_comprobante_id=tipo_comprobante.id if tipo_comprobante is not None else None,
            empresa_id=empresa.id if empresa is not None else None,
            consecutivo_actual=consecutivo_actual,
            rango_inferior_numeracion=rango_inferior_numeracion,
            rango_superior_numeracion=rango_superior_numeracion,
            numero_autorizacion=numero_autorizacion,
            fecha_autorizacion=fecha_autorizacion,
            tiene_vigencia=tiene_vigencia,
            fecha_inicial_vigencia=fecha_inicial_vigencia,
            fecha_final_vigencia=fecha_final_vigencia,
            pais_emision=pais_emision,
            ciudad_emision=ciudad_emision,
            direccion_emision=direccion_emision,
            telefono_emision=telefono_emision
        )
        return tipo_comprobante_empresa

    def update(self, instance, validated_data):
        tipo_comprobante = validated_data.get('tipo_comprobante', None)
        empresa = validated_data.get('empresa', None)
        consecutivo_actual = validated_data.get('consecutivo_actual', None)
        rango_inferior_numeracion = validated_data.get('rango_inferior_numeracion', None)
        rango_superior_numeracion = validated_data.get('rango_superior_numeracion', None)
        numero_autorizacion = validated_data.get('numero_autorizacion', None)
        fecha_autorizacion = validated_data.get('fecha_autorizacion', None)
        tiene_vigencia = validated_data.get('tiene_vigencia', False)
        fecha_inicial_vigencia = validated_data.get('fecha_inicial_vigencia', None)
        fecha_final_vigencia = validated_data.get('fecha_final_vigencia', None)
        pais_emision = validated_data.get('pais_emision', None)
        ciudad_emision = validated_data.get('ciudad_emision', None)
        direccion_emision = validated_data.get('direccion_emision', None)
        telefono_emision = validated_data.get('telefono_emision', None)
        from .services import tipo_comprobante_contable_empresa_crear_actualizar
        tipo_comprobante_empresa = tipo_comprobante_contable_empresa_crear_actualizar(
            tipo_comprobante_empresa_id=instance.id,
            tipo_comprobante_id=tipo_comprobante.id if tipo_comprobante is not None else None,
            empresa_id=empresa.id if empresa is not None else None,
            consecutivo_actual=consecutivo_actual,
            rango_inferior_numeracion=rango_inferior_numeracion,
            rango_superior_numeracion=rango_superior_numeracion,
            numero_autorizacion=numero_autorizacion,
            fecha_autorizacion=fecha_autorizacion,
            tiene_vigencia=tiene_vigencia,
            fecha_inicial_vigencia=fecha_inicial_vigencia,
            fecha_final_vigencia=fecha_final_vigencia,
            pais_emision=pais_emision,
            ciudad_emision=ciudad_emision,
            direccion_emision=direccion_emision,
            telefono_emision=telefono_emision
        )
        return tipo_comprobante_empresa

    class Meta:
        model = TipoComprobanteContableEmpresa
        fields = [
            'url',
            'id',
            'empresa_nombre',
            'tipo_comprobante',
            'consecutivo_actual',
            'numero_autorizacion',
            'fecha_autorizacion',
            'rango_inferior_numeracion',
            'rango_superior_numeracion',
            'fecha_inicial_vigencia',
            'fecha_final_vigencia',
            'pais_emision',
            'ciudad_emision',
            'direccion_emision',
            'telefono_emision',
            'to_string',
            'empresa',
            'tiene_vigencia',
        ]


class TipoComprobanteContableDetalleSerializer(TipoComprobanteContableSerializer):
    tipos_comprobantes_empresas = TipoComprobanteContableEmpresaSerializer(many=True, read_only=True)
