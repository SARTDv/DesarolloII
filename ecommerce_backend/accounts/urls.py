# accounts/urls.py

from django.urls import path
from .views import RegisterView, LoginView,VerifyEmailView,UserDetailView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('verify-email/', VerifyEmailView.as_view(), name='verify_email'),
    path('user-detail/', UserDetailView.as_view(), name='user-detail'),

]
