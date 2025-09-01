import express from 'express';
import {
  signup,
  login,
  protect,
  getMe,
  restrictTo,
  updateMe,
  deleteMe,
} from '../controllers/authController.js';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
const routeUser = express.Router();
routeUser.post('/signup', signup).post('/login', login);
routeUser
  .get('/me', protect, getMe)
  .patch('/me', protect, updateMe)
  .delete('/me', protect, deleteMe);
routeUser.get('/users/', protect, restrictTo, getAllUsers);
routeUser
  .route('/users/:id')
  .get(protect, restrictTo, getUserById)
  .patch(protect, restrictTo, updateUser)
  .delete(protect, restrictTo, deleteUser);

export default routeUser;
