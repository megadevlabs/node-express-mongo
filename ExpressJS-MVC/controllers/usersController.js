const path = require('path');
const users = require('../models/users.model');

const getUsers = (req, res) => {
  res.sendFile(path.join(__dirname + '/../views/users/index.html'));
};

const saveUser = (req, res) => {
  const name = req.body.name;
  const country = req.body.country;
  const mobile = req.body.mobile;
  const user = { name, country, mobile };
  users.push(user);
  res.status(201).json({
    success: true,
    users,
  });
};

module.exports = { getUsers, saveUser };
