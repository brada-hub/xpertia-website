# Solución Rápida al Error 401

## Paso 1: Reiniciar Apache

1. Abre **Laragon**
2. Haz clic en **"Stop All"**
3. Espera 3 segundos
4. Haz clic en **"Start All"**

## Paso 2: Limpiar navegador

1. Presiona **Ctrl + Shift + Delete**
2. Marca **"Cookies"** y **"Caché"**
3. Haz clic en **"Borrar"**
4. Cierra el navegador completamente
5. Vuelve a abrirlo

## Paso 3: Probar nuevamente

1. Ve a: `http://localhost:5173/admin/login`
2. Inicia sesión:
   - Email: `admin@xpertia.com`
   - Password: `password`
3. Deberías ver el dashboard funcionando

## Si aún no funciona

Abre las **DevTools** (F12) y ejecuta en la consola:

```javascript
// Verificar que el token se guardó
console.log('Token:', localStorage.getItem('auth_token'));

// Probar la API manualmente
const token = localStorage.getItem('auth_token');
fetch('http://localhost/xpertia-website/backend/api/admin-contacts.php?stats=1', {
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  }
})
.then(r => r.json())
.then(data => console.log('Respuesta:', data))
.catch(err => console.error('Error:', err));
```

Si ves la respuesta con los datos, el problema está en el componente React. Si ves error 401, el problema está en los headers de Apache.

**En ese caso:**
- Verifica que existe el archivo: `backend/api/.htaccess`
- Si no existe, créalo con el contenido del archivo `SOLUCION_ERROR_401.md`
