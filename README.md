# Proyecto-DesarolloSoftware-II

## instrucciones de ejcucion en local

### clonar el repositorio de git 
```bash
git clone https://github.com/BayronJDv/DesarolloII.git
```

### iniciar el backend 
```bash 
cd ecommerce_backend
pip install -r rquirements.txt
```
```python
python manage.py makemigrations
python manage.py migrate 
python manage.py runserver
```
### inicioar el front 

```bash 
cd ecommerce_frontend
npm i 
npm run dev 