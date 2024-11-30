from django.urls import path
from .views import AddToCartView

urlpatterns = [
    path('addToCart/', AddToCartView.as_view(), name='addToCart'),
    
]
