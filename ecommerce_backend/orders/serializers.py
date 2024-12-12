from rest_framework import serializers
from .models import Order, OrderItem,ShipInfo
from cartItem.models import CartItem

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['user', 'shippingaddress']
    def create(self, validated_data):
        user = validated_data['user']
        # Obtén todos los elementos del carrito para el usuario
        cart_items = CartItem.objects.filter(user=user)
        if not cart_items.exists():
            print(cart_items)
            raise serializers.ValidationError("No items in the cart to create an order.")
        # Calcula el precio total
        total_price = sum(item.product.price * item.quantity for item in cart_items)
        # Crea la orden
        order = Order.objects.create(
            user=user,
            total_price=total_price
        )
        # Crea los OrderItem a partir de los CartItem
        for cart_item in cart_items:
            OrderItem.objects.create(
                order=order,
                product=cart_item.product,
                quantity=cart_item.quantity,
                price = cart_item.product.price,
            )
        # Limpia el carrito
        cart_items.delete()
        return order


# Serializer para los productos (order_items)
class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name')  # Obtener el nombre del producto
    product_price = serializers.DecimalField(source='product.price', max_digits=10, decimal_places=2)  # Precio del producto

    class Meta:
        model = OrderItem
        fields = ['id', 'product_name', 'quantity', 'product_price']  # Campos a mostrar

# Serializer para la orden pendiente
class PendingOrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True)  # Incluir los elementos de la orden (productos)
    class Meta:
        model = Order
        fields = ['id', 'status', 'total_price', 'order_items']  # Incluir los order_items


# Lista las ordenes 
class OrderListSerializer(serializers.ModelSerializer):
    FirstProductImageUrl = serializers.SerializerMethodField()
    packageQty = serializers.SerializerMethodField()
    Totalprice = serializers.FloatField(source='total_price')
    orderDate = serializers.DateTimeField(source='created_at')

    class Meta:
        model = Order
        fields = ['id', 'FirstProductImageUrl', 'status', 'packageQty', 'Totalprice', 'orderDate']

    def get_FirstProductImageUrl(self, obj):
        # Obtiene la URL de la imagen del primer producto en la orden
        first_item = obj.order_items.first()
        return first_item.product.imageurl if first_item else None

    def get_packageQty(self, obj):
        # Calcula el total de productos en la orden
        return sum(item.quantity for item in obj.order_items.all())
    
class OrderStatusUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['status']  # Solo el campo de estado se puede actualizar

class ShipInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShipInfo
        fields = ['first_name', 'last_name', 'address', 'town', 'zip_code', 'phone_num', 'com']

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name')  # Suponiendo que 'product' tiene un campo 'name'
    product_price = serializers.DecimalField(source='product.price', max_digits=10, decimal_places=2)

    class Meta:
        model = OrderItem
        fields = ['product_name', 'quantity', 'product_price']


class AOrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True, read_only=True)
    user = serializers.CharField(source='user.username')  
    ship_info = ShipInfoSerializer(read_only=True)  

    class Meta:
        model = Order
        fields = ['id', 'user', 'created_at', 'updated_at', 'status', 
                  'total_price', 'order_items', 'ship_info']


