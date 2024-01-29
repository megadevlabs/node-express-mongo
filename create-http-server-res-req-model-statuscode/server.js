const http = require('http');
const port = 3030;
const hostname = '127.0.0.1';

// Server Create
const myServer = http.createServer((req, res) => {
  // res.writeHead(202, { 'Content-Type': 'text/plain' });
  res.writeHead(202, { 'Content-Type': 'text/html' });
  res.write("<h1>Hello I'm your first node server</h1>");
  res.end();
});

myServer.listen(port, hostname, (req, res) => {
  console.log(`Server is running successfully at http://${hostname}:${port}`);
});
