"""
WSGI config for ecommerce_backend project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecommerce_backend.settings')

def print_env_vars():
    for key, value in os.environ.items():
        print(f"{key} = {value}")
print("=== VARIABLES DE ENTORNO CARGADAS ===")
print_env_vars()
print("=====================================")

application = get_wsgi_application()
