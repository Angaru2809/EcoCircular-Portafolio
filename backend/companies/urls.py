from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import CompanyViewSet, MaterialListingViewSet, health

# Crea un router para registrar rutas REST automaticamente.
router = DefaultRouter()

# Registra las rutas de empresas.
router.register(r"companies", CompanyViewSet, basename="companies")

# Registra las rutas de publicaciones de materiales.
router.register(r"materials", MaterialListingViewSet, basename="materials")

# Expone las rutas publicas de la app.
urlpatterns = [
    path("health/", health),
    path("", include(router.urls)),
]
