const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3002;

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/usersDB');
    console.log('Db is connected');
  } catch (error) {
    console.log('Db is not connected');
    console.log(error);
    process.exit(1);
  }
};

app.listen(PORT, async () => {
  console.log(`Express Server is running at http://localhost:${PORT}`);
  await connectDB();
});

app.get('/', (req, res) => {
  res.send('<h1>Welcome to MongoDB Home</h1>');
});
