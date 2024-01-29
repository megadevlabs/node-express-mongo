const http = require('http');
const port = 3030;
const hostname = '127.0.0.1';

// Server Create

// Method 1
// http
//   .createServer((req, res) => {
//     res.end("Hello I'm your first server");
//   })
//   .listen('3030');

// Method 2
const myServer = http.createServer((req, res) => {
  // res.end("Hello I'm your first server");
  res.end("<h1>Hello I'm your first node server</h1>");
});

myServer.listen(port, hostname, (req, res) => {
  // console.log('Server is running successfully at localhost:3030');
  console.log(`Server is running successfully at http://${hostname}:${port}`);
});
