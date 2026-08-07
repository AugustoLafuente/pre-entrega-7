import { Router } from 'express';
import { getServicesView, getBookingsView } from '../controllers/views.controller.js';

const router = Router();

router.get('/services', getServicesView);
router.get('/bookings', getBookingsView);
router.get('/availability', getBookingsView); // Alias según la consigna

export default router;
