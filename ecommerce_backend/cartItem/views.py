from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import CartItem, Product
from .serializers import CartItemSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework.views import APIView

class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        try:
            cart_items = CartItem.objects.filter(user=user)

            serialized_data = [
                {
                    'id': item.id,
                    'product': {
                        'id' : item.product.id,
                        'name': item.product.name,
                        'price': item.product.price,
                        'imageurl': item.product.imageurl,
                    },
                    'quantity': item.quantity,
                }
                for item in cart_items
            ]
            return Response(serialized_data, status=200)
        except Exception as e:
            print(e)
            return Response({'error': 'Error fetching cart items'}, status=500)

class AddToCartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        user = request.user

        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)
        try:
            product = Product.objects.get(id=product_id)
            cart_item, created = CartItem.objects.get_or_create(
                user=user, 
                product=product,
                defaults={'quantity': quantity}
            )
            if not created:
                cart_item.quantity += quantity
                cart_item.save()
            return Response({'message': 'Product added to cart'}, status=status.HTTP_200_OK)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

class RemoveFromCartView(APIView):
    #permission_classes = [IsAuthenticated]

    def post(self, request):
        product_id = request.data.get('product_id')
        user = request.user

        try:
            # Eliminar el producto del carrito del usuario
            cart_item = CartItem.objects.get(user=user, product_id=product_id)
            cart_item.delete()
            return Response({"success": True})
        except CartItem.DoesNotExist:
            return Response({"success": False, "message": "Item not found in cart"})