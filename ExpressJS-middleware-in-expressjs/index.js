const express = require('express');
const app = express();
const PORT = 3001;

const myMiddleware = (req, res, next) => {
  console.log("Hi, I'm Middleware");
  req.currentTime = new Date(Date.now());
  next();
};

app.use(myMiddleware);

app.use((err, req, res, next) => {
  res.status(500).send('Something Broke!');
});

app.get('/', (req, res) => {
  console.log('I am Home, ' + req.currentTime);
  res.send('<h1>Welcome Middleware Home Page</h1>');
});

app.get('/about', (req, res) => {
  console.log('I am About, ' + req.currentTime);
  res.send('<h1>Welcome Middleware About Page</h1>');
});

app.use((req, res, next) => {
  res.send('404 bad url request');
});

app.listen(PORT, () => {
  console.log(`Express Server is Running at http://localhost:${PORT}`);
});
