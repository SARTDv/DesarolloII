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
DJANGO_SECRET_KEY=nj$o2ae23qc!*+7u93ey-vy@__iq5z-9g_tioylf+4@h3a@*&1
EMAIL_HOST_PASSWORD=dxnw qlwm uuzr uuog
EMAIL_HOST_USER=strdccnts@gmail.com
FRONTEND_URL=http://localhost:5173
RECAPTCHA_PRIVATE_KEY=6LduhHgqAAAAAPbjNj9V-SzsbrGhJ-ym8kmg-kl-
RECAPTCHA_PUBLIC_KEY=6LduhHgqAAAAAG6SwTg1Beu_vrBcBnf1Opozllu8
```
### .env para el front 

este va en la carpeta raiz de front osea /ecommerce_front
```bash 
VITE_API_URL=http://127.0.0.1:8000
```

## ejecucion

la ejecucion se debe hacer en terminales separadas se entra a la carpeta que contiene cada servicio y se ejecuta 
```bash 
python manage.py runserver
npm run dev 
```

no se veran productos o usuarios por que su base de datos estara vacia. si quiere probar las funcionalidades debe crear un superusuario en django entrar al panel de administradores del back y en los usuarios, darle check en la a casilla de email verificado del superusuario que creo asi ya podra entrar desde el front con esta cuenta y empezar a agregar produtos desde el panel admin que se encuentra en my account.

