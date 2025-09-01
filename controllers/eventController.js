import Event from '../models/eventModel.js';
import { cache } from '../middleware/cachingMiddleware.js';
import APIFeature from '../utils/apiFeatures.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

export const createEvent = catchAsync(async (req, res) => {
  const newEvent = await Event.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      event: newEvent,
    },
  });
});
export const getEvents = catchAsync(async (req, res) => {
  const features = new APIFeature(Event.find(), req.query)
    .filtering()
    .sorting()
    .limiting()
    .paginating();
  const events = await features.query;
  cache.flushAll();
  res.status(200).json({
    status: 'success',
    results: events.length,
    data: {
      events,
    },
  });
});
export const getEventById = catchAsync(async (req, res, next) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    return next(new AppError('Event not found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      event,
    },
  });
});
export const updateEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!event) {
    return next(new AppError('Event not found', 404));
  }
  cache.flushAll();
  res.status(200).json({
    status: 'success',
    data: {
      event,
    },
  });
});
export const deleteEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findByIdAndDelete(req.params.id);
  if (!event) {
    return next(new AppError('Event not found', 404));
  }
  cache.flushAll();
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
