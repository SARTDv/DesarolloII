from django.db import models

# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    brand = models.CharField(max_length=50, null=True)
    category = models.CharField(max_length=50, default='tripleA')
    price = models.DecimalField(max_digits=10,decimal_places=2)
    stock = models.IntegerField()
    imageurl = models.CharField(max_length=200, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
