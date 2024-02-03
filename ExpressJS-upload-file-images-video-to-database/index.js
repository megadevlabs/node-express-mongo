const express = require('express');
const { default: mongoose } = require('mongoose');
const multer = require('multer');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = 8006;

// Connecting to Database
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/fileUploads');
    console.log('DB is Connected!');
  } catch (error) {
    console.log('db is not connected!');
    console.log(error);
    process.exit(1);
  }
};

// Creating Schema and Model
const uploadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is Required!'],
  },
  image: {
    type: String,
    required: [true, 'Image is Required!'],
  },
});

// Creating Model
const Upload = mongoose.model('upload', uploadSchema);

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

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const newUpload = new Upload({
      name: req.body.name,
      image: req.file.filename,
    });
    await newUpload.save();
    res.status(201).send(newUpload);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(PORT, async () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  await connectDB();
});
