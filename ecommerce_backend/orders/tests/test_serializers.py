from .test_setup import TestSetup
from orders.serializers import PendingOrderSerializer, OrderItemSerializer
from orders.models import Order, OrderItem

class TestSerializers(TestSetup):
    
    def test_pending_order_serializer(self):
        # Create test data
        # The setUp method already creates a pending order with an order item
        
        # Serialize the pending order
        serializer = PendingOrderSerializer(self.order)
        serialized_data = serializer.data
        
        # Verify the serialized data contains the expected fields
        self.assertIn('id', serialized_data)
        self.assertIn('status', serialized_data)
        self.assertIn('total_price', serialized_data)
        self.assertIn('order_items', serialized_data)
        
        # Verify the status is 'pending'
        self.assertEqual(serialized_data['status'], 'pending')
        
        # Verify the total price matches what was set in the test setup
        self.assertEqual(float(serialized_data['total_price']), float(self.order.total_price))
        
        # Verify order items are included and properly serialized
        self.assertEqual(len(serialized_data['order_items']), 1)
        
        # Check the first order item
        order_item_data = serialized_data['order_items'][0]
        self.assertIn('product_name', order_item_data)
        self.assertIn('quantity', order_item_data)
        self.assertIn('product_price', order_item_data)
        
        # Verify the product name matches
        self.assertEqual(order_item_data['product_name'], self.product.name)
        
        # Verify the quantity matches
        self.assertEqual(order_item_data['quantity'], self.order_item.quantity)
        
        # Verify the product price matches
        self.assertEqual(float(order_item_data['product_price']), float(self.product.price))
