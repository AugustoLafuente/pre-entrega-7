// Inicializar conexión con el servidor Socket.io
const socket = io();

// Referencia al contenedor de servicios
const servicesList = document.getElementById('services-list');

// Escuchar el evento 'newService' emitido desde el backend
socket.on('newService', (service) => {
  console.log('Nuevo servicio recibido:', service);

  if (servicesList) {
    // Crear el HTML para el nuevo servicio
    const isAvailable = service.available ? 'Sí' : 'No';
    
    const cardHTML = `
      <div class="card new-item" id="service-${service._id}">
        <h3>${service.name} <span style="font-size: 0.8rem; color: #e74c3c;">(NUEVO)</span></h3>
        <p><strong>Descripción:</strong> ${service.description}</p>
        <p><strong>Categoría:</strong> ${service.category}</p>
        <p><strong>Duración:</strong> ${service.duration} min</p>
        <p><strong>Precio:</strong> $${service.price}</p>
        <p><strong>Disponible:</strong> ${isAvailable}</p>
      </div>
    `;

    // Insertarlo al inicio de la lista
    servicesList.insertAdjacentHTML('afterbegin', cardHTML);
  }
});
