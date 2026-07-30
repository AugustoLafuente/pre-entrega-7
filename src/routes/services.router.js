import { Router } from 'express';
import { ServiceManager } from '../managers/ServiceManager.js';

const router = Router();
const manager = new ServiceManager();

// GET /api/services - Devuelve todos los servicios (Acepta filtros por query params)
router.get('/', async (req, res) => {
  try {
    let services = await manager.getServices();
    const { category, available } = req.query;

    // Filtro por categoría (?category=...)
    if (category) {
      services = services.filter(s => s.category.toLowerCase() === category.toLowerCase());
    }

    // Filtro por disponibilidad (?available=true / ?available=false)
    if (available !== undefined) {
      const isAvailable = available === 'true';
      services = services.filter(s => s.available === isAvailable);
    }

    return res.status(200).json({ status: 'success', data: services });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
});

// GET /api/services/:sid - Devuelve un servicio por id
router.get('/:sid', async (req, res) => {
  try {
    const sid = parseInt(req.params.sid);
    const service = await manager.getServiceById(sid);

    if (!service) {
      return res.status(404).json({ status: 'error', message: `Servicio con ID ${sid} no encontrado.` });
    }

    return res.status(200).json({ status: 'success', data: service });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
});

// POST /api/services - Crea un servicio con los datos del body
router.post('/', async (req, res) => {
  try {
    const serviceData = req.body;
    const nuevoServicio = await manager.addService(serviceData);

    // Criterio de aceptación: 400 si faltan campos (nuestro manager devuelve null si falta algo)
    if (!nuevoServicio) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Todos los campos son obligatorios: name, description, duration, price, category, available.' 
      });
    }

    return res.status(201).json({ status: 'success', data: nuevoServicio });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
});

// PUT /api/services/:sid - Actualiza el servicio
router.put('/:sid', async (req, res) => {
  try {
    const sid = parseInt(req.params.sid);
    const updatedData = req.body;

    const actualizado = await manager.updateService(sid, updatedData);

    if (!actualizado) {
      return res.status(404).json({ 
        status: 'error', 
        message: `No se pudo actualizar. El servicio con ID ${sid} no existe o intentaste modificar el id.` 
      });
    }

    return res.status(200).json({ status: 'success', data: actualizado });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
});

// DELETE /api/services/:sid - Elimina el servicio
router.delete('/:sid', async (req, res) => {
  try {
    const sid = parseInt(req.params.sid);
    const eliminado = await manager.deleteService(sid);

    if (!eliminado) {
      return res.status(404).json({ status: 'error', message: `El servicio con ID ${sid} no existe.` });
    }

    return res.status(200).json({ status: 'success', message: 'Servicio eliminado correctamente.', data: eliminado });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;