from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from django.urls import reverse
from orders.models import Order

User = get_user_model()

class OrderUpdateStatusTest(APITestCase):
    def setUp(self):
        # Crear un usuario de prueba
        self.user = User.objects.create_user(username='testuser', password='testpass')

        # Crear y asignar un token de autenticación al usuario
        self.token = Token.objects.create(user=self.user)

        # Incluir el token en los headers de autenticación del cliente
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        # Crear una orden con estado 'pending' asociada al usuario
        self.order = Order.objects.create(user=self.user, status='pending')

        # Construir la URL usando el nombre de la ruta
        self.url = reverse('update_order_status', kwargs={'pk': self.order.id})

    def test_update_order_status(self):
        # Datos del nuevo estado a enviar
        data = {'status': 'shipped'}

        # Realizar la petición PATCH
        response = self.client.patch(self.url, data, format='json')

        # Refrescar la instancia desde la base de datos
        self.order.refresh_from_db()

        # Verificar que el estado HTTP sea 200 OK
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Verificar que el estado de la orden se haya actualizado correctamente
        self.assertEqual(self.order.status, 'shipped')

        # Verificar que la respuesta contenga el nuevo estado
        self.assertEqual(response.data['status'], 'shipped')
