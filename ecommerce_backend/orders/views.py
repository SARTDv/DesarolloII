from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import OrderSerializer,PendingOrderSerializer
from .models import Order                                       #No se si esto es correcto 

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
        

#view que se encarga de procesar el pago                transaccional ?
class ProcessPaymentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user

        # Obtener la orden pendiente
        try:
            order = Order.objects.filter(user=user, status='pending').first()

        except Order.DoesNotExist:
            return Response({"error": "No hay órdenes pendientes."}, status=status.HTTP_404_NOT_FOUND)

        payment_info = request.data.get("payment_info")

        """
        Aqui se deberia implementar los pagos 
        """

        #verificar que llegan los datos
        for elemnto in payment_info.values():
            print(elemnto)

        # Actualizar estado de la orden
        order.status = "shipped"
        order.save()

        return Response({"message": "Pago realizado con éxito.", "order_id": order.id}, status=status.HTTP_200_OK)