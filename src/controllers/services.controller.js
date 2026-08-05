import { ServiceManager } from '../managers/ServiceManager.js';

const manager = new ServiceManager();

const handleError = (error, res) => {
  if (error.message.includes('no existe')) {
    return res.status(404).json({ status: 'error', message: error.message });
  }
  if (error.message.includes('obligatorio') || error.message.includes('no está permitido')) {
    return res.status(400).json({ status: 'error', message: error.message });
  }
  return res.status(500).json({ status: 'error', message: error.message });
};

export const getServices = async (req, res) => {
  try {
    let services = await manager.getServices();
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
    const sid = parseInt(req.params.sid);
    const service = await manager.getServiceById(sid);

    if (!service) {
      return res.status(404).json({ status: 'error', message: `Servicio con ID ${sid} no encontrado.` });
    }

    return res.status(200).json({ status: 'success', data: service });
  } catch (error) {
    return handleError(error, res);
  }
};

export const createService = async (req, res) => {
  try {
    const serviceData = req.body;
    const nuevoServicio = await manager.addService(serviceData);

    if (!nuevoServicio) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Todos los campos son obligatorios: name, description, duration, price, category, available.' 
      });
    }

    return res.status(201).json({ status: 'success', data: nuevoServicio });
  } catch (error) {
    return handleError(error, res);
  }
};

export const updateService = async (req, res) => {
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
    return handleError(error, res);
  }
};

export const deleteService = async (req, res) => {
  try {
    const sid = parseInt(req.params.sid);
    const eliminado = await manager.deleteService(sid);

    if (!eliminado) {
      return res.status(404).json({ status: 'error', message: `El servicio con ID ${sid} no existe.` });
    }

    return res.status(200).json({ status: 'success', message: 'Servicio eliminado correctamente.', data: eliminado });
  } catch (error) {
    return handleError(error, res);
  }
};
