# accounts/serializers.py

import re
from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.serializers import Serializer, CharField
from rest_framework.authtoken.models import Token
from rest_framework.validators import UniqueValidator
#para verificaion email 
from django.core.mail import send_mail
from django.conf import settings
import uuid

CustomUser = get_user_model()

# VALIDACION DE DATOS DESDE EL BACKEND 

def validate_password_length(value):
    if len(value) < 8:
        raise serializers.ValidationError("La contraseña debe tener al menos 8 caracteres.")
    return value

def validate_username(value):
    if not value.isalnum():
        raise serializers.ValidationError("El nombre de usuario solo debe contener letras y números.")
    return value

class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        validators=[
            UniqueValidator(queryset=CustomUser.objects.all()),  # Validar unicidad
            validate_username  # Validar contenido
        ]
    )
    password = serializers.CharField(
        write_only=True,
        validators=[validate_password_length]  # Validar longitud
    )


    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'password','email')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data, is_email_verified=False)
        Token.objects.create(user=user)
        #verificaion email 
        send_verification_email(user)

        return user

class LoginSerializer(Serializer):
    username = CharField(required=True)
    password = CharField(required=True, write_only=True)


def send_verification_email(user):
    # Generar token de verificación único
    verification_token = str(uuid.uuid4())
    
    # Guardar token en el modelo de usuario
    user.email_verification_token = verification_token
    user.save()
    
    # Construir enlace de verificación
    verification_link = f"{settings.FRONTEND_URL}/verify-email?token={verification_token}"
    
    # Enviar email
    send_mail(
        'Verifica tu cuenta',
        f'Haz clic en el siguiente enlace para verificar tu correo electrónico:\n{verification_link}',
        settings.DEFAULT_FROM_EMAIL,
        [user.email],
        fail_silently=False,
    )

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'is_staff']