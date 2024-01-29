// Create http Node Server
const http = require('http');
const port = 3030;
const hostName = '127.0.0.1';

const fs = require('fs');

// const httpServer = http.createServer((req, res) => {
//   res.writeHead(202, { 'content-Type': 'text/html' });
//   res.write('<h1>Node Server Has Been Running!</h1>');
//   res.end();
// });

// httpServer.listen(port, hostName, (req, res) => {
//   console.log(`Node Server is Running on http://${hostName}:${port}`);
// });

const httpServer = http.createServer((req, res) => {
  const handleReadFile = (fileLocation, statusCode) => {
    fs.readFile(fileLocation, 'utf-8' ,(err, data) => {
    fs.readFile(fileLocation, (err, data) => {
      res.writeHead(statusCode, { 'Content-Type': 'text/html' });
      // res.write('<h1>Node Server Has Been Running Successfully!</h1>');
      res.write(data);
      res.end();
    });
  };

  if (req.url === '/') {
    handleReadFile('./views/index.html', 200);
  } else if (req.url === '/about') {
    handleReadFile('./views/about.html', 200);
  } else if (req.url === '/contact') {
    handleReadFile('./views/contact.html', 200);
  } else {
    handleReadFile('./views/error.html', 404);
  }
  // console.log(req.url);
});

httpServer.listen(port, hostName, (req, res) => {
  console.log(`Node Server is Running on http://${hostName}:${port}`);
});
