from .api_routers import DefaultRouter
from permisos.api_urls import router as permisos_router
from usuarios.api_urls import router as usuarios_router
from terceros.api_urls import router as terceros_router
from terceros_acompanantes.api_urls import router as terceros_acompanante_router
from empresas.api_urls import router as empresas_router
from habitaciones.api_urls import router as habitaciones_router
from productos.api_urls import router as productos_router
from inventarios.api_urls import router as inventarios_router
from puntos_venta.api_urls import router as puntos_ventas_router
from servicios.api_urls import router as servicios_router
from cajas.api_urls import router as cajas_router
from ventas.api_urls import router as ventas_router

router = DefaultRouter()
router.extend(permisos_router)
router.extend(usuarios_router)
router.extend(terceros_router)
router.extend(terceros_acompanante_router)
router.extend(empresas_router)
router.extend(habitaciones_router)
router.extend(productos_router)
router.extend(inventarios_router)
router.extend(puntos_ventas_router)
router.extend(servicios_router)
router.extend(cajas_router)
router.extend(ventas_router)
