import mongoose from 'mongoose';
const schemaEvent = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'An event must have a title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'An event must have a description'],
    trim: true,
  },
  date: {
    type: Date,
    required: [true, 'An event must have a date'],
  },
  location: {
    type: String,
    required: [true, 'An event must have a location'],
    trim: true,
  },
  capacity: {
    type: Number,
    required: [true, 'An event must have a capacity'],
    min: [1, 'Capacity must be at least 1'],
  },
  availableSeats: {
    type: Number,
    min: [0, 'Available seats must be at least 0'],
    default: function () {
      return this.capacity;
    },
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'An event must be created by a user'],
  },
});
const Event = mongoose.model('Event', schemaEvent);
export default Event;
