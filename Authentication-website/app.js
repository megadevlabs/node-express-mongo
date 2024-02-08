// Salting and Hashing passwords

// Creating Express Server
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('./models/user.model');

// Declare PORT NUMBER FROM .ENV
const PORT = process.env.PORT || 5000;
const dbURL = process.env.MONGO_URL;

// Mongo Database Connection Create
mongoose
  .connect(dbURL)
  .then(() => {
    console.log('mongodb atlas is connected');
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });

// Use App
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Default Home Route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/./views/index.html');
});

// Create New User
app.post('/register', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    // const newUser = new User(req.body);

    bcrypt.hash(password, saltRounds, async function (err, hash) {
      // Store hash in your password DB.
      const newUser = new User({ email: email, password: hash });
      await newUser.save();
      res.status(201).json(newUser);
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// User Login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        // result == true
        if (result === true) {
          res.status(200).json({ status: 'valid user' });
        }
      });
    } else {
      res.status(404).json({ status: 'User Not found!' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Default 404 Error Route Handing
app.use((req, res, next) => {
  res.status(404).sendFile(__dirname + '/./views/404.html');
});
// Server Error Handling
app.use((err, req, res, next) => {
  res.status(500).json({
    message: 'Something Broke!',
  });
});

// Listen APP
app.listen(PORT, (req, res) => {
  console.log(`Express Server is Running At http://localhost:${PORT}`);
});
