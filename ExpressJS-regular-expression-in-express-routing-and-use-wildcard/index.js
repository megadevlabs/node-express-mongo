const express = require('express');
const app = express();
const PORT = 3001;

// Regular Expression use for routes parameters
// app.get('/product/:id([A-Z0-9]+)', (req, res) => {
app.get('/product/:id([0-9]{3})', (req, res) => {
  res.send(`<h2>Product ID = ${req.params.id}</h2>`);
});

app.get('/product/:title([a-zA-Z0-9]+)', (req, res) => {
  res.send(`<h2>Product Title = ${req.params.title}</h2>`);
});

// Make a 404 Wild Card
app.use('*', (req, res) => {
  res.status(404).send({
    message: 'Not a valid route',
  });
});

app.listen(PORT, (req, res) => {
  console.log(`Express Server is Running at http://localhost:${PORT}`);
});
