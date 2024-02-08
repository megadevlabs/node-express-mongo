const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');

// create Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const encKey = process.env.ENC_KEY;
userSchema.plugin(encrypt, {
  secret: encKey,
  encryptedFields: ['password'],
});

module.exports = mongoose.model('user', userSchema);
