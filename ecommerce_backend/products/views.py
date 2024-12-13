from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q
from .models import Product
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.permissions import IsAuthenticated, AllowAny,IsAdminUser
from .serializers import ProductSerializer  # Importa el serializer


#se modifico por que no estaba usando serializers revisar que todo funcione correctamente 
class SearchView(APIView):

    permission_classes = [AllowAny]

    def get(self, request):
        # Obtener los parámetros de consulta
        category = request.query_params.get('category', None)
        if category == "Ninguna":
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

        # Filtro por rango de precios
        if min_price:
            products = products.filter(price__gte=min_price)
        if max_price:
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
        serializer = ProductSerializer(products_page, many=True)

        # Respuesta con datos de paginación
        return Response({
            "products": serializer.data,
            "total_pages": paginator.num_pages,
            "current_page": int(page),
            "total_products": paginator.count,
        })

#view para ver los detalles de un producto 
class ProductDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, product_id):
        try:
            # Recuperar el producto por ID
            product = Product.objects.get(id=product_id)

            # Serializar los datos del producto
            serializer = ProductSerializer(product)

            return Response(serializer.data)
        except Product.DoesNotExist:
            # Si el producto no existe, devolver un error 404
            return Response({"error": "Producto no encontrado"}, status=status.HTTP_404_NOT_FOUND)

#view para que el admin pueda realizar las operaciones crud sobre la tabla de productos       
class AdminProductView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, product_id=None):
        if product_id:
            # Obtener un producto específico
            product = get_object_or_404(Product, id=product_id)
            serializer = ProductSerializer(product)
            return Response(serializer.data)
        else:
            # Obtener todos los productos
            products = Product.objects.all()
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data)

    def post(self, request):
        # Crear un nuevo producto
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, product_id):
        # Actualizar un producto existente
        product = get_object_or_404(Product, id=product_id)
        serializer = ProductSerializer(product, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, product_id):
        # Eliminar un producto
        product = get_object_or_404(Product, id=product_id)
        product.delete()
        return Response({"message": "Producto eliminado exitosamente"}, status=status.HTTP_204_NO_CONTENT)
