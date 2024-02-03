const express = require('express');
const {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.controller');
const router = express.Router();

// All user Routers
router.get('/', getAllUsers);
router.get('/:id', getOneUser);
router.post('/', createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
