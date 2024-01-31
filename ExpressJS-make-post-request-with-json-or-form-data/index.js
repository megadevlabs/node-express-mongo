const express = require('express');
const app = express();
const PORT = 3001;
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/views/register.html');
});

// Make POST Request with JSON
// app.post('/register', (req, res) => {
//   const name = req.body.name;
//   const age = req.body.age;
//   res.send(`Welcome ${name}. You are ${age}`);
// });

app.post('/register', (req, res) => {
  const fullName = req.body.fullName;
  const age = req.body.age;
  res.send(`<h2>Hello, ${fullName}. Your Age is ${age}</h2>`);
});

app.listen(PORT, () => {
  console.log(`Express Server is Running at http://localhost${PORT}`);
});
