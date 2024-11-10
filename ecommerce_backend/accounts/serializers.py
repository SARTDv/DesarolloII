# accounts/serializers.py
# accounts/serializers.py
import re
from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.validators import UniqueValidator



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
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user

