import express from 'express';
import {
  createEvent,
  getEventById,
  getEvents,
  updateEvent,
  deleteEvent,
} from '../controllers/eventController.js';
import { protect, restrictTo } from '../controllers/authController.js';
import { cacheMiddleware } from '../middleware/cachingMiddleware.js';
const routeEvent = express.Router();
routeEvent
  .post('/', protect, restrictTo, createEvent)
  .get('/', protect, restrictTo, cacheMiddleware,getEvents);
routeEvent
  .route('/:id')
  .get(protect, restrictTo, getEventById)
  .patch(protect, restrictTo, updateEvent)
  .delete(protect, restrictTo, deleteEvent);

export default routeEvent;
