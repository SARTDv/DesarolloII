from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import OrderSerializer,PendingOrderSerializer,OrderListSerializer,OrderStatusUpdateSerializer,AOrderSerializer
from .models import Order                                      
from django.db import transaction 
from shippinfo.models import ShipInfo
from shippinfo.serializers import ShipInfoSerializer


#view que crea una orden solo necesita el id del usuario 
class CreateOrderView(APIView):
    permission_classes = [IsAuthenticated]  

    def post(self, request, *args, **kwargs):
        user = request.user  # Obtén el usuario desde el token
        data = request.data.copy()
        data['user'] = user.id  # Agrega el ID del usuario al serializador

        serializer = OrderSerializer(data=data)
        if serializer.is_valid():
            order = serializer.save()
            return Response({'message': 'Order created successfully!', 'order_id': order.id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#View que revisa si el usuarioi que la consulta tiene pedidos en estado pendiente 
class CheckPendingOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user  

        # Obtener la única orden pendiente del usuario
        pending_order = Order.objects.filter(user=user, status='pending').first()

        if pending_order:
            # Serializar la orden encontrada
            serializer = PendingOrderSerializer(pending_order)
            return Response({'has_pending': True, 'order': serializer.data}, status=200)
        else:
            return Response({'has_pending': False}, status=200)
        


class ProcessPaymentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user

        # Obtener la orden pendiente
        try:
            order = Order.objects.filter(user=user, status='pending').first()
            if not order:
                return Response({"error": "No hay órdenes pendientes."}, status=status.HTTP_404_NOT_FOUND)
        except Order.DoesNotExist:
            return Response({"error": "No se pudo encontrar la orden."}, status=status.HTTP_404_NOT_FOUND)

        # Extraer la información de envío desde el cuerpo de la solicitud
        ship_info_data = request.data.get("ship_info", {})
        payment_info = request.data.get("payment_info", {})

        # Validar y crear ShipInfo
        serializer = ShipInfoSerializer(data=ship_info_data)
        if not serializer.is_valid():
            print("el serializer no es valido ")
            return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
            

        # Usar transacciones para garantizar la consistencia
        with transaction.atomic():
            # Crear el ShipInfo y asociarlo a la orden
            ship_info = serializer.save()
            order.ship_info = ship_info

            # Verificar stock de productos
            for item in order.order_items.all():
                product = item.product
                if product.stock < item.quantity:
                    return Response(
                        {"error": f"No hay suficiente stock para el producto {product.name}."},
                        status=status.HTTP_400_BAD_REQUEST
                    )

            # Aquí debería ir la lógica del pago
            for elemento in payment_info.values():
                print(elemento)  # Depuración: Imprimir información del pago

            # Actualizar el stock de los productos
            for item in order.order_items.all():
                product = item.product
                product.stock -= item.quantity
                product.save()

            # Actualizar el estado de la orden
            order.status = "shipped"
            order.save()

        return Response({"message": "Pago realizado con éxito.", "order_id": order.id}, status=status.HTTP_200_OK)

# lista las ordenes de un usuario con cierta id 
class OrderListView(APIView):
    permission_classes = [IsAuthenticated]  #se debe cambiar 

    def get(self, request):
        # Filtra las órdenes del usuario autenticado
        orders = Order.objects.filter(user=request.user).prefetch_related('order_items__product')
        serializer = OrderListSerializer(orders, many=True)
        return Response(serializer.data)
    
#cambia el estatus de una orden
class OrderUpdateStatusView(APIView):
    def patch(self, request, pk):
        try:
            # Obtener la orden a través del ID
            order = Order.objects.get(pk=pk)
        except Order.DoesNotExist:
            return Response({"detail": "Order not found."}, status=status.HTTP_404_NOT_FOUND)

        # Usamos el serializer para actualizar el estado de la orden
        serializer = OrderStatusUpdateSerializer(order, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    
#view para que el admin liste las ordenes de todos los clientes 
class AOrderListView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        orders = Order.objects.select_related('ship_info').prefetch_related('order_items')  # Optimización de consultas
        serializer = AOrderSerializer(orders, many=True)
        return Response(serializer.data)