require('dotenv').config();
const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('DB is Connected');
  })
  .catch(error => {
    console.log(error.message);
  });
