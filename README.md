# Administrador de Servicios - Sistema de Turnos y Reservas

Este proyecto es un módulo backend desarrollado con Node.js y Módulos de ECMAScript (ESM) diseñado para gestionar el catálogo de servicios de un sistema de turnos y reservas. La aplicación implementa persistencia de datos en un archivo JSON local de forma asíncrona y realiza una validación estricta de variables de entorno al iniciar.

## Requisitos Previos

- **Node.js**: Versión 16 o superior.
- **npm**: Administrador de paquetes (incluido con la instalación de Node.js).

## Instalación

1. Clona este repositorio en tu máquina local.
2. Abre una terminal en la raíz del proyecto e instala las dependencias necesarias ejecutando:
```bash
npm install
```

## Variables de Entorno

El proyecto requiere la configuración de variables de entorno para validar el contexto de ejecución. 

1. Copia el archivo de plantilla `.env.example` y renómbralo como `.env`:
```bash
cp .env.example .env
```
2. Abre el archivo `.env` y define los siguientes valores obligatorios:
```text
PORT=8080
NODE_ENV=development
```

*Nota: El archivo `.env` contiene configuraciones locales y se encuentra protegido en el `.gitignore` para que nunca se suba al repositorio público.*

## Ejecución

Para iniciar la aplicación y ejecutar el banco de pruebas configurado, utiliza el comando oficial:
```bash
npm start
```

---

## Descripción del Recurso "Services"

Cada servicio dentro del sistema está representado por un objeto estructurado con las siguientes propiedades obligatorias:

* **`id`** (Number): Identificador único auto-incremental. Es generado internamente y no se recibe desde el exterior.
* **`name`** (String): Nombre identificativo del servicio (ej. "Corte de Cabello").
* **`description`** (String): Detalle o descripción del servicio ofrecido.
* **`duration`** (Number): Duración estimada del servicio expresada en minutos.
* **`price`** (Number): Costo o valor monetario del servicio.
* **`category`** (String): Categoría a la que pertenece (ej. "Barbería", "Estética").
* **`available`** (Boolean): Estado de disponibilidad actual para ser reservado.

---

## Métodos Disponibles en `ServiceManager`

La clase `ServiceManager` expone los siguientes métodos asíncronos para interactuar con el archivo de datos:

### 1. `getServices()`
Devuelve la totalidad de los servicios registrados en el archivo JSON.
* **Ejemplo de uso:**
```javascript
const lista = await manager.getServices();
console.log(lista);
```

### 2. `getServiceById(id)`
Busca un servicio específico según su identificador único. Si el servicio no existe, devuelve `null`.
* **Ejemplo de uso:**
```javascript
const servicio = await manager.getServiceById(1);
```

### 3. `addService(serviceData)`
Registra un nuevo servicio en el sistema. Genera automáticamente el `id` y valida que todos los campos requeridos estén presentes. Si faltan datos, rechaza la operación devolviendo `null`.
* **Ejemplo de uso:**
```javascript
const nuevo = await manager.addService({
  name: "Masaje Relajante",
  description: "Sesión completa de 60 minutos",
  duration: 60,
  price: 4500,
  category: "Estética",
  available: true
});
```

### 4. `updateService(id, updatedData)`
Actualiza de manera parcial o total las propiedades de un servicio existente por su `id`. No permite la modificación del `id` original. Si el servicio no existe o se intenta alterar el identificador, devuelve `null`.
* **Ejemplo de uso:**
```javascript
const actualizado = await manager.updateService(1, { price: 5000 });
```

### 5. `deleteService(id)`
Elimina de forma permanente un servicio del almacenamiento a partir de su `id`. Si el elemento no existe en el registro, devuelve `null`.
* **Ejemplo de uso:**
```javascript
const eliminado = await manager.deleteService(1);
```