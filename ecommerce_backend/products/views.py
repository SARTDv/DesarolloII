from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q
from .models import Product
from rest_framework import status


# View para obtener los productos por busqueda 
class SearchView(APIView):
    def get(self, request):
        # Obtener los parámetros de consulta
        category = request.query_params.get('category', None)
        keyword = request.query_params.get('keyword', None)

        # Consulta base
        products = Product.objects.all()

        # Filtrar por categoría si se proporciona
        if category:
            products = products.filter(category__icontains=category)

        # Filtrar por palabra clave si se proporciona
        if keyword:
            products = products.filter(
                Q(name__icontains=keyword) | Q(description__icontains=keyword)
            )

        # Serializar los resultados
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
            for product in products
        ]

        return Response({"products": results})

# viem para obtner los detalles de un producto 
class ProductDetailView(APIView):
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