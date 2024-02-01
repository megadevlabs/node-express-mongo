const express = require('express');
const {
  getUsers,
  saveUser,
  showUsers,
} = require('../controllers/usersController');
const router = express.Router();

router.get('/users', getUsers);
router.get('/', showUsers);
router.post('/users', saveUser);

module.exports = router;
