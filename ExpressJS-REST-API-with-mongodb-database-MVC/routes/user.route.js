const express = require('express');
// const { route } = require('../app');
const {
  getAllUsers,
  getOneUser,
  createUser,
  deleteUser,
  updateUser,
} = require('../controllers/user.controller');
const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getOneUser);
router.post('/', createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
