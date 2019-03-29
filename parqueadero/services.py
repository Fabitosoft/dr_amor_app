from django.utils import timezone
from rest_framework import serializers
from .models import (
    ModalidadFraccionTiempoDetalle,
    ModalidadFraccionTiempo,
    RegistroEntradaParqueo,
    TipoVehiculo,
    Vehiculo
)


def validar_tiempos_valores_por_modalidad_fraccion_tiempo(
        qs,
        minutos: int,
        valor: int
) -> bool:
    if qs.filter(minutos=minutos).exists():
        raise serializers.ValidationError(
            {'_error': 'Ya existe un valor de tarifa definido para %s minutos.' % minutos})

    if qs.filter(valor__gt=valor, minutos__lt=minutos).exists():
        raise serializers.ValidationError(
            {
                '_error': 'Existe un valor mayor a %s para una tarifa con minutos inferiores a %s. Revisar y asignar correctamente' % (
                    valor, minutos)})

    if qs.filter(valor__lt=valor, minutos__gt=minutos).exists():
        raise serializers.ValidationError(
            {
                '_error': 'Existe un valor menor a %s para una tarifa con minutos mayores a %s. Revisar y asignar correctamente' % (
                    valor, minutos)})
    return True


def modalida_fraccion_tiempo_detalle_crear_actualizar(
        modalidad_fraccion_tiempo_id: int,
        minutos: int,
        valor: int,
        modalidad_fraccion_tiempo_detalle_id: int = None
) -> ModalidadFraccionTiempoDetalle:
    if valor < 0:
        raise serializers.ValidationError({'_error': 'El valor digitado debe ser positivo'})

    modalidad_fraccion_tiempo = ModalidadFraccionTiempo.objects.get(pk=modalidad_fraccion_tiempo_id)
    detalles = modalidad_fraccion_tiempo.fracciones.filter()
    if modalidad_fraccion_tiempo_detalle_id:
        detalles = detalles.exclude(pk=modalidad_fraccion_tiempo_detalle_id)

    validar_tiempos_valores_por_modalidad_fraccion_tiempo(
        qs=detalles,
        minutos=minutos,
        valor=valor
    )
    if modalidad_fraccion_tiempo_detalle_id:
        modalidad_fraccion_tiempo_detalle = ModalidadFraccionTiempoDetalle.objects.get(
            pk=modalidad_fraccion_tiempo_detalle_id
        )
        modalidad_fraccion_tiempo_detalle.valor = valor
        modalidad_fraccion_tiempo_detalle.minutos = minutos
        modalidad_fraccion_tiempo.save()
        return modalidad_fraccion_tiempo_detalle
    else:
        return ModalidadFraccionTiempoDetalle.objects.create(
            modalidad_fraccion_tiempo_id=modalidad_fraccion_tiempo_id,
            minutos=minutos,
            valor=valor
        )


def registro_entrada_parqueo_crear(
        punto_venta_turno_id: int,
        modalidad_fraccion_tiempo_id: int,
        placa: str = None
) -> RegistroEntradaParqueo:
    modalidad_fraccion_tiempo = ModalidadFraccionTiempo.objects.get(pk=modalidad_fraccion_tiempo_id)
    tipo_vehiculo = modalidad_fraccion_tiempo.tipo_vehiculo
    if tipo_vehiculo.tiene_placa and not placa:
        raise serializers.ValidationError({'_error': 'Faltó digitar la placa del vehiculo'})

    if not tipo_vehiculo.tiene_placa and placa:
        raise serializers.ValidationError({'_error': 'Este tipo de vehiculo no requiere placa, seleccione el correcto'})

    if not placa:
        return RegistroEntradaParqueo.objects.create(
            punto_venta_turno_id=punto_venta_turno_id,
            modalidad_fraccion_tiempo_id=modalidad_fraccion_tiempo_id,
            codigo_qr='Aqui el codigo que vamos a generar',
            hora_ingreso=timezone.now()
        )
    else:
        placa = placa.replace(" ", "")
        vehiculo, created = Vehiculo.objects.get_or_create(
            tipo_vehiculo_id=tipo_vehiculo.id,
            placa=placa
        )
        return RegistroEntradaParqueo.objects.create(
            punto_venta_turno_id=punto_venta_turno_id,
            modalidad_fraccion_tiempo_id=modalidad_fraccion_tiempo_id,
            vehiculo=vehiculo,
            hora_ingreso=timezone.now(),
            codigo_qr='Aqui el codigo que vamos a generar'
        )


def registro_entrada_parqueo_calcular_pago(
        registro_entrada_parqueo_id: int
) -> [int, ModalidadFraccionTiempoDetalle, timezone]:
    registro_entrada_parqueo = RegistroEntradaParqueo.objects.get(pk=registro_entrada_parqueo_id)
    hora_actual = timezone.now()
    hora_inicial = registro_entrada_parqueo.hora_ingreso
    minutos = ((hora_actual - hora_inicial).seconds / 60)
    modalidad = registro_entrada_parqueo.modalidad_fraccion_tiempo
    if not modalidad.fracciones.filter(minutos__lte=minutos).exists():
        tarifa = modalidad.fracciones.order_by('minutos')[:1].first()
    elif not modalidad.fracciones.filter(minutos__gte=minutos).exists():
        tarifa = modalidad.fracciones.order_by('-minutos')[:1].first()
    else:
        tarifas = modalidad.fracciones.filter(
            minutos__gte=minutos
        )
        tarifa = tarifas.order_by('minutos')[:1].first()
    return minutos, tarifa, hora_actual


def registro_entrada_parqueo_registrar_salida(
        registro_entrada_parqueo_id: int,
        punto_venta_turno_id: int
) -> RegistroEntradaParqueo:
    from .models import RegistroEntradaParqueo
    from cajas.services import transaccion_caja_registrar_venta_parqueadero

    registro_entrada_parqueo = RegistroEntradaParqueo.objects.get(pk=registro_entrada_parqueo_id)
    minutos, tarifa, hora_actual = registro_entrada_parqueo_calcular_pago(
        registro_entrada_parqueo_id=registro_entrada_parqueo_id
    )
    concepto = 'Cobro por parqueo para %s %s' % (tarifa.tipo_vehiculo_nombre, registro_entrada_parqueo.vehiculo.placa)
    registro_entrada_parqueo.hora_salida = hora_actual
    registro_entrada_parqueo.valor_parqueadero = tarifa.valor_antes_impuestos
    registro_entrada_parqueo.valor_iva_parqueadero = tarifa.impuesto_iva
    registro_entrada_parqueo.valor_impuesto_unico = tarifa.valor_unico_impuesto
    registro_entrada_parqueo.detalle = concepto
    registro_entrada_parqueo.save()

    if registro_entrada_parqueo.valor_total != tarifa.valor:
        raise serializers.ValidationError(
            {
                '_error': 'Los valores calculados de tarifa y pago de parqueadero no coinciden. El valor de la tarifa es %s y el ingresado a pagar %s' % (
                    tarifa.valor,
                    registro_entrada_parqueo.valor_total
                )
            }
        )
    transaccion_caja_registrar_venta_parqueadero(
        registro_entrada_parqueo_id=registro_entrada_parqueo.id,
        punto_venta_turno_id=punto_venta_turno_id,
        concepto=concepto,
        valor_efectivo=registro_entrada_parqueo.valor_total
    )
    return registro_entrada_parqueo
