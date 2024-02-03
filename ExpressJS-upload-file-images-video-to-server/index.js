const express = require('express');
const multer = require('multer');
const app = express();

const PORT = 8005;

// File Upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileName = Date.now() + '_' + file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

app.get('/', (req, res) => {
  res.status(200).send('<h1>API Home</h1>');
});

app.get('/test', (req, res) => {
  res.status(200).send('Testing API');
});
app.get('/upload', (req, res) => {
  res.status(200).sendFile(__dirname + '/index.html');
});

app.post('/upload', upload.single('image'), (req, res) => {
  res.status(200).send('File is Uploaded!');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
