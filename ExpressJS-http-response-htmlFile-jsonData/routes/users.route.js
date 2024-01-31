const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
  // Cookie
  // res.cookie('name', 'Md Salahuddin Khan');
  // res.cookie('age', 25);
  // Clear Cookies
  res.clearCookie('name');
  res.clearCookie('age');
  // Append Header Response
  res.append('id', 7000);
  // JSON and Status Code Send to Response
  res.status(200).json({
    message: 'Hi, I am Login Page',
    statusCode: 200,
  });
  // Response Redirect To Targeted Page
  // res.redirect('/');
});

// router.get('/login', (req, res) => {
//   res.send('<h1>I am get Method from at Login Route</h1>');
//   res.end();
// });

// router.get('/register', (req, res) => {
//   res.send('<h1>I am get Method from at Register Route</h1>');
//   res.end();
// });

module.exports = router;
