from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q
from .models import Product

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
