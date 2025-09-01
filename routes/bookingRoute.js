import express from 'express';
import {
  createBooking,
  getMyBookings,
  getBookingByID,
  cancelBooking,
  updateMyBooking,
} from '../controllers/bookingController.js';
import { protect } from '../controllers/authController.js';
const routerBooking = express.Router();
routerBooking
  .post('/', protect, createBooking)
  .get('/', protect, getMyBookings);
routerBooking
  .get('/:id', protect, getBookingByID)
  .patch('/:id', protect, updateMyBooking)
  .delete('/:id', protect, cancelBooking);
export default routerBooking;
