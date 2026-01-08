# Plan de Despliegue: XpertIA+ en cPanel (vía GitHub)

Este plan detalla los pasos para subir tu aplicación React (frontend) y PHP (backend) a un hosting con cPanel utilizando un repositorio público en GitHub.

---

## 1. Preparación del Código

### A. Configuración de URLs (Frontend)

Asegúrate de que `src/utils/api.js` y `src/utils/projectsApi.js` apunten a la URL de producción.

- **Recomendación**: Usa variables de entorno (`.env.production`).
- **Valor sugerido**: `https://tu-dominio.com/backend/api`

### B. Seguridad del Backend

Como el repositorio es **público**, **NUNCA** subas las credenciales de la base de datos al repositorio.

1. Añade `backend/database/db_config.php` (o donde guardes las claves) al archivo `.gitignore`.
2. En cPanel, crearás este archivo manualmente con los datos del servidor real.

---

## 2. Compilación del Frontend

Ejecuta el siguiente comando en tu máquina local:

```bash
npm run build
```

Esto generará una carpeta `dist`. Los archivos dentro de esta carpeta son los que irán a la carpeta pública del hosting.

---

## 3. Configuración en cPanel

### A. Creación de la Base de Datos

1. Ve a **Bases de datos MySQL®**.
2. Crea una nueva base de datos y un usuario con todos los privilegios. **Guarda estas credenciales.**
3. Entra a **phpMyAdmin** e importa tu base de datos local (exportada como `.sql`).

### B. Estructura de Carpetas Sugerida

Para mantener el orden en tu administrador de archivos:

- `/public_html/` -> Aquí pega el contenido de tu carpeta `dist/` (index.html, assets, etc.).
- `/public_html/backend/` -> Aquí pega la carpeta `backend/` de tu proyecto.

---

## 4. Automatización con Git (GitHub -> cPanel)

Si tu cPanel tiene la herramienta **Git™ Version Control**:

1. **GitHub**: Sube tu código (sin las carpetas `node_modules` ni archivos de config sensible) a un repositorio público.
2. **cPanel**:
   - Ve a **Git™ Version Control** -> **Create**.
   - Pega la URL de tu repo de GitHub.
   - En **Deployment Path**, pon una carpeta temporal (ej: `repo-temp`).
3. **Despliegue**:
   - Una vez clonado, usa el **Administrador de archivos** para mover el contenido de `repo-temp/backend` a `/public_html/backend`.
   - Mueve el contenido de un nuevo `npm run build` local a `/public_html/`.

_(Nota: Como el repo es público, no necesitas configurar SSH keys, solo la URL HTTPS)._

---

## 5. Ajustes Finales de Producción

### A. Archivo .htaccess (Crucial para React Router)

Para que las rutas del administrador (ej: `/admin/dashboard`) funcionen al recargar la página, crea un archivo `.htaccess` en `/public_html/` con este contenido:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```

### B. Configuración de Base de Datos en Producción

En `/public_html/backend/database/Database.php`, asegúrate de actualizar los datos de conexión con los que creaste en el paso 3A.

---

## 6. Verificación

1. Accede a `tu-dominio.com`.
2. Prueba el login del administrador.
3. Verifica que la consola del navegador (F12) no muestre errores de CORS o 404 en las llamadas al API.
