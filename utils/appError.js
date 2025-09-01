class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // Operational errors are expected errors that we can handle gracefully
    Error.captureStackTrace(this, this.constructor); // Capture the stack trace for debugging
  }
}
export default AppError;
