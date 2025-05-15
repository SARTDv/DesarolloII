from rest_framework.test import APITestCase
from django.urls import reverse
from django.contrib.auth import get_user_model

class AccountsTestSetup(APITestCase):
    def setUp(self):
        self.register_url = reverse('register')  # Asegúrate que el nombre de la url sea correcto
        self.login_url = reverse('login')        # Asegúrate que el nombre de la url sea correcto

        self.user_data = {
            "username": "testuser",
            "password": "testpassword123",
            "email": "testuser@example.com"
        }

        self.user = self.create_user(**self.user_data)
        return super().setUp()

    def tearDown(self):
        return super().tearDown()

    def create_user(self, username, password, email):
        User = get_user_model()
        return User.objects.create_user(username=username, password=password, email=email)