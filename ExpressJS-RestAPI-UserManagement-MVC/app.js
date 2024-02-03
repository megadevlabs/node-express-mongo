const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

require('./config/db');

const userRouter = require('./routes/user.route');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/users', userRouter);

// Rest API Routes
// api/users/ : GET
// api/users/:id : GET
// api/users/ : POST
// api/users/:id : PATCH
// api/users/:id : DELETE

// Default Home Route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/./views/index.html');
});

// Router Error Handling
app.get((req, res, next) => {
  res.status(404).json({
    message: 'Invalid Router!',
  });
});

// Server Error Handling
app.get((err, req, res, next) => {
  res.status(500).json({
    message: 'Server Error, Something Broke!',
  });
});

module.exports = app;
