import Booking from '../models/bookingModel.js';
import Event from '../models/eventModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
export const createBooking = catchAsync(async (req, res, next) => {
  const { event, user, seats } = req.body;
  if (!event || !seats) {
    return next(new AppError('Please provide event and seats', 400));
  }
  const eventDoc = await Event.findById(event);
  if (!eventDoc) {
    return next(new AppError('Invalid event ID', 400));
  }
  if (seats > eventDoc.availableSeats) {
    return next(new AppError('Not enough available seats', 400));
  }
  const newBooking = await Booking.create({
    event: eventDoc._id,
    user: req.user._id,
    seats,
  });
  eventDoc.availableSeats -= seats;
  await eventDoc.save();
  res.status(201).json({
    status: 'success',
    data: {
      booking: newBooking,
    },
  });
});

export const getMyBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user._id });
  res.status(200).json({
    status: 'success',
    results: bookings.length,
    data: {
      bookings,
    },
  });
});

export const getBookingByID = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    return next(new AppError('No booking found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      booking,
    },
  });
});

export const cancelBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    return next(new AppError('No booking found with that ID', 404));
  }
  if (req.user.role !== 'admin' && booking.user.toString() !== req.user.id) {
    return next(
      new AppError('You do not have permission to cancel this booking', 403)
    );
  }
  await Event.findByIdAndUpdate(booking.event, {
    $inc: { availableSeats: booking.seats },
  });

  await booking.deleteOne();
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

export const updateMyBooking = catchAsync(async (req, res, next) => {
  const { seats } = req.body;
  if (!seats) {
    return next(new AppError('Please provide seats to update', 400));
  }
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    return next(new AppError('No booking found with that ID', 404));
  }
  if (req.user.role !== 'admin' && booking.user.toString() !== req.user.id) {
    return next(
      new AppError('You do not have permission to update this booking', 403)
    );
  }
  const event = await Event.findById(booking.event);
  if (!event) {
    return next(new AppError('No event found with that ID', 404));
  }
  if (seats > event.availableSeats + booking.seats) {
    return next(new AppError('Not enough available seats', 400));
  }
  event.availableSeats += booking.seats - seats;
  await event.save();
  booking.seats = seats;
  await booking.save();
  res.status(200).json({
    status: 'success',
    data: {
      booking,
      event,
    },
  });
});
