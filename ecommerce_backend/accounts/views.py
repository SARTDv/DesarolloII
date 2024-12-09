import requests
from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.conf import settings
from .serializers import LoginSerializer
from rest_framework.permissions import AllowAny

class RegisterView(APIView):

    permission_classes = [AllowAny]
    
    def post(self, request):
         
        captcha_response = request.data.get('g-recaptcha-response')

        if not captcha_response:           # antes de captcha va un not lo quite para pruebas 
           return Response({'error': 'Captcha no completado'}, status=400)
        
        # Verifica el CAPTCHA con el servicio de Google
        captcha_secret = settings.RECAPTCHA_PRIVATE_KEY
        payload = {
            'secret': captcha_secret,
            'response': captcha_response
        }

        # Hacer la solicitud POST al servidor de Google reCAPTCHA
        captcha_verify_url = 'https://www.google.com/recaptcha/api/siteverify'
        response = requests.post(captcha_verify_url, data=payload)
        result = response.json()

        # Si el CAPTCHA no es válido, devuelve un error
        if not result.get('success'):

            return Response({'error': 'Captcha inválido'}, status=400)
        

        serializer = UserSerializer(data=request.data)
        # Necesito que muestre si el username es unico, de no ser asi error 29
        # Igual para el correo electronico y su  unicidad
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):
        # Obtén el valor del CAPTCHA de la solicitud
        captcha_response = request.data.get('g-recaptcha-response')

        if not captcha_response:  # Verifica si el CAPTCHA está presente
            return Response({'error': 'Captcha no completado'}, status=status.HTTP_400_BAD_REQUEST)

        # Verifica el CAPTCHA con el servicio de Google
        captcha_secret = settings.RECAPTCHA_PRIVATE_KEY
        payload = {
            'secret': captcha_secret,
            'response': captcha_response
        }

        # Hacer la solicitud POST al servidor de Google reCAPTCHA
        captcha_verify_url = 'https://www.google.com/recaptcha/api/siteverify'
        response = requests.post(captcha_verify_url, data=payload)
        result = response.json()

        # Si el CAPTCHA no es válido, devuelve un error
        if not result.get('success'):
            return Response({'error': 'Captcha inválido'}, status=status.HTTP_400_BAD_REQUEST)

        # Si el CAPTCHA es válido, procedemos con la autenticación del usuario
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data.get("username")
            password = serializer.validated_data.get("password")
            user = authenticate(username=username, password=password)
            if user is not None:
                token, _ = Token.objects.get_or_create(user=user)
                return Response({"token": token.key}, status=status.HTTP_200_OK)
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
