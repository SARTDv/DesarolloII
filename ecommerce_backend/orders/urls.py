from django.urls import path
from .views import CreateOrderView,CheckPendingOrderView,ProcessPaymentView,OrderListView,OrderUpdateStatusView,AOrderListView

urlpatterns = [
    path('create/', CreateOrderView.as_view(), name='addToCart'),
    path('check-pending/', CheckPendingOrderView.as_view(), name='chekpending'),
    path('process-payment/', ProcessPaymentView.as_view(), name='Processpay'),
    path('orders/', OrderListView.as_view(), name='order-list'),
    path('orders/<int:pk>/', OrderUpdateStatusView.as_view(), name='update_order_status'),
    #ruta para el admin
    path('users_orders/', AOrderListView.as_view(), name='order-list'),

]