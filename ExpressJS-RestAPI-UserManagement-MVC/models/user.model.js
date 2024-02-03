const { mongoose } = require('mongoose');

const userSchema = mongoose.Schema({
  uid: {
    type: String,
    require: true,
  },
  fName: {
    type: String,
    require: true,
  },
  lName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  mobile: {
    type: Number,
    require: true,
  },
  dob: {
    type: Date,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  avatar: {
    type: String,
  },
});

module.exports = mongoose.model('User', userSchema);
