import { Router } from 'express';
import {
  createBooking,
  getBookingById,
  addServiceToBooking
} from '../controllers/bookings.controller.js';

const router = Router();

// POST /api/bookings - Crea una reserva
router.post('/', createBooking);

// GET /api/bookings/:bid - Devuelve una reserva por id
router.get('/:bid', getBookingById);

// POST /api/bookings/:bid/services/:sid - Agrega un servicio a una reserva existente
router.post('/:bid/services/:sid', addServiceToBooking);

export default router;
