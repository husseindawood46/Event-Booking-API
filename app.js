import express from 'express';
import morgan from 'morgan';
import AppError from './utils/appError.js';
import globalErrorHandler from './controllers/errorController.js';
import dotenv from 'dotenv';
import routeUser from './routes/userRoute.js';
import routeEvent from './routes/eventRoute.js';
import routerBooking from './routes/bookingRoute.js';
dotenv.config({ path: './config.env' });
const app = express();
// global middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use('/api/v1', routeUser);
app.use('/api/v1/events', routeEvent);
app.use('/api/v1/bookings', routerBooking);
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);
export default app;
