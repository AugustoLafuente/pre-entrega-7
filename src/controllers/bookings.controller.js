import { BookingManager } from '../managers/BookingManager.js';
import { ServiceManager } from '../managers/ServiceManager.js';

const bookingManager = new BookingManager();
const serviceManager = new ServiceManager();

const handleError = (error, res) => {
  if (error.message.includes('no existe')) {
    return res.status(404).json({ status: 'error', message: error.message });
  }
  if (error.message.includes('obligatorio') || error.message.includes('no está permitido')) {
    return res.status(400).json({ status: 'error', message: error.message });
  }
  return res.status(500).json({ status: 'error', message: error.message });
};

export const createBooking = async (req, res) => {
  try {
    const bookingData = req.body;
    const nuevaReserva = await bookingManager.createBooking(bookingData);
    return res.status(201).json({ status: 'success', data: nuevaReserva });
  } catch (error) {
    return handleError(error, res);
  }
};

export const getBookingById = async (req, res) => {
  try {
    const bid = parseInt(req.params.bid);
    const reserva = await bookingManager.getBookingById(bid);
    return res.status(200).json({ status: 'success', data: reserva });
  } catch (error) {
    return handleError(error, res);
  }
};

export const addServiceToBooking = async (req, res) => {
  try {
    const bid = parseInt(req.params.bid);
    const sid = parseInt(req.params.sid);

    // Validar que el servicio exista
    await serviceManager.getServiceById(sid);

    // Agregar el servicio a la reserva
    const reservaActualizada = await bookingManager.addServiceToBooking(bid, sid);

    return res.status(200).json({ status: 'success', data: reservaActualizada });
  } catch (error) {
    return handleError(error, res);
  }
};
