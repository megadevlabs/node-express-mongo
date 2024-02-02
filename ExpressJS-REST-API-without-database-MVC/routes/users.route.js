// const express = require('express');
// const router = express.Router();

const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/usersController');

const router = require('express').Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
