import User from '../models/userModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import Jwt from 'jsonwebtoken';
const createTokenSendData = (user, statusCode, res) => {
  const token = Jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
  res.status(statusCode).json({
    status: 'success',
    data: {
      user,
      token,
    },
  });
};
export const signup = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm, role } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    passwordConfirm,
    role,
  });
  createTokenSendData(user, 201, res);
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  createTokenSendData(user, 200, res);
});
export const getMe = (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
};
export const updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }
  const user = req.user;
  const updates = Object.keys(req.body);
  updates.forEach((update) => (user[update] = req.body[update]));
  await user.save();
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});
export const deleteMe = catchAsync(async (req, res, next) => {
  const user = req.user;
  await user.deleteOne();
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
export const protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }
  const decoded = Jwt.verify(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }
  req.user = currentUser;
  next();
});
export const restrictTo = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return next(
      new AppError('You do not have permission to perform this action', 403)
    );
  }
  next();
};
