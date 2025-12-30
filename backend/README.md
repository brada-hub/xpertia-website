# Xpertia Backend API

Backend API para el sistema de gestión de contactos del sitio web de Xpertia.

## Requisitos

- PHP 7.4 o superior
- MySQL 5.7 o superior
- Laragon (o cualquier servidor LAMP/WAMP)

## Instalación

### 1. Configurar Base de Datos

Ejecuta el archivo de migración para crear la base de datos y las tablas:

```bash
# Desde Laragon, abre HeidiSQL o phpMyAdmin
# Importa el archivo: backend/database/migration.sql
```

O ejecuta manualmente:

```bash
mysql -u root -p < backend/database/migration.sql
```

### 2. Configurar Variables de Entorno (Opcional)

Si necesitas cambiar la configuración de la base de datos, edita `backend/config/database.php` o configura variables de entorno:

```
DB_HOST=localhost
DB_DATABASE=xpertia_contacts
DB_USERNAME=root
DB_PASSWORD=
```

### 3. Configurar Servidor

El backend debe ser accesible desde `http://localhost/xpertia-website/backend/api/`

Si usas Laragon, esto ya está configurado automáticamente.

## Endpoints de la API

### Público

#### POST `/api/contacts.php`
Enviar un nuevo contacto desde el formulario.

**Request:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "service": "consultoria",
  "message": "Me interesa una consultoría..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.",
  "data": {
    "id": 1
  }
}
```

### Autenticación

#### POST `/api/auth.php`
Login de administrador.

**Request:**
```json
{
  "action": "login",
  "email": "admin@xpertia.com",
  "password": "password"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Inicio de sesión exitoso",
  "data": {
    "token": "abc123...",
    "user": {
      "id": 1,
      "name": "Admin",
      "email": "admin@xpertia.com"
    }
  }
}
```

#### POST `/api/auth.php` (Logout)
Cerrar sesión.

**Request:**
```json
{
  "action": "logout"
}
```

**Headers:**
```
Authorization: Bearer {token}
```

### Admin (Requiere Autenticación)

Todos los endpoints de admin requieren el header:
```
Authorization: Bearer {token}
```

#### GET `/api/admin-contacts.php`
Listar contactos con paginación y filtros.

**Query Params:**
- `page` (opcional): Número de página (default: 1)
- `per_page` (opcional): Contactos por página (default: 20)
- `search` (opcional): Buscar en nombre, email o mensaje
- `service` (opcional): Filtrar por servicio
- `status` (opcional): Filtrar por estado (new, read, replied, archived)

**Response:**
```json
{
  "success": true,
  "data": {
    "contacts": [...],
    "pagination": {
      "current_page": 1,
      "per_page": 20,
      "total": 100,
      "total_pages": 5
    }
  }
}
```

#### GET `/api/admin-contacts.php?id={id}`
Obtener un contacto específico.

#### GET `/api/admin-contacts.php?stats=1`
Obtener estadísticas de contactos.

**Response:**
```json
{
  "success": true,
  "data": {
    "stats": {
      "total": 100,
      "new_count": 50,
      "read_count": 30,
      "replied_count": 15,
      "archived_count": 5
    },
    "by_service": [
      {"service": "consultoria", "count": 40},
      {"service": "desarrollo", "count": 30},
      ...
    ]
  }
}
```

#### PATCH `/api/admin-contacts.php`
Actualizar estado de un contacto.

**Request:**
```json
{
  "id": 1,
  "status": "read"
}
```

#### DELETE `/api/admin-contacts.php`
Eliminar un contacto.

**Request:**
```json
{
  "id": 1
}
```

#### GET `/api/export.php`
Exportar contactos a CSV.

**Query Params:** (mismos que listar contactos)
- `search`, `service`, `status`

**Response:** Archivo CSV descargable

## Credenciales de Administrador

Por defecto:
- **Email:** admin@xpertia.com
- **Password:** password

**IMPORTANTE:** Cambia estas credenciales en producción.

## Estructura de Archivos

```
backend/
├── api/
│   ├── contacts.php          # Endpoint público para enviar contactos
│   ├── auth.php              # Autenticación de admin
│   ├── admin-contacts.php    # CRUD de contactos (admin)
│   ├── export.php            # Exportar a CSV
│   └── helpers.php           # Funciones auxiliares
├── config/
│   └── database.php          # Configuración de BD
├── database/
│   ├── Database.php          # Clase de conexión PDO
│   ├── Contact.php           # Modelo de contactos
│   ├── User.php              # Modelo de usuarios
│   └── migration.sql         # Script de migración
└── README.md                 # Este archivo
```

## Seguridad

- Todas las consultas usan prepared statements (PDO)
- Validación de entrada en todos los endpoints
- Sanitización de datos
- Autenticación basada en tokens
- Tokens expiran en 24 horas
- CORS configurado para desarrollo (ajustar en producción)

## Desarrollo

Para desarrollo local:
1. Asegúrate de que Laragon esté corriendo
2. El backend estará disponible en `http://localhost/xpertia-website/backend/api/`
3. El frontend React debe apuntar a esta URL

## Producción

Para producción:
1. Cambia las credenciales de admin
2. Actualiza la configuración de CORS en los archivos API
3. Configura HTTPS
4. Considera usar variables de entorno para credenciales sensibles
5. Implementa rate limiting para prevenir abuso
