const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local');
const User = require('../models/user.model');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: 'Incorrect Username' });
      }
      if (!bcrypt.compare(password, user.password)) {
        return done(null, false, { message: 'Incorrect Password' });
      }
      return done(null, user);
    } catch (error) {
      return done(err);
    }
  })
);

// Create session id
// Whenever we login it creates user is inside session
passport.serializeUser(async (id, done) => {
  done(null, id);
});

// find session info using session id
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    return done(error, false);
  }
});
