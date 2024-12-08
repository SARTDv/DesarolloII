from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q
from .models import Product
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.permissions import IsAuthenticated,AllowAny

    
class SearchView(APIView):

    permission_classes = [AllowAny]                                   # no se si dejar esto asi 
    def get(self, request):
        # Obtener los parámetros de consulta
        category = request.query_params.get('category', None)
        if (category == "Ninguna"):
            category = None
        keyword = request.query_params.get('keyword', None)
        page = request.query_params.get('page', 1)
        page_size = request.query_params.get('page_size', 8)  # Por defecto 8 productos por página
        min_price = request.query_params.get('min_price', None)
        max_price = request.query_params.get('max_price', None)
        

        # Crear consulta base
        products = Product.objects.all()
        # Filtro por categoría (si existe)
        if category:
            products = products.filter(category__icontains=category)
        # Filtro por palabra clave en nombre o descripción
        if keyword:
            products = products.filter(
                Q(name__icontains=keyword) | Q(description__icontains=keyword)
            )
        if min_price:
            if (min_price != 10 and max_price != 1000):
                products = products.filter(price__gte=min_price)
                products = products.filter(price__lte=max_price)
        # Configuración de la paginación
        paginator = Paginator(products, page_size)
        try:
            products_page = paginator.page(page)
        except PageNotAnInteger:
            return Response({"error": "Invalid page number, must be an integer."}, status=400)
        except EmptyPage:
            return Response({"error": "Page number out of range."}, status=404)
        # Serialización de productos
        results = [
            {
                "id": product.id,
                "name": product.name,
                "category": product.category,
                "brand": product.brand,
                "price": float(product.price),
                "stock": product.stock,
                "imageurl": product.imageurl,
            }
            for product in products_page
        ]
        # Respuesta con datos de paginación
        return Response({
            "products": results,
            "total_pages": paginator.num_pages,
            "current_page": int(page),
            "total_products": paginator.count,
        })

# viem para obtner los detalles de un producto 
class ProductDetailView(APIView):
    permission_classes = [IsAuthenticated]  

    def get(self, request, product_id):
        try:
            # Recuperar el producto por ID
            product = Product.objects.get(id=product_id)
            
            # Serializar los datos del producto
            product_data = {
                "id": product.id,
                "name": product.name,
                "category": product.category,
                "brand": product.brand,
                "price": float(product.price),
                "stock": product.stock,
                "imageurl": product.imageurl,
                "description": product.description,
            }

            return Response(product_data)
        except Product.DoesNotExist:
            # Si el producto no existe, devolver un error 404
            return Response({"error": "Producto no encontrado"}, status=status.HTTP_404_NOT_FOUND)