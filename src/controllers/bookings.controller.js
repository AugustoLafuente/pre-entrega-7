import { BookingsService } from '../services/bookings.service.js';
import { NotFoundError, ValidationError } from '../utils/errors.js';

const bookingService = new BookingsService();

const handleError = (error, res) => {
  if (error instanceof NotFoundError) {
    return res.status(404).json({ status: 'error', message: error.message });
  }
  if (error instanceof ValidationError) {
    return res.status(400).json({ status: 'error', message: error.message });
  }
  return res.status(500).json({ status: 'error', message: error.message });
};

export const createBooking = async (req, res) => {
  try {
    const bookingData = req.body;
    const nuevaReserva = await bookingService.createBooking(bookingData);
    return res.status(201).json({ status: 'success', data: nuevaReserva });
  } catch (error) {
    return handleError(error, res);
  }
};

export const getBookingById = async (req, res) => {
  try {
    const bid = req.params.bid;
    const reserva = await bookingService.getBookingById(bid);
    return res.status(200).json({ status: 'success', data: reserva });
  } catch (error) {
    return handleError(error, res);
  }
};

export const addServiceToBooking = async (req, res) => {
  try {
    const bid = req.params.bid;
    const sid = req.params.sid;

    const reservaActualizada = await bookingService.addServiceToBooking(bid, sid);

    return res.status(200).json({ status: 'success', data: reservaActualizada });
  } catch (error) {
    return handleError(error, res);
  }
};
