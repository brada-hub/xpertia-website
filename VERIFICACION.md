# ✅ Verificación Final - Sistema de Contactos

## Cambios Realizados

✅ **Actualizado `Contacto.jsx`** - Ahora usa la API real en lugar de simulación
✅ **Mejorado `helpers.php`** - Soporte para múltiples formatos de headers
✅ **Creado `.htaccess`** - Para que Apache pase los headers correctamente

## Pasos de Verificación

### 1. Reiniciar Todo

```powershell
# En Laragon:
# 1. Click en "Stop All"
# 2. Espera 3 segundos
# 3. Click en "Start All"
```

### 2. Limpiar Navegador

1. Presiona **Ctrl + Shift + Delete**
2. Marca **"Cookies"** y **"Caché"**
3. Click en **"Borrar"**
4. **Cierra el navegador completamente**
5. Vuelve a abrirlo

### 3. Probar Formulario de Contacto

1. Ve a: `http://localhost:5173`
2. Desplázate hasta la sección de **Contacto**
3. Llena el formulario:
   - **Nombre**: Tu Nombre
   - **Email**: test@example.com
   - **Servicio**: Consultoría Estratégica
   - **Mensaje**: Este es un mensaje de prueba para verificar que funciona
4. Click en **"Enviar Mensaje"**
5. **Deberías ver**: Mensaje verde de éxito

### 4. Verificar en Base de Datos

1. Abre **HeidiSQL** desde Laragon
2. Selecciona la base de datos `xpertia_contacts`
3. Click en la tabla `contacts`
4. Click en la pestaña **"Datos"**
5. **Deberías ver**: Tu contacto recién enviado en la lista

### 5. Probar Panel de Administración

1. Ve a: `http://localhost:5173/admin/login`
2. Inicia sesión:
   - **Email**: `admin@xpertia.com`
   - **Password**: `password`
3. **Deberías ver**:
   - Dashboard con estadísticas
   - Tu contacto en la tabla
   - Filtros funcionando
   - Botón de exportar CSV

### 6. Probar Funciones del Dashboard

- ✅ **Ver detalles**: Click en "Ver" de un contacto
- ✅ **Cambiar estado**: Usa el dropdown para cambiar de "new" a "read"
- ✅ **Buscar**: Escribe un nombre en el campo de búsqueda
- ✅ **Filtrar**: Selecciona un servicio o estado
- ✅ **Exportar**: Click en "Exportar CSV"
- ✅ **Eliminar**: Click en "Eliminar" (te pedirá confirmación)

## Si Algo No Funciona

### Formulario no envía

1. Abre **DevTools** (F12) → pestaña **Console**
2. Envía el formulario
3. Busca errores en rojo
4. Si ves error de CORS o 500:
   - Verifica que Laragon esté corriendo
   - Verifica que la base de datos exista
   - Verifica que el archivo `.env.local` tenga la URL correcta

### Dashboard muestra 401

1. Abre **DevTools** (F12) → pestaña **Application**
2. Ve a **Local Storage** → `http://localhost:5173`
3. Verifica que exista `auth_token`
4. Si no existe:
   - Cierra sesión
   - Limpia caché
   - Vuelve a iniciar sesión

### Contactos no aparecen en dashboard

1. Verifica en HeidiSQL que los contactos estén en la tabla `contacts`
2. Si están en la BD pero no aparecen:
   - Abre la consola del navegador
   - Busca errores de red
   - Verifica que el token sea válido

## Prueba Rápida en Consola

Abre DevTools (F12) → Console y ejecuta:

```javascript
// Probar envío de contacto
fetch("http://localhost/xpertia-react/backend/api/contacts.php", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "Test",
    email: "test@test.com",
    service: "consultoria",
    message: "Mensaje de prueba desde consola",
  }),
})
  .then((r) => r.json())
  .then((data) => console.log("✅ Respuesta:", data))
  .catch((err) => console.error("❌ Error:", err));
```

**Resultado esperado:**

```json
{
  "success": true,
  "message": "¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.",
  "data": { "id": 6 }
}
```

## Checklist Final

- [ ] Laragon corriendo (Apache + MySQL)
- [ ] Base de datos `xpertia_contacts` creada
- [ ] Archivo `.env.local` existe con URL correcta
- [ ] Navegador con caché limpia
- [ ] Formulario envía y muestra mensaje de éxito
- [ ] Contacto aparece en HeidiSQL
- [ ] Login de admin funciona
- [ ] Dashboard muestra contactos
- [ ] Todas las funciones del dashboard funcionan

## ¡Listo!

Si todos los pasos funcionan correctamente, el sistema está completamente operativo. 🎉

**Accesos rápidos:**

- Sitio web: `http://localhost:5173`
- Admin login: `http://localhost:5173/admin/login`
- Dashboard: `http://localhost:5173/admin/dashboard`
