# API REST - Sistema de Turnos y Reservas

Esta es una API REST construida con Node.js, Express y Módulos de ECMAScript (ESM) para gestionar el catálogo de servicios de un sistema de turnos y las reservas. 

## Arquitectura del Proyecto

El proyecto está organizado en cinco capas principales (siguiendo el patrón MVC/Capas) para separar responsabilidades de manera profesional y preparar el sistema para una base de datos más robusta:
- **Routes (`src/routes`)**: Definen los endpoints de la aplicación y conectan las solicitudes entrantes con su controlador correspondiente.
- **Controllers (`src/controllers`)**: Se encargan de procesar las solicitudes HTTP (`req`), llamar a los servicios y devolver la respuesta con su respectivo status HTTP (`res`).
- **Services (`src/services`)**: Contienen toda la lógica de negocio, validaciones y reglas (como el incremento de cantidad si el servicio ya existe en la reserva). Desconocen por completo a Express (`req`/`res`).
- **Repositories (`src/repositories`)**: Capa intermedia que sirve de puente entre los servicios y la persistencia de datos (DAO). Facilita cambiar el origen de datos en el futuro.
- **DAO - Data Access Object (`src/dao`)**: Encargados directos de leer y escribir la información. En esta versión utilizan **MongoDB Atlas** a través de **Mongoose** como ODM.

## Instalación

1. Clona este repositorio e instala las dependencias:
   ```bash
   npm install
   ```
2. Crea tu archivo `.env` basándote en el `.env.example`:
   ```text
   PORT=8080
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/turnos_reservas
   ```
3. Asegúrate de tener una instancia de MongoDB ejecutándose.

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
    "services": [
      {
        "service": "6a7653bd37c071bfcc289006",
        "quantity": 2
      }
    ]
  }
  ```
  *(El array `services` es opcional, pero si se envía, el backend valida que los servicios existan y sanea el formato)*
- **Código de respuesta**: `201 Created` si tiene éxito / `400 Bad Request` si faltan campos principales / `404 Not Found` si se provee un ID de servicio inexistente.

### 2. Obtener una reserva por ID
- **Método**: `GET`
- **Ruta**: `/api/bookings/:bid`
- **Código de respuesta**: `200 OK` si existe / `404 Not Found` si no existe.

### 3. Agregar un servicio a una reserva
- **Método**: `POST`
- **Ruta**: `/api/bookings/:bid/services/:sid`
- **Código de respuesta**: `200 OK` si tiene éxito / `404 Not Found` si la reserva o el servicio no existen.