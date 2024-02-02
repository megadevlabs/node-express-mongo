const { v4: uuidv4 } = require('uuid');
const users = require('../models/users.model');

// Get Users
const getAllUsers = (req, res) => {
  res.status(200).json({ users });
};

// Create User
const createUser = (req, res) => {
  const id = uuidv4();
  const username = req.body.username;
  const email = req.body.email;
  const newUser = { id, username, email };
  users.push(newUser);

  res.status(201).json({ users });
};

// Update User
const updateUser = (req, res) => {
  const userid = req.params.id;
  const { username, email } = req.body;
  users
    .filter(user => user.id === userid)
    .map(selecteduser => {
      selecteduser.username = username;
      selecteduser.email = email;
    });
  res.status(200).json(users);
};

// Delete User
const deleteUser = (req, res) => {
  const uid = req.params.id;
  const deleteUser = users.filter(user => user.id !== uid);
  // let du = users.findIndex(user => user.id === uid);
  // users.splice(du, 1);
  res.status(200).json(deleteUser);
};

module.exports = { getAllUsers, createUser, updateUser, deleteUser };
