from rest_framework.test import APITestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from products.models import Product
from orders.models import Order, OrderItem
from shippinfo.models import ShipInfo

class TestSetup(APITestCase):
    def setUp(self):
        # Set up URLs for testing
        self.check_pending_order_url = reverse('chekpending')
        
        # Create a test user
        self.user = self.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)

        # Create a test product
        self.product = self.create_product(
            name='Test Product', 
            description='Test product description',
            brand='Test Brand',
            category='Test Category',
            price=10.00,
            stock=100,
            imageurl='http://example.com/image.jpg'
        )

        # Create shipping information
        self.ship_info = self.create_ship_info(
            first_name='Test',
            last_name='User',
            address='123 Test St',
            town='Test Town',
            zip_code='12345',
            phone_num='1234567890'
        )

        # Create a test order
        self.order = self.create_order(
            user=self.user,
            ship_info=self.ship_info,
            status='pending'
        )

        # Create order item
        self.order_item = self.create_order_item(
            order=self.order,
            product=self.product,
            quantity=1,
            price=10.00
        )

        return super().setUp()

    def tearDown(self):
        return super().tearDown()

    def create_user(self, username, password):
        """Create a test user using the CustomUser model"""
        User = get_user_model()
        user = User.objects.create_user(
            username=username,
            password=password,
            email=f'{username}@example.com'
        )
        return user

    def create_product(self, name, description, brand, category, price, stock, imageurl):
        """Create a test product using the Product model"""
        return Product.objects.create(
            name=name,
            description=description,
            brand=brand,
            category=category,
            price=price,
            stock=stock,
            imageurl=imageurl
        )

    def create_ship_info(self, first_name, last_name, address, town, zip_code, phone_num):
        """Create a test shipping info using the ShipInfo model"""
        return ShipInfo.objects.create(
            first_name=first_name,
            last_name=last_name,
            address=address,
            town=town,
            zip_code=zip_code,
            phone_num=phone_num
        )

    def create_order(self, user, ship_info, status):
        """Create a test order using the Order model"""
        return Order.objects.create(
            user=user,
            shippingaddress=f"{ship_info.address}, {ship_info.town}",
            status=status,
            total_price=0,  # Will be updated when order items are added
            ship_info=ship_info
        )

    def create_order_item(self, order, product, quantity, price):
        """Create a test order item using the OrderItem model"""
        order_item = OrderItem.objects.create(
            order=order,
            product=product,
            quantity=quantity,
            price=price
        )
        # Update order total price
        order.total_price += float(price) * quantity
        order.save()
        return order_item