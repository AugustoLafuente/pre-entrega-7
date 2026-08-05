import fs from 'fs/promises';
import path from 'path';

export class ServicesDao {
  constructor() {
    this.path = path.resolve('src/data/services.json');
  }

  async _readJson() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        await this._writeJson([]);
        return [];
      }
      throw error;
    }
  }

  async _writeJson(data) {
    await fs.writeFile(this.path, JSON.stringify(data, null, 2), 'utf-8');
  }

  async getAll() {
    return await this._readJson();
  }

  async getById(id) {
    const services = await this._readJson();
    return services.find((s) => s.id === id) || null;
  }

  async create(serviceData) {
    const services = await this._readJson();
    const nextId = services.length > 0 ? Math.max(...services.map((s) => s.id)) + 1 : 1;
    const newService = { id: nextId, ...serviceData };
    services.push(newService);
    await this._writeJson(services);
    return newService;
  }

  async update(id, updatedData) {
    const services = await this._readJson();
    const index = services.findIndex((s) => s.id === id);
    if (index === -1) return null;
    
    services[index] = { ...services[index], ...updatedData, id }; // Asegurar que no se pise el id
    await this._writeJson(services);
    return services[index];
  }

  async delete(id) {
    const services = await this._readJson();
    const index = services.findIndex((s) => s.id === id);
    if (index === -1) return null;
    
    const deletedService = services.splice(index, 1)[0];
    await this._writeJson(services);
    return deletedService;
  }
}
