const { v4: uuidv4 } = require('uuid');
const User = require('../models/user.model');

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
// Get Single User
const getOneUser = async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.id });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
// Create New User
const createUser = async (req, res) => {
  try {
    const newUser = new User({
      uid: uuidv4(),
      fName: req.body.fName,
      lName: req.body.lName,
      email: req.body.email,
      mobile: Number(req.body.mobile),
      dob: req.body.dob,
      username: req.body.username,
      password: req.body.password,
      avatar: req.body.avatar,
    });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
// Update User
const updateUser = async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.id });
    user.fName = req.body.fName;
    user.lName = req.body.lName;
    user.email = req.body.email;
    user.mobile = Number(req.body.mobile);
    user.dob = req.body.dob;
    user.username = req.body.username;
    user.password = req.body.password;
    user.avatar = req.body.avatar;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
// Delete User
const deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ uid: req.params.id });
    res.status(200).json({ message: 'User has been deleted!' });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};
