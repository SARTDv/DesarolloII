from rest_framework import serializers
from .models import ShipInfo

class ShipInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShipInfo
        fields = [
            'first_name', 
            'last_name', 
            'address', 
            'town', 
            'zip_code', 
            'phone_num', 
            'com'
        ]
