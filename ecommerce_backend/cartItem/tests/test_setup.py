from rest_framework.test import APITestCase, APIClient
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
from cartItem.models import CartItem, Product

User = get_user_model()

class CartViewTestSetup(APITestCase):

    def setUp(self):
        # Crear usuario
        self.user = User.objects.create_user(username='testuser', password='testpass123')

        # Crear token para autenticación
        self.token = Token.objects.create(user=self.user)
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        # Crear productos
        self.product1 = Product.objects.create(name="Producto 1", price=10.99, stock=50, imageurl="http://example.com/img1.jpg")
        self.product2 = Product.objects.create(name="Producto 2", price=5.50, stock=55, imageurl="http://example.com/img2.jpg")

        # Agregar ítems al carrito
        self.cart_item1 = CartItem.objects.create(user=self.user, product=self.product1, quantity=2)
        self.cart_item2 = CartItem.objects.create(user=self.user, product=self.product2, quantity=1)

        # Endpoints
        self.show_cart_url = "/api/cart/Showcart/"
        self.add_to_cart_url = "/api/cart/addToCart/"
        self.remove_from_cart_url = "/api/cart/Remove/"


