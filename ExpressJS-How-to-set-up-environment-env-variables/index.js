require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`<h1>Hello Home Route</h1>`);
});

app.listen(PORT, (req, res) => {
  console.log(`Express Server is Running at http://localhost:${PORT}`);
});
