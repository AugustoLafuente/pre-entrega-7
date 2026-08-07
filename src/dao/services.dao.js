import { ServiceModel } from '../models/service.model.js';

export class ServicesDao {
  async getAll() {
    return await ServiceModel.find().lean();
  }

  async getById(id) {
    return await ServiceModel.findById(id).lean();
  }

  async create(serviceData) {
    const newService = await ServiceModel.create(serviceData);
    return newService.toObject();
  }

  async update(id, updatedData) {
    const updatedService = await ServiceModel.findByIdAndUpdate(id, updatedData, { new: true }).lean();
    return updatedService;
  }

  async delete(id) {
    const deletedService = await ServiceModel.findByIdAndDelete(id).lean();
    return deletedService;
  }
}
