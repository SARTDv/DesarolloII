from django.urls import path
from .views import CreateOrderView,CheckPendingOrderView,ProcessPaymentView

urlpatterns = [
    path('create/', CreateOrderView.as_view(), name='addToCart'),
    path('check-pending/', CheckPendingOrderView.as_view(), name='chekpending'),
    path('process-payment/', ProcessPaymentView.as_view(), name='Processpay'),
]