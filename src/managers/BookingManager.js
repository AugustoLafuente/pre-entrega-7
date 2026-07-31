import fs from 'fs/promises';
import path from 'path';

export class BookingManager {
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

  async createBooking(bookingData) {
    const { clientName, clientEmail, date, time, status, services } = bookingData;

    if (!clientName || !clientEmail || !date || !time || !status) {
      throw new Error('Los campos clientName, clientEmail, date, time y status son obligatorios.');
    }

    const bookings = await this._readJson();
    
    const nextId = bookings.length > 0 ? Math.max(...bookings.map((b) => b.id)) + 1 : 1;

    const newBooking = {
      id: nextId,
      clientName,
      clientEmail,
      date,
      time,
      status,
      services: services || [],
    };

    bookings.push(newBooking);
    await this._writeJson(bookings);
    return newBooking;
  }

  async getBookingById(id) {
    const bookings = await this._readJson();
    const booking = bookings.find((b) => b.id === id);
    if (!booking) throw new Error(`La reserva con ID ${id} no existe.`);
    return booking;
  }

  async addServiceToBooking(bid, sid) {
    const bookings = await this._readJson();
    const bookingIndex = bookings.findIndex((b) => b.id === bid);

    if (bookingIndex === -1) {
      throw new Error(`La reserva con ID ${bid} no existe.`);
    }

    const booking = bookings[bookingIndex];
    const serviceIndex = booking.services.findIndex(s => s.service === sid);

    if (serviceIndex !== -1) {
      booking.services[serviceIndex].quantity += 1;
    } else {
      booking.services.push({ service: sid, quantity: 1 });
    }

    await this._writeJson(bookings);
    return booking;
  }
}
