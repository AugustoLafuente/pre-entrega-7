//Implementa logica CRUD interactuando de manera asincrona con el archivo services.json
//ID autoincremental 

import fs from 'fs/promises'; // Importa el módulo de sistema de archivos con soporte para Promesas (async/await)
import path from 'path'; // Importa el módulo path para resolver rutas de archivos de forma segura

export class ServiceManager {
  constructor() {
    // Define la ruta absoluta hacia el archivo JSON donde se guardarán los datos de los servicios
    this.path = path.resolve('src/data/services.json');
  }

  /**
   * Método privado auxiliar para leer y parsear el archivo JSON.
   * Si el archivo no existe, lo crea inicializándolo con un array vacío.
   */

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

  /**
   * Método privado auxiliar para escribir datos estructurados dentro del archivo JSON.
   */

  async _writeJson(data) {
    await fs.writeFile(this.path, JSON.stringify(data, null, 2), 'utf-8');
  }

  /**
   * Obtiene la lista completa de todos los servicios registrados.
   */

  async getServices() {
    return await this._readJson();
  }

  /**
   * Busca y retorna un servicio específico por su ID único.
   * Si no lo encuentra, arroja un error controlado.
   */

  async getServiceById(id) {
    const services = await this._readJson();
    const service = services.find((s) => s.id === id);
    if (!service) throw new Error(`El servicio con ID ${id} no existe.`);
    return service;
  }

  /**
   * Crea e inserta un nuevo servicio al catálogo con generación de ID autoincremental.
   */

  async addService(serviceData) {
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

    const services = await this._readJson();
    
    // Generación de ID incremental interno: 
    // Si hay servicios, busca el ID más alto con Math.max y le suma 1. Si está vacío, inicia en 1.
    const nextId = services.length > 0 ? Math.max(...services.map((s) => s.id)) + 1 : 1;

    // Construye el nuevo objeto estructurado juntando el ID generado con las propiedades validadas
    const newService = {
      id: nextId,
      name,
      description,
      duration,
      price,
      category,
      available,
    };

    services.push(newService);
    await this._writeJson(services);
    return newService;
  }

  /**
   * Actualiza parcialmente las propiedades de un servicio existente buscando por ID.
   * Bloquea e impide la modificación del ID original.
   */

  async updateService(id, updatedData) {
    const services = await this._readJson();
    const index = services.findIndex((s) => s.id === id);

    if (index === -1) throw new Error(`El servicio con ID ${id} no existe.`);

    if (updatedData.id !== undefined && updatedData.id !== id) {
      throw new Error('No está permitido modificar el ID de un servicio.');
    }

    const { id: _, ...allowedData } = updatedData;

    services[index] = { ...services[index], ...allowedData };
    await this._writeJson(services);
    return services[index];
  }

   /**
   * Elimina permanentemente un servicio del archivo JSON buscando por su ID.
   */

  async deleteService(id) {
    const services = await this._readJson();
    const index = services.findIndex((s) => s.id === id);

    if (index === -1) throw new Error(`El servicio con ID ${id} no existe.`);

    const deletedService = services.splice(index, 1)[0];
    await this._writeJson(services);
    return deletedService;
  }
};