import requests
from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import CustomUser
from .serializers import UserSerializer
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.conf import settings
from .serializers import LoginSerializer,CustomUserSerializer
from rest_framework.permissions import AllowAny,IsAuthenticated

class RegisterView(APIView):

    permission_classes = [AllowAny]
    
    def post(self, request):
         
        captcha_response = request.data.get('g-recaptcha-response')

        if not captcha_response:        
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

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):
        # Verificación de Captcha
        captcha_response = request.data.get('g-recaptcha-response')
        if not captcha_response:
            return Response({'error': 'Captcha no completado'}, status=400)
        
        # Validación de datos
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data.get("username")
            password = serializer.validated_data.get("password")
            
            # Autenticación
            user = authenticate(username=username, password=password)
            
            # Verificación de email
            if user is not None:
                if not user.is_email_verified:
                    return Response({
                        "error": "Por favor, verifica tu correo electrónico"
                    }, status=403)
                
                # Generar token de autenticación
                token, _ = Token.objects.get_or_create(user=user)
                return Response({"token": token.key}, status=200)
            
            return Response({"error": "Credenciales inválidas"}, status=401)

        return Response(serializer.errors, status=400)


#view para la verificacion de email 
class VerifyEmailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        token = request.GET.get('token')
        try:
            user = CustomUser.objects.get(email_verification_token=token)
            user.is_email_verified = True
            user.save()
            return Response({
                'message': 'Email verificado exitosamente'
            }, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response({
                'error': 'Token de verificación inválido'
            }, status=status.HTTP_400_BAD_REQUEST)

class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user  
        serializer = CustomUserSerializer(user)
        return Response(serializer.data)