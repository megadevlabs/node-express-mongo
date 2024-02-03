const express = require('express');
const morgan = require('morgan'); // Require morgan
const chalk = require('chalk'); // Import chalk
const app = express();

const PORT = 3000;

// Use MORGAN NPM Package AS a Middleware
app.use(morgan('dev'));

const error = chalk.bold.red;
const warning = chalk.hex('#FFA500'); // Orange color

console.log(error('Error!'));
console.log(warning('Warning!'));

app.get('/', (req, res) => {
  res.send('<h1>Morgan Home Page</h1>');
});

app.get('/products', (req, res) => {
  res.send('List all the products');
});
app.post('/products', (req, res) => {
  res.status(201).send('Create a product');
});

app.listen(PORT, () => {
  console.log(
    chalk.bgGreen.bold(`Server is running at http://localhost:${PORT}`)
  );
});
