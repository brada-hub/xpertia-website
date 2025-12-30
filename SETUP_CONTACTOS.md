# Xpertia Website - Contact Form Database Module

Sistema completo de gestión de contactos con backend PHP/MySQL y frontend React.

## 🚀 Características

- ✅ Formulario de contacto funcional con validación
- ✅ Backend API REST en PHP con MySQL
- ✅ Panel de administración completo
- ✅ Autenticación de administrador
- ✅ Búsqueda y filtros de contactos
- ✅ Exportación a CSV
- ✅ Estadísticas en tiempo real
- ✅ Gestión de estados de contactos

## 📋 Requisitos

- Laragon (o XAMPP/WAMP)
- PHP 7.4+
- MySQL 5.7+
- Node.js 16+

## 🔧 Instalación

### 1. Configurar Base de Datos

1. Abre Laragon y asegúrate de que MySQL esté corriendo
2. Abre HeidiSQL o phpMyAdmin
3. Ejecuta el archivo de migración:
   ```
   backend/database/migration.sql
   ```

Esto creará:
- Base de datos `xpertia_contacts`
- Tabla `contacts` para almacenar contactos
- Tabla `users` para administradores
- Tabla `sessions` para autenticación
- Usuario admin por defecto
- Datos de ejemplo

### 2. Configurar Variables de Entorno

#### Backend
La configuración por defecto en `backend/config/database.php` es:
```php
host: localhost
database: xpertia_contacts
username: root
password: (vacío)
```

Si necesitas cambiar estos valores, edita el archivo directamente.

#### Frontend
1. Copia `.env.example` a `.env.local`:
   ```powershell
   copy .env.example .env.local
   ```

2. El archivo `.env.local` debe contener:
   ```
   VITE_API_URL=http://localhost/xpertia-website/backend/api
   ```

### 3. Actualizar Formulario de Contacto

**IMPORTANTE**: Debes actualizar manualmente el archivo `src/components/Contacto.jsx`:

Busca la línea 75-101 (la función `handleSubmit`) y reemplaza el código de simulación con:

```javascript
setIsSubmitting(true);

// Send to backend API
try {
  const { submitContact } = await import('../utils/api');
  const response = await submitContact(formData);

  if (response.success) {
    setSubmitMessage(response.message);
    setFormData({
      name: '',
      email: '',
      service: 'consultoria',
      message: '',
    });
    setErrors({});

    setTimeout(() => {
      setSubmitMessage('');
    }, 5000);
  } else {
    setSubmitMessage(response.message || 'Hubo un error al enviar el mensaje. Por favor intenta de nuevo.');
  }
} catch (error) {
  console.error('Error submitting contact:', error);
  setSubmitMessage('Hubo un error al enviar el mensaje. Por favor intenta de nuevo.');
} finally {
  setIsSubmitting(false);
}
```

### 4. Instalar Dependencias (si es necesario)

```powershell
npm install
```

### 5. Iniciar el Proyecto

1. Asegúrate de que Laragon esté corriendo (Apache + MySQL)
2. Inicia el servidor de desarrollo de React:
   ```powershell
   npm run dev
   ```

3. Abre tu navegador en `http://localhost:5173`

## 🎯 Uso

### Formulario de Contacto

1. Ve a la sección de contacto en el sitio web
2. Llena el formulario con tus datos
3. Haz clic en "Enviar Mensaje"
4. Los datos se guardarán en la base de datos MySQL

### Panel de Administración

1. Accede a `http://localhost:5173/admin/login`
2. Usa las credenciales por defecto:
   - **Email**: admin@xpertia.com
   - **Password**: password

3. En el dashboard podrás:
   - Ver todos los contactos
   - Buscar por nombre, email o mensaje
   - Filtrar por servicio y estado
   - Cambiar el estado de los contactos (nuevo, leído, respondido, archivado)
   - Ver detalles completos de cada contacto
   - Eliminar contactos
   - Exportar contactos a CSV
   - Ver estadísticas en tiempo real

## 📁 Estructura del Proyecto

