import { Router } from 'express';
import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService
} from '../controllers/services.controller.js';

const router = Router();

// GET /api/services - Devuelve todos los servicios (Acepta filtros por query params)
router.get('/', getServices);

// GET /api/services/:sid - Devuelve un servicio por id
router.get('/:sid', getServiceById);

// POST /api/services - Crea un servicio con los datos del body
router.post('/', createService);

// PUT /api/services/:sid - Actualiza el servicio
router.put('/:sid', updateService);

// DELETE /api/services/:sid - Elimina el servicio
router.delete('/:sid', deleteService);

export default router;