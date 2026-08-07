import { ServicesService } from '../services/services.service.js';
import { NotFoundError, ValidationError } from '../utils/errors.js';

const service = new ServicesService();

const handleError = (error, res) => {
  if (error instanceof NotFoundError) {
    return res.status(404).json({ status: 'error', message: error.message });
  }
  if (error instanceof ValidationError) {
    return res.status(400).json({ status: 'error', message: error.message });
  }
  return res.status(500).json({ status: 'error', message: error.message });
};

export const getServices = async (req, res) => {
  try {
    let services = await service.getServices();
    const { category, available } = req.query;

    if (category) {
      services = services.filter(s => s.category.toLowerCase() === category.toLowerCase());
    }

    if (available !== undefined) {
      const isAvailable = available === 'true';
      services = services.filter(s => s.available === isAvailable);
    }

    return res.status(200).json({ status: 'success', data: services });
  } catch (error) {
    return handleError(error, res);
  }
};

export const getServiceById = async (req, res) => {
  try {
    const sid = req.params.sid;
    const result = await service.getServiceById(sid);
    return res.status(200).json({ status: 'success', data: result });
  } catch (error) {
    return handleError(error, res);
  }
};

export const createService = async (req, res) => {
  try {
    const serviceData = req.body;
    const nuevoServicio = await service.createService(serviceData);

    // Emitir evento por Socket.io
    const io = req.app.get('socketio');
    if (io) {
      io.emit('newService', nuevoServicio);
    }

    return res.status(201).json({ status: 'success', data: nuevoServicio });
  } catch (error) {
    return handleError(error, res);
  }
};

export const updateService = async (req, res) => {
  try {
    const sid = req.params.sid;
    const updatedData = req.body;
    const actualizado = await service.updateService(sid, updatedData);
    return res.status(200).json({ status: 'success', data: actualizado });
  } catch (error) {
    return handleError(error, res);
  }
};

export const deleteService = async (req, res) => {
  try {
    const sid = req.params.sid;
    const eliminado = await service.deleteService(sid);
    return res.status(200).json({ status: 'success', message: 'Servicio eliminado correctamente.', data: eliminado });
  } catch (error) {
    return handleError(error, res);
  }
};
