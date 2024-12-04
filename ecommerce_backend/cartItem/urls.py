from django.urls import path
from .views import AddToCartView,CartView

urlpatterns = [
    path('addToCart/', AddToCartView.as_view(), name='addToCart'),
    path('Showcart/', CartView.as_view(), name='Showcart'),
]
