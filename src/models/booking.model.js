import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  clientEmail: { type: String, required: true },
  date: { type: String, required: true }, // Podría ser Date, se mantiene String por retrocompatibilidad con el JSON si era string
  time: { type: String, required: true },
  status: { type: String, required: true },
  services: [
    {
      service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
      quantity: { type: Number, required: true, default: 1 }
    }
  ]
}, {
  timestamps: true
});

export const BookingModel = mongoose.model('Booking', bookingSchema);
