import mongoose from 'mongoose';
const bookingSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Booking must belong to an event'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    seats: {
      type: Number,
      required: [true, 'Please specify number of seats'],
      min: [1, 'You must book at least 1 seat'],
    },
    bookedAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'canceled'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Prevent duplicate booking (User can't book same event twice)
bookingSchema.index({ event: 1, user: 1 }, { unique: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
