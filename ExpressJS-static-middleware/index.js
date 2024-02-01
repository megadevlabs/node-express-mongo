const express = require('express');
const app = express();
const PORT = 3001;

// Static Middleware
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.listen(PORT, () => {
  console.log(`Express Server is Running at http://localhost:${PORT}`);
});
