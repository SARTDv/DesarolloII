from django.urls import path
from .views import SearchView
from .views import ProductDetailView

urlpatterns = [
    path('search/', SearchView.as_view(), name='search'),
    path('details/<int:product_id>/', ProductDetailView.as_view(), name='product-detail')
]
