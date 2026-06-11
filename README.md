# Reservations Workspace

Monorepo para una aplicación de reservas de servicios (salón/estética) con frontend en Next.js y backend en NestJS.

## Visión general

Este proyecto está dividido en dos partes:

- Frontend: aplicación web con Next.js, React, Tailwind y componentes reutilizables.
- Backend: API REST con NestJS, TypeORM y PostgreSQL para gestión de usuarios, servicios, agendas y reservas.

## Stack principal

### Frontend

- Next.js 14
- React 18
- Tailwind CSS
- Storybook (para desarrollo de componentes)
- Jest para pruebas

### Backend

- NestJS
- TypeORM
- PostgreSQL
- JWT + bcrypt para autenticación
- Jest para pruebas

## Estructura del repositorio

- reservations-front/: interfaz de usuario y vistas del sistema.
- reservations-api/: API, módulos de negocio, entidades y configuración de base de datos.
- package.json: scripts para ejecutar el monorepo desde la raíz.

## Requisitos

- Node.js 18 o superior
- pnpm
- Docker Desktop (para levantar PostgreSQL localmente)

## Inicio rápido

1. Instala dependencias del monorepo:

   ```bash
   pnpm install -r
   ```

2. Levanta la base de datos PostgreSQL:

   ```bash
   cd reservations-api
   docker compose up -d
   ```

3. Configura las variables de entorno en reservations-api (por ejemplo, en un archivo .env):

   ```env
   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432
   POSTGRES_USER=reservations_user
   POSTGRES_PASSWORD=reservations_password
   POSTGRES_DB=reservations_db
   ```

4. Inicia el backend:

   ```bash
   pnpm --dir reservations-api start:dev
   ```

5. Inicia el frontend:

   ```bash
   pnpm --dir reservations-front dev
   ```

> Nota: por defecto, el backend escucha en el puerto 3000 y el frontend también usa 3000. Si hay conflicto de puertos, ejecuta el frontend con otro puerto, por ejemplo: pnpm --dir reservations-front dev -p 3001.

## Scripts útiles

Desde la raíz:

```bash
pnpm run dev:frontend
pnpm run dev:backend
pnpm run install:all
```

Desde reservations-api:

```bash
pnpm run build
pnpm run test
pnpm run test:e2e
pnpm run migration:generate <nombre>
pnpm run migration:run
pnpm run db:seed
```

Desde reservations-front:

```bash
pnpm run dev
pnpm run build
pnpm run test
pnpm run storybook
```

## Funcionalidades previstas

- Registro y autenticación de usuarios
- Gestión de servicios y profesionales
- Agenda y bloques de horarios
- Dashboard para visualización de reservas
- Flujo de reserva para clientes

## Desarrollo

Si vas a trabajar en el proyecto, te recomendamos:

- mantener la API y el frontend en ejecución por separado;
- usar Docker para la base de datos local;
- revisar los módulos de backend bajo reservations-api/src y la UI bajo reservations-front/components y app.

## Estado del proyecto

El repositorio está configurado como un monorepo con un frontend y una API backend separados, listo para evolucionar hacia un sistema completo de reservas.
