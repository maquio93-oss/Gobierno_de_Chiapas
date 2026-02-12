# Usa nginx alpine para una imagen ligera
FROM nginx:alpine

# Copia los archivos estáticos al directorio de nginx
COPY . /usr/share/nginx/html

# Copia la configuración personalizada de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 80
EXPOSE 80

# Comando por defecto de nginx
CMD ["nginx", "-g", "daemon off;"]
