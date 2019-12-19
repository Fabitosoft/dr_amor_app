from django.contrib.auth.models import User
from knox.settings import knox_settings
from rest_framework import viewsets, permissions, serializers
from rest_framework.decorators import action
from rest_framework.response import Response

from dr_amor_app.custom_permissions import DjangoModelPermissionsFull
from usuarios.services import (
    user_cambiar_contrasena,
)
from .api_serializers import UsuarioSerializer, LoginUserSerializer, UsuarioConDetalleSerializer


class UsuarioViewSet(viewsets.ModelViewSet):
    permission_classes = [DjangoModelPermissionsFull]
    queryset = User.objects.select_related(
        'tercero',
        'punto_venta_actual'
    ).all()
    serializer_class = UsuarioSerializer

    def retrieve(self, request, *args, **kwargs):
        self.serializer_class = UsuarioConDetalleSerializer
        return super().retrieve(request, *args, **kwargs)

    @action(detail=True, methods=['post'])
    def adicionar_permiso(self, request, pk=None):
        usuario = self.get_object()
        from usuarios.services import adicionar_permiso
        id_permiso = int(request.POST.get('id_permiso'))
        usuario = adicionar_permiso(
            permiso_id=id_permiso,
            user_id=usuario.id
        )
        serializer = self.get_serializer(usuario)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def adicionar_grupo(self, request, pk=None):
        usuario = self.get_object()
        id_grupo = int(request.POST.get('id_grupo'))
        from usuarios.services import adicionar_grupo
        usuario = adicionar_grupo(
            grupo_id=id_grupo,
            user_id=usuario.id
        )
        serializer = self.get_serializer(usuario)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def cambiar_contrasena(self, request, pk=None):
        usuario = self.get_object()
        password_old = request.POST.get('password_old')
        password = request.POST.get('password')
        password_2 = request.POST.get('password_2')
        user_cambiar_contrasena(usuario.id, password_old, password, password_2)
        return Response({'result': 'La contraseña se ha cambiado correctamente'})

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def validar_nuevo_usuario(self, request) -> Response:
        validacion_reponse = {}
        from usuarios.services import usuario_existe_username
        username = self.request.GET.get('username', None)
        resultado = usuario_existe_username(username=username)
        if resultado:
            raise serializers.ValidationError({'username': 'Ya exite'})
        return Response(validacion_reponse)

    @action(detail=False, methods=['get'], permission_classes=[permissions.AllowAny])
    def validar_username_login(self, request) -> Response:
        from usuarios.services import usuario_existe_username
        validacion_reponse = {}
        username = self.request.GET.get('username', None)
        resultado = usuario_existe_username(username=username)
        if not resultado:
            raise serializers.ValidationError({'username': 'Este usuario no existe'})
        return Response(validacion_reponse)


class LoginViewSet(viewsets.ModelViewSet):
    serializer_class = LoginUserSerializer
    queryset = User.objects.all()

    @action(detail=False, methods=['post'], permission_classes=[permissions.AllowAny])
    def login(self, request) -> Response:
        from .services import usuario_obtener_token
        serializer = self.get_serializer(data=self.request.POST)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        token = usuario_obtener_token(usuario_id=user.id)
        UserSerializer = knox_settings.USER_SERIALIZER
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token
        })

    @action(detail=False, methods=['get'], permission_classes=[permissions.AllowAny, ])
    def cargar_usuario(self, request) -> Response:
        if self.request.user.is_anonymous:
            serializer = UsuarioConDetalleSerializer(None, context={'request': request})
            return Response(serializer.data)
        serializer = UsuarioConDetalleSerializer(self.request.user, context={'request': request})
        return Response(serializer.data)
