const express = require('express');
const app = express();
const PORT = 3001;
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Make Request with JSON
app.post('/user', (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  res.send(`Welcome ${name}. You are ${age}`);
});

app.listen(PORT, () => {
  console.log(`Express Server is Running at http://localhost${PORT}`);
});
