const express = require('express');
const { body, validationResult } = require('express-validator');
const { runValidation } = require('../validation/validate');
const { registerUser, loginUser } = require('../controllers/user.controller');
const { userRegistrationValidator } = require('../validation/auth,js');
const { userLoginValidator } = require('../validation/auth,js');
const userRouter = express.Router();

// User Registration
// name, email, password, dob
userRouter.post(
  '/register',
  userRegistrationValidator,
  runValidation,
  registerUser
);

// User Login
userRouter.post('/login', userLoginValidator, runValidation, loginUser);

module.exports = userRouter;
