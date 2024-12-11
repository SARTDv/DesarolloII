from django.db import models

class ShipInfo(models.Model):
    first_name = models.CharField(max_length=50)  # Nombre del receptor
    last_name = models.CharField(max_length=50)  # Apellido del receptor
    address = models.TextField()  # Dirección completa
    town = models.CharField(max_length=50)  # Ciudad (renombrado desde 'city')
    zip_code = models.CharField(max_length=20)  # Código postal (renombrado desde 'postal_code')
    phone_num = models.CharField(max_length=15)  # Número de teléfono (renombrado desde 'phone_number')
    com = models.TextField(blank=True, null=True)  # Comentarios adicionales (nuevo campo)
    created_at = models.DateTimeField(auto_now_add=True)  # Fecha de creación

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.address}"
