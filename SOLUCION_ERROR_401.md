# Solución al Error 401 (No Autorizado)

## Problema
Después de iniciar sesión, el dashboard muestra error 401 "No autorizado" al intentar cargar los contactos.

## Soluciones

### Solución 1: Verificar que el login guardó el token

1. Abre las **DevTools** del navegador (F12)
2. Ve a la pestaña **"Application"** o **"Almacenamiento"**
3. En el menú lateral, busca **"Local Storage"** → `http://localhost:5173`
4. Verifica que existan estas claves:
   - `auth_token` - debe tener un valor largo (token)
   - `user` - debe tener un JSON con los datos del usuario

**Si NO existen estos valores:**
- Cierra sesión
- Vuelve a iniciar sesión
- Verifica que aparezcan

### Solución 2: Limpiar caché y volver a intentar

1. En el navegador, presiona **Ctrl + Shift + Delete**
2. Selecciona:
   - ✅ Cookies y datos de sitios
   - ✅ Caché
3. Haz clic en **"Borrar datos"**
4. Cierra el navegador completamente
5. Vuelve a abrir y ve a `http://localhost:5173/admin/login`
6. Inicia sesión nuevamente

### Solución 3: Verificar que Apache esté pasando los headers

He creado un archivo `.htaccess` en `backend/api/` que debe solucionar esto.

**Verifica que el archivo exista:**
```
c:\laragon\www\xpertia-website\backend\api\.htaccess
```

**Si no existe**, créalo con este contenido:

```apache
RewriteEngine On

# Pass Authorization header to PHP
RewriteCond %{HTTP:Authorization} ^(.*)
RewriteRule .* - [e=HTTP_AUTHORIZATION:%1]

# Enable CORS
Header always set Access-Control-Allow-Origin "*"
Header always set Access-Control-Allow-Methods "GET, POST, PUT, PATCH, DELETE, OPTIONS"
Header always set Access-Control-Allow-Headers "Content-Type, Authorization"
Header always set Access-Control-Max-Age "3600"

# Handle OPTIONS requests
RewriteCond %{REQUEST_METHOD} OPTIONS
RewriteRule ^(.*)$ $1 [R=200,L]
```

**Después de crear el archivo:**
1. Reinicia Apache en Laragon
2. Limpia la caché del navegador
3. Vuelve a iniciar sesión

### Solución 4: Probar el endpoint de debug

He creado un endpoint de debug para verificar que los headers se estén enviando correctamente.

1. Inicia sesión en `/admin/login`
2. Abre las DevTools (F12) → pestaña **Console**
3. Ejecuta este código en la consola:

```javascript
const token = localStorage.getItem('auth_token');
fetch('http://localhost/xpertia-website/backend/api/debug.php', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(r => r.json())
.then(data => console.log(data));
```

4. Verifica la respuesta:
   - `debug.token` debe tener un valor (tu token)
   - `debug.headers.Authorization` debe existir

**Si `debug.token` es null:**
- El problema está en que Apache no está pasando el header
- Verifica que el `.htaccess` exista
- Reinicia Apache

### Solución 5: Modificar temporalmente la API para debug

Si nada de lo anterior funciona, podemos modificar temporalmente `admin-contacts.php` para ver qué está pasando.

Abre `backend/api/admin-contacts.php` y después de la línea 20, agrega:

```php
// DEBUG: Log headers
error_log("Headers: " . print_r(getallheaders(), true));
error_log("Token: " . getAuthToken());
```

Luego revisa el log de errores de Apache en Laragon para ver qué está pasando.

### Solución 6: Alternativa - Usar query parameter temporalmente

Si los headers no funcionan, podemos modificar temporalmente para usar query parameters:

**Modifica `backend/api/admin-contacts.php`** línea 22-27:

```php
// Authenticate user
$token = getAuthToken();

// Fallback: try query parameter (SOLO PARA DEBUG)
if (!$token && isset($_GET['token'])) {
    $token = $_GET['token'];
}

if (!$token) {
    sendJson(['success' => false, 'message' => 'No autorizado'], 401);
}
```

Haz lo mismo en `backend/api/export.php`.

## Verificación Final

Después de aplicar las soluciones:

1. Cierra sesión (si estás logueado)
2. Limpia caché del navegador
3. Reinicia Apache en Laragon
4. Ve a `http://localhost:5173/admin/login`
5. Inicia sesión con:
   - Email: `admin@xpertia.com`
   - Password: `password`
6. Deberías ver el dashboard con los contactos

## Si aún no funciona

Envíame:
1. Screenshot del error en la consola del navegador
2. Screenshot de Local Storage (DevTools → Application → Local Storage)
3. El resultado del endpoint de debug (Solución 4)

Con esa información podré darte una solución más específica.
