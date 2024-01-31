const express = require('express');
const app = express();
const userRouter = require('./routes/users.route'); // Require User Routes

app.use('/api/user', userRouter); // Use userRouter

// Home Default Route
app.get('/', (req, res) => {
  // res.send('<h1>I am get Method from at Home Route</h1>');
  // res.end();
  // Html File and Status Code Send to Response
  res.statusCode = 200;
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/register', (req, res) => {
  // Html File and Status Code Send to Response
  res.statusCode = 200;
  res.sendFile(__dirname + '/views/register.html');
});

// For Wrong Request
app.use((req, res) => {
  res.send('<h1>404!!! Is Not a Valid URL</h1>');
  res.end();
});

module.exports = app;
