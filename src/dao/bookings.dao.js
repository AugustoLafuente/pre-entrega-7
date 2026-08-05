import fs from 'fs/promises';
import path from 'path';

export class BookingsDao {
  constructor() {
    this.path = path.resolve('src/data/bookings.json');
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

  async create(bookingData) {
    const bookings = await this._readJson();
    const nextId = bookings.length > 0 ? Math.max(...bookings.map((b) => b.id)) + 1 : 1;
    const newBooking = { id: nextId, ...bookingData };
    bookings.push(newBooking);
    await this._writeJson(bookings);
    return newBooking;
  }

  async getById(id) {
    const bookings = await this._readJson();
    return bookings.find((b) => b.id === id) || null;
  }

  async update(id, updatedBooking) {
    const bookings = await this._readJson();
    const index = bookings.findIndex((b) => b.id === id);
    if (index === -1) return null;

    bookings[index] = { ...bookings[index], ...updatedBooking, id };
    await this._writeJson(bookings);
    return bookings[index];
  }
}
