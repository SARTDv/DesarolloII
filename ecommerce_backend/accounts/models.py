import uuid
from django.db import models

# Create your models here.
# accounts/models.py

from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    is_email_verified = models.BooleanField(default=False)
    email_verification_token = models.UUIDField(
        null=True,
        blank=True,
        unique=True
    )

    def save(self, *args, **kwargs):
        # Generar token solo si no existe
        if not self.email_verification_token:
            self.email_verification_token = uuid.uuid4()
        super().save(*args, **kwargs)