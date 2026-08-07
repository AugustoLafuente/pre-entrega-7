import { ServicesService } from '../services/services.service.js';
import { BookingsService } from '../services/bookings.service.js';

const servicesService = new ServicesService();
const bookingsService = new BookingsService();

export const getServicesView = async (req, res) => {
  try {
    const services = await servicesService.getServices();
    res.render('services', { title: 'Listado de Servicios', services });
  } catch (error) {
    res.status(500).render('error', { error: 'Error al cargar los servicios' });
  }
};

export const getBookingsView = async (req, res) => {
  try {
    const bookings = await bookingsService.getAllBookings();
    res.render('bookings', { title: 'Disponibilidad de Reservas', bookings });
  } catch (error) {
    res.status(500).render('error', { error: 'Error al cargar las reservas' });
  }
};
