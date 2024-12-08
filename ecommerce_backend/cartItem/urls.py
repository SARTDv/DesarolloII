from django.urls import path
from .views import AddToCartView,CartView,RemoveFromCartView

urlpatterns = [
    path('addToCart/', AddToCartView.as_view(), name='addToCart'),
    path('Showcart/', CartView.as_view(), name='Showcart'),
    path('Remove/',RemoveFromCartView.as_view(),name ='remove')
]
