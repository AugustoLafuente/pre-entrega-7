import { ServicesDao } from '../dao/services.dao.js';

export class ServicesRepository {
  constructor() {
    this.dao = new ServicesDao();
  }

  async getAll() {
    return await this.dao.getAll();
  }

  async getById(id) {
    return await this.dao.getById(id);
  }

  async create(serviceData) {
    return await this.dao.create(serviceData);
  }

  async update(id, updatedData) {
    return await this.dao.update(id, updatedData);
  }

  async delete(id) {
    return await this.dao.delete(id);
  }
}
