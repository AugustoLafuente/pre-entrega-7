import { BookingModel } from '../models/booking.model.js';

export class BookingsDao {
  async getAll() {
    return await BookingModel.find().populate('services.service').lean();
  }

  async create(bookingData) {
    const newBooking = await BookingModel.create(bookingData);
    return newBooking.toObject();
  }

  async getById(id) {
    return await BookingModel.findById(id).lean();
  }

  async update(id, updatedBooking) {
    const updated = await BookingModel.findByIdAndUpdate(id, updatedBooking, { new: true }).lean();
    return updated;
  }
}
