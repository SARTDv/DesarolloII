from django.contrib import admin
from .models import Order
from .models import OrderItem
# Register your models here.

admin.site.register(OrderItem)

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'status', 'total_price', 'created_at', 'updated_at')
    readonly_fields = ('created_at', 'updated_at')