from cartItem.tests.test_setup import CartViewTestSetup  #Trae el setup
from rest_framework import status # Importa el status de la libreria rest_framework para mayor legibilidad

class CartViewTests(CartViewTestSetup): #Se define la clase CartViewTests que hereda de CartViewTestSetup

    def test_get_cart_items_authenticated(self): # Función de prueba
        response = self.client.post(self.show_cart_url)  #Simula que el cliente autenticado hace una petición POST a la URL del carrito
        self.assertEqual(response.status_code, status.HTTP_200_OK) #Verifica que el servidor responde con un código 200 OK
        self.assertEqual(len(response.data), 2)  #Verifica que tal como está en setup se reciban 2 productos
