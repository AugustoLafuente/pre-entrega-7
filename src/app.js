// Importaciones necesarias para la configuración del servidor y la gestión de servicios
import express from 'express';
import servicesRouter from './routes/services.router.js';
import bookingsRouter from './routes/bookings.router.js';

const app = express();

// Middlewares obligatorios para procesar req.body en formato JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Vinculación del Router al prefijo solicitado por la consigna
app.use('/api/services', servicesRouter);
app.use('/api/bookings', bookingsRouter);

// Ruta auxiliar opcional en la raíz para verificar que el servidor responda
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a la API del Sistema de Turnos y Reservas' });
});

export default app;

