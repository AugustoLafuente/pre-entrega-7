# API REST de Servicios - Sistema de Turnos y Reservas

Esta es una API REST construida con Node.js, Express y Módulos de ECMAScript (ESM) para gestionar el catálogo de servicios de un sistema de turnos. Los datos se persisten de forma asíncrona en un archivo JSON local a través de la clase `ServiceManager`.

## Instalación

1. Clona este repositorio e instala las dependencias:
   ```bash
   npm install
   ```
2. Crea tu archivo `.env` basándote en el `.env.example`:
   ```text
   PORT=8080
   NODE_ENV=development
   ```

## Ejecución

Inicia el servidor Express corriendo el comando:
```bash
npm start
```

## Endpoints de la API REST (`/api/services`)

### 1. Obtener todos los servicios
- **Método**: `GET`
- **Ruta**: `/api/services`
- **Query Params opcionales**: 
  - `?category=Estetica` (Filtra por categoría)
  - `?available=true` (Filtra por disponibilidad)
- **Código de respuesta**: `200 OK`

### 2. Obtener un servicio por ID
- **Método**: `GET`
- **Ruta**: `/api/services/:sid`
- **Código de respuesta**: `200 OK` si existe / `404 Not Found` si no existe.

### 3. Crear un nuevo servicio
- **Método**: `POST`
- **Ruta**: `/api/services`
- **Body (JSON)**:
  ```json
  {
    "name": "Limpieza Facial",
    "description": "Tratamiento de hidratación profunda",
    "duration": 45,
    "price": 3200,
    "category": "Estética",
    "available": true
  }
  ```
- **Código de respuesta**: `201 Created` si tiene éxito / `400 Bad Request` si faltan campos obligatorios.

### 4. Actualizar un servicio
- **Método**: `PUT`
- **Ruta**: `/api/services/:sid`
- **Body (JSON)**: Propiedades parciales a actualizar (No permite modificar el `id`).
- **Código de respuesta**: `200 OK` si se actualiza / `404 Not Found` si el ID no existe.

### 5. Eliminar un servicio
- **Método**: `DELETE`
- **Ruta**: `/api/services/:sid`
- **Código de respuesta**: `200 OK` si se elimina / `404 Not Found` si el ID no existe.

## Endpoints de la API REST (`/api/bookings`)

### 1. Crear una reserva
- **Método**: `POST`
- **Ruta**: `/api/bookings`
- **Body (JSON)**:
  ```json
  {
    "clientName": "Juan Perez",
    "clientEmail": "juan@example.com",
    "date": "2023-11-20",
    "time": "15:00",
    "status": "pending",
    "services": []
  }
  ```
- **Código de respuesta**: `201 Created` si tiene éxito / `400 Bad Request` si faltan campos.

### 2. Obtener una reserva por ID
- **Método**: `GET`
- **Ruta**: `/api/bookings/:bid`
- **Código de respuesta**: `200 OK` si existe / `404 Not Found` si no existe.

### 3. Agregar un servicio a una reserva
- **Método**: `POST`
- **Ruta**: `/api/bookings/:bid/services/:sid`
- **Código de respuesta**: `200 OK` si tiene éxito / `404 Not Found` si la reserva o el servicio no existen.