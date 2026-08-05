import { ServicesRepository } from '../repositories/services.repository.js';

export class ServicesService {
  constructor() {
    this.repository = new ServicesRepository();
  }

  async getServices() {
    return await this.repository.getAll();
  }

  async getServiceById(id) {
    const service = await this.repository.getById(id);
    if (!service) {
      throw new Error(`El servicio con ID ${id} no existe.`);
    }
    return service;
  }

  async createService(serviceData) {
    const { name, description, duration, price, category, available } = serviceData;

    if (
      name === undefined ||
      description === undefined ||
      duration === undefined ||
      price === undefined ||
      category === undefined ||
      available === undefined
    ) {
      throw new Error('Todos los campos son obligatorios: name, description, duration, price, category, available.');
    }

    return await this.repository.create({ name, description, duration, price, category, available });
  }

  async updateService(id, updatedData) {
    // Primero, verificamos que el servicio existe
    const serviceExists = await this.repository.getById(id);
    if (!serviceExists) {
      throw new Error(`El servicio con ID ${id} no existe.`);
    }

    if (updatedData.id !== undefined && updatedData.id !== id) {
      throw new Error('No está permitido modificar el ID de un servicio.');
    }

    const { id: _, ...allowedData } = updatedData;
    
    return await this.repository.update(id, allowedData);
  }

  async deleteService(id) {
    const deletedService = await this.repository.delete(id);
    if (!deletedService) {
      throw new Error(`El servicio con ID ${id} no existe.`);
    }
    return deletedService;
  }
}
