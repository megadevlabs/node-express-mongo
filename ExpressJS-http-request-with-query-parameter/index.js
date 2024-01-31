const express = require('express');
const app = express();
const PORT = 3001;

// http Request with Query Parameters
// app.get('/', (req, res) => {
//   // Url Parameters to Get Value Method 1
//   // const id = req.query.id;
//   // const name = req.query.name;
//   // Url Parameters to Get Value (Using Destructuring) Method 2
//   const { id, name } = req.query;
//   res.send(`<h1>Student Name is ${name} and Id is : ${id}</h1>`);
//   // res.send('I am Home Route');
// });

// http Request with Router Parameters
// app.get('/userId/:id/userAge/:age', (req, res) => {
//   const id = req.params.id;
//   const age = req.params.age;
//   res.send(`<h1>Student ID is ${id} and Age is : ${age}</h1>`);
// });

// http Request with Headers Parameters
app.get('/', (req, res) => {
  const id = req.header('id');
  const name = req.header('name');
  res.send(`<h1>Student Name is ${name} and ID is : ${id}</h1>`);
});

app.listen(PORT, () => {
  console.log(`Express Server is Running at http://localhost${PORT}`);
});
