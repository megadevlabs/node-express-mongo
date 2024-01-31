const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('I am a GET Request at HOME Routes');
  res.end();
});

app.post('/', (req, res) => {
  res.send('I am a POST Request at Home Routes');
  res.end();
});

app.put('/', (req, res) => {
  res.send('I am a PUT Request at Home Routes');
  res.end();
});

app.delete('/', (req, res) => {
  res.send('I am a DELETE Request at Home Routes');
  res.end();
});

module.exports = app;