```
xpertia-website/
├── backend/                    # Backend PHP
│   ├── api/                   # Endpoints de la API
│   │   ├── contacts.php       # Envío de contactos (público)
│   │   ├── auth.php           # Autenticación de admin
│   │   ├── admin-contacts.php # Gestión de contactos (admin)
│   │   ├── export.php         # Exportar a CSV
│   │   └── helpers.php        # Funciones auxiliares
│   ├── config/
│   │   └── database.php       # Configuración de BD
│   ├── database/
│   │   ├── Database.php       # Clase de conexión PDO
│   │   ├── Contact.php        # Modelo de contactos
│   │   ├── User.php           # Modelo de usuarios
│   │   └── migration.sql      # Script de migración
│   └── README.md
│
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   └── ProtectedRoute.jsx  # Guard de autenticación
│   │   └── Contacto.jsx            # Formulario de contacto
│   ├── pages/
│   │   ├── AdminLogin.jsx          # Página de login
│   │   └── AdminDashboard.jsx      # Dashboard de admin
│   ├── utils/
│   │   └── api.js                  # Funciones de API
│   └── App.jsx                     # Rutas principales
│
└── .env.example                # Template de configuración
```

## 🔌 API Endpoints

### Públicos

- `POST /api/contacts.php` - Enviar contacto

### Autenticación

- `POST /api/auth.php` - Login/Logout de admin

### Admin (requiere autenticación)

- `GET /api/admin-contacts.php` - Listar contactos
- `GET /api/admin-contacts.php?id={id}` - Ver contacto
- `GET /api/admin-contacts.php?stats=1` - Estadísticas
- `PATCH /api/admin-contacts.php` - Actualizar estado
- `DELETE /api/admin-contacts.php` - Eliminar contacto
- `GET /api/export.php` - Exportar a CSV

Ver documentación completa en `backend/README.md`

## 🔒 Seguridad

- Todas las consultas usan prepared statements (PDO)
- Validación y sanitización de entrada
- Autenticación basada en tokens
- Tokens expiran en 24 horas
- Passwords hasheados con bcrypt

## ⚠️ Importante para Producción

1. **Cambiar credenciales de admin**:
   - Actualiza el usuario admin en la base de datos
   - Usa un password fuerte

2. **Configurar CORS**:
   - Actualiza los headers en los archivos API
   - Restringe el origen a tu dominio

3. **HTTPS**:
   - Usa HTTPS en producción
   - Actualiza VITE_API_URL a tu dominio

4. **Rate Limiting**:
   - Implementa rate limiting para prevenir abuso

5. **Variables de entorno**:
   - Usa variables de entorno reales en producción
   - No subas credenciales al repositorio

## 🐛 Troubleshooting

### El formulario no envía datos

1. Verifica que Laragon esté corriendo
2. Verifica que la base de datos esté creada
3. Verifica que el archivo `.env.local` exista con la URL correcta
4. Abre la consola del navegador para ver errores
5. Verifica que hayas actualizado `Contacto.jsx` con el código de API

### Error de CORS

- Verifica que los headers CORS estén configurados en los archivos PHP
- Verifica que la URL en `.env.local` sea correcta

### No puedo iniciar sesión en admin

- Verifica que la migración se haya ejecutado correctamente
- Verifica que el usuario admin exista en la tabla `users`
- Usa las credenciales: admin@xpertia.com / password

### La exportación CSV no funciona

- Verifica que estés autenticado
- Verifica que el token no haya expirado
- Intenta cerrar sesión y volver a iniciar

## 📞 Soporte

Para más información, consulta:
- `backend/README.md` - Documentación completa de la API
- Archivos de código fuente con comentarios detallados

## ✅ Checklist de Verificación

- [ ] Base de datos creada y migración ejecutada
- [ ] Archivo `.env.local` creado con la URL correcta
- [ ] Archivo `Contacto.jsx` actualizado con código de API
- [ ] Laragon corriendo (Apache + MySQL)
- [ ] Servidor de desarrollo React corriendo (`npm run dev`)
- [ ] Formulario de contacto funciona y guarda en BD
- [ ] Login de admin funciona
- [ ] Dashboard muestra contactos correctamente
- [ ] Exportación a CSV funciona
