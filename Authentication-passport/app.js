require('dotenv').config();
require('./config/passport');
const express = require('express');
const cors = require('cors');
const ejs = require('ejs');
const app = express();

// MongoDB session store for Connect and Express
const MongoStore = require('connect-mongo');

const bcrypt = require('bcrypt');
const saltRounds = 10;

// Import Session packages
const passport = require('passport');
const session = require('express-session');

require('./config/database');
const User = require('./models/user.model');

app.set('view engine', 'ejs');
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session Initialize
app.set('trust proxy', 1); // trust first proxy
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      collectionName: 'sessions',
    }),
    // cookie: { secure: true },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Base URL -> Home Route
app.get('/', (req, res) => {
  res.render('index');
});

// register : GET
app.get('/register', (req, res) => {
  res.render('register');
});

// register : POST
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (user) return res.status(400).send('User already exist!');

    bcrypt.hash(password, saltRounds, async (err, hash) => {
      // Store hash in your password DB.
      const newUser = new User({
        username: username,
        password: hash,
      });
      await newUser.save();
      res.redirect('/login');
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

const checkLogged = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/profile');
  }
  next();
};

// login : GET
app.get('/login', checkLogged, (req, res) => {
  res.render('login');
});

// login : POST
app.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/profile',
  })
);

const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

// profile protected route
app.get('/profile', checkAuthenticated, (req, res) => {
  res.render('profile');
});

// Logout route
app.get('/logout', (req, res) => {
  try {
    req.logout(err => {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// 404 Error Route
app.use((req, res, next) => {
  res.render('404');
});

// Server Error Handling Route
app.use((err, req, res, next) => {
  res.status(500).send({ message: 'Something Brake!' });
});

module.exports = app;
