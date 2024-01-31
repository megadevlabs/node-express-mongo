const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3001;

// Use of body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/circle', (req, res) => {
  res.sendFile(__dirname + '/views/circle.html');
});

app.post('/circle', (req, res) => {
  const radius = req.body.radius;
  const area = Math.PI * radius * radius;
  res.send(`<h1>Your Circle Area is : ${area}</h1>`);
});

app.get('/triangle', (req, res) => {
  res.sendFile(__dirname + '/views/triangle.html');
});

app.post('/triangle', (req, res) => {
  const height = req.body.height;
  const base = req.body.base;
  const area = 0.5 * base * height;
  res.send(`<h1>Your Triangle Area is : ${area}</h1>`);
});

app.listen(PORT, () => {
  console.log(`Express Server is Running at http://localhost:${PORT}`);
});
