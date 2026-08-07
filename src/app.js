// Importaciones necesarias para la configuración del servidor y la gestión de servicios
import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import servicesRouter from './routes/services.router.js';
import bookingsRouter from './routes/bookings.router.js';
import viewsRouter from './routes/views.router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares obligatorios para procesar req.body en formato JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Motor de plantillas Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Vinculación del Router de Vistas
app.use('/views', viewsRouter);

// Vinculación del Router de la API
app.use('/api/services', servicesRouter);
app.use('/api/bookings', bookingsRouter);

// Ruta auxiliar opcional en la raíz para verificar que el servidor responda
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a la API del Sistema de Turnos y Reservas' });
});

export default app;

