const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
  res.send('<h1>I am get Method from at Login Route</h1>');
  res.end();
});

router.get('/register', (req, res) => {
  res.send('<h1>I am get Method from at Register Route</h1>');
  res.end();
});

module.exports = router;
