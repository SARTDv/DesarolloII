from django.urls import path
from .views import SearchView
from .views import ProductDetailView
from .views import AdminProductView

urlpatterns = [
    path('search/', SearchView.as_view(), name='search'),
    path('products/', SearchView.as_view(), name='product-search'),
    path('details/<int:product_id>/', ProductDetailView.as_view(), name='product-detail'),
    #rutas para el admin 
    path('admin/products/', AdminProductView.as_view(), name='product-list'),
    path('admin/products/<int:product_id>/', AdminProductView.as_view(), name='product-detail')
]
