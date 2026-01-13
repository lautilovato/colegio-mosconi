# 🎓 Colegio Mosconi - Sistema de Gestión

Sistema de gestión escolar desarrollado con tecnologías modernas para el backend y frontend.

## 📋 Tabla de Contenidos

- [Tecnologías](#tecnologías)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Comandos Disponibles](#comandos-disponibles)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Base de Datos](#base-de-datos)
- [API Endpoints](#api-endpoints)

---

## 🚀 Tecnologías

### Backend
- **NestJS** - Framework de Node.js para APIs escalables
- **TypeScript** - Tipado estático para JavaScript
- **PostgreSQL** - Base de datos relacional
- **MikroORM** - ORM para TypeScript con soporte completo para migraciones

### Frontend
- **React 18** - Biblioteca para interfaces de usuario
- **Vite** - Build tool rápido para desarrollo
- **TypeScript** - Tipado estático
- **Axios** - Cliente HTTP para comunicación con la API
- **React Router DOM** - Enrutamiento para SPA

---

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (v18 o superior)
- **npm** (v9 o superior)
- **PostgreSQL** (v14 o superior)
- **Git**

---

## ⚙️ Instalación

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd colegio_mosconi
```

### 2. Instalar dependencias del Backend

```bash
cd back
npm install
```

### 3. Instalar dependencias del Frontend

```bash
cd ../front
npm install
```

---

## 🔧 Configuración

### Configurar Base de Datos

1. Crear la base de datos en PostgreSQL:

```sql
CREATE DATABASE colegio_mosconi;
```

2. Configurar variables de entorno del backend:

Crea un archivo `.env` en la carpeta `back/` con el siguiente contenido:

```env
# Configuración de la base de datos PostgreSQL
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=tu_contraseña
DATABASE_NAME=colegio_mosconi

# Entorno
NODE_ENV=dev

# Puerto del servidor
PORT=3000
```

**⚠️ Importante:** Reemplaza `tu_contraseña` con tu contraseña de PostgreSQL.

---

## 🎮 Comandos Disponibles

### Backend (NestJS)

Desde la carpeta `back/`:

#### Desarrollo

```bash
# Iniciar servidor en modo desarrollo (con hot-reload)
npm run start:dev

# Iniciar servidor en modo debug
npm run start:debug

# Compilar el proyecto
npm run build

# Iniciar servidor en producción
npm run start:prod
```

#### Migraciones de Base de Datos

```bash
# Crear una nueva migración (basada en cambios de entidades)
npm run migration:create

# Ejecutar migraciones pendientes (aplicar cambios a la DB)
npm run migration:up

# Revertir la última migración
npm run migration:down

# Ver migraciones pendientes
npm run migration:pending

# Recrear toda la base de datos desde cero (⚠️ elimina datos)
npm run migration:fresh
```

#### Linting y Formato

```bash
# Ejecutar linter
npm run lint

# Formatear código
npm run format
```

### Frontend (React + Vite)

Desde la carpeta `front/`:

```bash
# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview

# Ejecutar linter
npm run lint
```

---

## 📁 Estructura del Proyecto

```
colegio_mosconi/
├── back/                           # Backend (NestJS)
│   ├── src/
│   │   ├── main.ts                # Punto de entrada de la aplicación
│   │   ├── app.module.ts          # Módulo principal
│   │   ├── app.controller.ts      # Controlador principal
│   │   ├── app.service.ts         # Servicio principal
│   │   └── infrastructure/
│   │       ├── database.configs.ts # Configuración de MikroORM
│   │       └── database/
│   │           ├── entities/      # Entidades de base de datos
│   │           │   ├── BaseEntity.ts
│   │           │   └── Student.ts
│   │           └── migrations/    # Archivos de migración
│   ├── dist/                      # Código compilado
│   ├── .env                       # Variables de entorno (no subir a git)
│   ├── .env.example               # Ejemplo de variables de entorno
│   ├── package.json
│   ├── tsconfig.json
│   └── nest-cli.json
│
└── front/                         # Frontend (React + Vite)
    ├── src/
    │   ├── main.tsx              # Punto de entrada de React
    │   ├── App.tsx               # Componente principal
    │   ├── App.css
    │   ├── index.css
    │   └── assets/               # Recursos estáticos
    ├── public/                   # Archivos públicos
    ├── dist/                     # Build de producción
    ├── package.json
    ├── vite.config.ts
    ├── tsconfig.json
    └── index.html
```

---

## 🗄️ Base de Datos

### Entidades Actuales

#### BaseEntity
Entidad base que todas las demás entidades heredan:
- `id` - UUID (clave primaria)
- `createdAt` - Fecha de creación
- `updatedAt` - Fecha de última actualización
- `deletedAt` - Fecha de eliminación suave (soft delete)

#### Student (Estudiante)
- `firstName` - Nombre
- `lastName` - Apellido
- `email` - Correo electrónico (único)
- `enrollmentDate` - Fecha de inscripción

### Flujo de Trabajo con Migraciones

1. **Modificar o crear entidades** en `back/src/infrastructure/database/entities/`

2. **Compilar el proyecto:**
   ```bash
   npm run build
   ```

3. **Crear migración:**
   ```bash
   npm run migration:create
   ```

4. **Aplicar migración:**
   ```bash
   npm run migration:up
   ```

---

## 🌐 API Endpoints

### Base URL
```
http://localhost:3000
```

### Endpoints Disponibles

#### Health Check
```http
GET /health
```
Verifica el estado del servidor.

**Respuesta:**
```json
{
  "status": "ok",
  "timestamp": "2026-01-13T15:34:18.000Z"
}
```

#### Inicio
```http
GET /
```
Mensaje de bienvenida del API.

**Respuesta:**
```
Bienvenido al API del Colegio Mosconi
```

---

## 🚀 Inicio Rápido

### Primera vez

1. **Instalar dependencias:**
   ```bash
   cd back && npm install
   cd ../front && npm install
   ```

2. **Configurar base de datos:**
   - Crear base de datos en PostgreSQL
   - Crear archivo `.env` en `back/` con las credenciales

3. **Ejecutar migraciones:**
   ```bash
   cd back
   npm run build
   npm run migration:create
   npm run migration:up
   ```

4. **Iniciar ambos servidores:**

   Terminal 1 (Backend):
   ```bash
   cd back
   npm run start:dev
   ```

   Terminal 2 (Frontend):
   ```bash
   cd front
   npm run dev
   ```

5. **Acceder a la aplicación:**
   - Backend: http://localhost:3000
   - Frontend: http://localhost:5173

---

## 🔒 Seguridad

- **No subir el archivo `.env`** al repositorio (ya está en `.gitignore`)
- Cambiar las credenciales por defecto en producción
- Usar variables de entorno para información sensible
- Implementar autenticación y autorización según necesidades

---

## 📝 Notas Adicionales

### CORS
El backend está configurado para aceptar peticiones desde `http://localhost:5173` (puerto por defecto de Vite). Si cambias el puerto del frontend, actualiza la configuración en `back/src/main.ts`.

### TypeScript
Ambos proyectos usan TypeScript con configuraciones estrictas para garantizar la calidad del código.

### Hot Reload
- El backend se recarga automáticamente al detectar cambios con `npm run start:dev`
- El frontend se actualiza instantáneamente con HMR (Hot Module Replacement) de Vite

---

## 🤝 Contribuir

1. Crear una rama para tu feature: `git checkout -b feature/nueva-funcionalidad`
2. Hacer commit de los cambios: `git commit -m 'Agregar nueva funcionalidad'`
3. Push a la rama: `git push origin feature/nueva-funcionalidad`
4. Abrir un Pull Request

---

## 📄 Licencia

ISC

---

## 👥 Autor

Proyecto desarrollado para el Colegio Mosconi

---

## 📞 Soporte

Para preguntas o problemas, crear un issue en el repositorio.
