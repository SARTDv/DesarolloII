# Proyecto-DesarolloSoftware-II

## instrucciones de ejcucion en local entorno de desarollo

### clonar el repositorio de git 
```bash
git clone https://github.com/SARTDv/DesarolloII.git
```

### Configurar el back
```bash 
cd ecommerce_backend
pip install -r requirements.txt
```
```python
python manage.py makemigrations
python manage.py migrate 
```
### configurar el front

```bash 
cd ecommerce_frontend
npm i 
```

## variables de entorno

Antes de ejcutar ambos servicios sde deben crear las variables de entorno para ejecucion en local 
se debes añadir dos archivos .env

### .env para en back 

este se debe poner en la carpeta /eccomerce_backend/ecommerce_backend
```bash 
DEBUG=True
DJANGO_SECRET_KEY=*****************
EMAIL_HOST_PASSWORD=**********
EMAIL_HOST_USER=*********
FRONTEND_URL=http://localhost:5173
RECAPTCHA_PRIVATE_KEY=********
RECAPTCHA_PUBLIC_KEY=**********
```
### .env para el front 

este va en la carpeta raiz de front osea /ecommerce_front
```bash 
VITE_API_URL=*************
```

## ejecucion

la ejecucion se debe hacer en terminales separadas se entra a la carpeta que contiene cada servicio y se ejecuta 
```bash 
python manage.py runserver
npm run dev 
```

no se veran productos o usuarios por que su base de datos estara vacia. si quiere probar las funcionalidades debe crear un superusuario en django entrar al panel de administradores del back y en los usuarios, darle check en la a casilla de email verificado del superusuario que creo asi ya podra entrar desde el front con esta cuenta y empezar a agregar produtos desde el panel admin que se encuentra en my account.

