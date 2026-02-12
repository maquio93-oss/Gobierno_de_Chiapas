# Despliegue Docker - Directorio Virtual Gobierno de Chiapas

## 📋 Descripción
Proyecto estático dockerizado para mostrar el directorio virtual de la Sede del Gobierno del Estado de Chiapas.

## 🚀 Despliegue en Portainer

### Método 1: Usando Repository (Recomendado)

1. **Subir el código a un repositorio Git**
   - Crea un repositorio en GitHub, GitLab o Bitbucket
   - Sube todos los archivos del proyecto incluyendo:
     - `Dockerfile`
     - `docker-compose.yml`
     - `nginx.conf`
     - `.dockerignore`
     - `index.html`
     - Carpeta `img/` con todas las imágenes

2. **Configurar en Portainer**
   - Ve a **Stacks** → **Add stack**
   - Selecciona **Repository**
   - Configura:
     - **Name**: `gobierno-chiapas-directorio`
     - **Repository URL**: `https://github.com/tu-usuario/Gobierno_de_Chiapas.git`
     - **Repository reference**: `refs/heads/main` (o `master`)
     - **Compose path**: `docker-compose.yml`
     - **Authentication**: Si el repo es privado, agrega tus credenciales

3. **Deploy**
   - Click en **Deploy the stack**
   - Portainer clonará el repositorio y construirá la imagen automáticamente

### Método 2: Build Manual Local

Si prefieres construir localmente primero:

```bash
# Construir la imagen
docker build -t gobierno-chiapas-directorio:latest .

# Ejecutar el contenedor
docker-compose up -d
```

## 🌐 Acceso

Una vez desplegado, el sitio estará disponible en:
- **Puerto local**: http://localhost:3028
- **Subdominio**: http://sag.chiapas.gob.mx/

## ⚙️ Configuración del Servidor

### Configurar Reverse Proxy (Nginx/Apache)

Si usas un reverse proxy en tu servidor, configura:

**Nginx:**
```nginx
server {
    listen 80;
    server_name sag.chiapas.gob.mx;

    location / {
        proxy_pass http://localhost:3028;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**Apache:**
```apache
<VirtualHost *:80>
    ServerName sag.chiapas.gob.mx
    
    ProxyPreserveHost On
    ProxyPass / http://localhost:3028/
    ProxyPassReverse / http://localhost:3028/
</VirtualHost>
```

## 🔄 Actualización del Proyecto

### Desde Portainer (Repository method):
1. Ve a tu stack en Portainer
2. Click en **Pull and redeploy**
3. Portainer descargará los últimos cambios del repositorio

### Manual:
```bash
# Detener el contenedor
docker-compose down

# Reconstruir con cambios
docker-compose up -d --build
```

## 📦 Estructura del Proyecto

```
Gobierno_de_Chiapas/
├── Dockerfile              # Configuración de la imagen Docker
├── docker-compose.yml      # Orquestación del contenedor
├── nginx.conf             # Configuración del servidor web
├── .dockerignore          # Archivos excluidos del build
├── index.html             # Página principal
├── manifest.json          # PWA manifest
├── sw.js                  # Service Worker
└── img/                   # Carpeta de imágenes
    ├── tarjetasfinal-*.png
    ├── planta1/
    └── Tarjeta2planta/
```

## 🛠️ Comandos Útiles

```bash
# Ver logs del contenedor
docker-compose logs -f

# Reiniciar el contenedor
docker-compose restart

# Detener el contenedor
docker-compose down

# Ver estado
docker-compose ps

# Reconstruir sin cache
docker-compose build --no-cache
```

## 🔒 Seguridad

Para producción, considera:
1. Usar HTTPS con certificado SSL (Let's Encrypt)
2. Configurar firewall para permitir solo puerto 80/443
3. Implementar rate limiting en nginx
4. Mantener las imágenes Docker actualizadas

## 📊 Monitoreo

El contenedor incluye:
- Logs de acceso en `/var/log/nginx/access.log`
- Logs de errores en `/var/log/nginx/error.log`
- Auto-restart en caso de fallo

## 🆘 Troubleshooting

**El contenedor no inicia:**
```bash
docker-compose logs
```

**Puerto 3028 ya en uso:**
```bash
# Cambiar puerto en docker-compose.yml
ports:
  - "NUEVO_PUERTO:80"
```

**Imágenes no cargan:**
- Verificar que la carpeta `img/` esté en el repositorio
- Revisar permisos de archivos
- Verificar logs: `docker-compose logs`
