import { BookingsRepository } from '../repositories/bookings.repository.js';
import { ServicesService } from './services.service.js';
import { NotFoundError, ValidationError } from '../utils/errors.js';

export class BookingsService {
  constructor() {
    this.repository = new BookingsRepository();
    this.servicesService = new ServicesService();
  }

  async getAllBookings() {
    return await this.repository.getAll();
  }

  async createBooking(bookingData) {
    const { clientName, clientEmail, date, time, status, services } = bookingData;

    if (!clientName || !clientEmail || !date || !time || !status) {
      throw new ValidationError('Los campos clientName, clientEmail, date, time y status son obligatorios.');
    }

    const cleanServices = [];
    if (services && Array.isArray(services)) {
      for (const s of services) {
        // En MongoDB el ID es un string, no usar parseInt
        const sid = typeof s === 'object' && s.service ? s.service : s;
        const qty = typeof s === 'object' && s.quantity ? s.quantity : 1;
        
        // Verifica existencia, si no existe arrojará error gracias a servicesService
        await this.servicesService.getServiceById(sid);
        
        cleanServices.push({ service: sid, quantity: qty });
      }
    }

    return await this.repository.create({
      clientName,
      clientEmail,
      date,
      time,
      status,
      services: cleanServices,
    });
  }

  async getBookingById(id) {
    const booking = await this.repository.getById(id);
    if (!booking) {
      throw new NotFoundError(`La reserva con ID ${id} no existe.`);
    }
    return booking;
  }

  async addServiceToBooking(bid, sid) {
    // 1. Obtener la reserva (lanza error si no existe)
    const booking = await this.getBookingById(bid);
    
    // 2. Verificar que el servicio a agregar exista (lanza error si no existe)
    await this.servicesService.getServiceById(sid);

    // 3. Regla de negocio: si el mismo servicio se agrega dos veces, se incrementa quantity
    const serviceIndex = booking.services.findIndex(s => s.service.toString() === sid.toString());

    if (serviceIndex !== -1) {
      booking.services[serviceIndex].quantity += 1;
    } else {
      booking.services.push({ service: sid, quantity: 1 });
    }

    // 4. Actualizar la reserva en el repository
    return await this.repository.update(bid, booking);
  }
}
