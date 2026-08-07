import { BookingsDao } from '../dao/bookings.dao.js';

export class BookingsRepository {
  constructor() {
    this.dao = new BookingsDao();
  }

  async getAll() {
    return await this.dao.getAll();
  }

  async create(bookingData) {
    return await this.dao.create(bookingData);
  }

  async getById(id) {
    return await this.dao.getById(id);
  }

  async update(id, updatedBooking) {
    return await this.dao.update(id, updatedBooking);
  }
}
