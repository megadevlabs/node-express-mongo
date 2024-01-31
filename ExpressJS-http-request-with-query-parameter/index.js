const express = require('express');
const app = express();
const PORT = 3001;

app.get('/', (req, res) => {
  // Url Parameters to Get Value Method 1
  // const id = req.query.id;
  // const name = req.query.name;
  // Url Parameters to Get Value (Using Destructuring) Method 2
  const { id, name } = req.query;
  res.send(`<h1>Student Name is ${name} and Id is : ${id}</h1>`);
  // res.send('I am Home Route');
});

app.listen(PORT, () => {
  console.log(`Express Server is Rinning at http://localhost${PORT}`);
});
