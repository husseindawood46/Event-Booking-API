import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
import app from './app.js';
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1); // Exit the process with failure
});
const port = process.env.PORT || 8000;
// dataBase connection
const db = mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => console.log('DB connection successful!'))
  .catch((err) => {
    console.log('DB connection failed!');
    console.log(err.name, err.message);
    process.exit(1);
  });
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1); // Exit the process with failure
});
