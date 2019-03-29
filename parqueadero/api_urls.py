from rest_framework import routers
from .api_views import (
    TipoVehiculoViewSet,
    VehiculoViewSet,
    ModalidadFraccionTiempoViewSet,
    ModalidadFraccionTiempoDetalleViewSet,
    RegistroEntradaParqueoViewSet
)

router = routers.DefaultRouter()
router.register(r'parqueadero_vehiculos', VehiculoViewSet)
router.register(r'parqueadero_tipos_vehiculos', TipoVehiculoViewSet)
router.register(r'parqueadero_registros_entradas_parqueos', RegistroEntradaParqueoViewSet)
router.register(r'parqueadero_modalidades_fracciones_tiempos', ModalidadFraccionTiempoViewSet)
router.register(r'parqueadero_modalidades_fracciones_tiempos_detalles', ModalidadFraccionTiempoDetalleViewSet)
