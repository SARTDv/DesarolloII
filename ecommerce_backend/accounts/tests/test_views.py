from .test_setup import AccountsTestSetup
from unittest.mock import patch

class TestAccountsViews(AccountsTestSetup):

    @patch("accounts.views.requests.post")
    def test_register_success(self, mock_post):
        # Simula respuesta exitosa de Google reCAPTCHA
        mock_post.return_value.json.return_value = {"success": True}
        data = {
            "username": "newuser",
            "password": "newpassword123",
            "email": "newuser@example.com",
            "g-recaptcha-response": "dummy"
        }
        response = self.client.post(self.register_url, data)
        self.assertEqual(response.status_code, 201)
        self.assertIn("username", response.data)

    @patch("accounts.views.requests.post")
    def test_register_fail_captcha(self, mock_post):
        mock_post.return_value.json.return_value = {"success": False}
        data = {
            "username": "failuser",
            "password": "failpassword123",
            "email": "failuser@example.com",
            "g-recaptcha-response": "dummy"
        }
        response = self.client.post(self.register_url, data)
        self.assertEqual(response.status_code, 400)
        self.assertIn("error", response.data)

    @patch("accounts.views.requests.post")
    def test_login_success(self, mock_post):
        # Marca el usuario como verificado
        self.user.is_email_verified = True
        self.user.save()
        mock_post.return_value.json.return_value = {"success": True}
        data = {
            "username": self.user.username,
            "password": "testpassword123",
            "g-recaptcha-response": "dummy"
        }
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, 200)
        self.assertIn("token", response.data)

    @patch("accounts.views.requests.post")
    def test_login_fail_unverified_email(self, mock_post):
        mock_post.return_value.json.return_value = {"success": True}
        data = {
            "username": self.user.username,
            "password": "testpassword123",
            "g-recaptcha-response": "dummy"
        }
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, 403)
        self.assertIn("error", response.data)