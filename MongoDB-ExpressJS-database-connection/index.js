const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3002;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Mongoose Schema Create
const productsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// Mongoose Model Create
const Product = mongoose.model('Products', productsSchema);

// MongoDb Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/usersDB');
    console.log('Db is connected');
  } catch (error) {
    console.log('Db is not connected');
    console.log(error);
    process.exit(1);
  }
};

// Listen
app.listen(PORT, async () => {
  console.log(`Express Server is running at http://localhost:${PORT}`);
  await connectDB();
});

// Routings
app.get('/', (req, res) => {
  res.send('<h1>Welcome to MongoDB Home</h1>');
});

app.post('/products', async (req, res) => {
  try {
    // GetData From Request Body Or Form

    // const title = req.body.title;
    // const price = req.body.price;
    // const description = req.body.description;
    const { title, price, description } = req.body;

    // Store Data into Model
    const newProduct = new Product({
      title: title,
      price: price,
      description: description,
    });
    // Save (Single/ One) Data Into Database
    const productData = await newProduct.save();

    // Save (Multiple/ Many) Data Into Database
    // const productData = await Product.insertMany([
    //   {
    //     title: 'iphone 15',
    //     price: 1050,
    //     description: 'This is Nice phone',
    //   },
    //   {
    //     title: 'iphone 15 Pro',
    //     price: 1250,
    //     description: 'This is Nice phone',
    //   },
    //   {
    //     title: 'iphone 16 Pro',
    //     price: 1650,
    //     description: 'This is Nice phone',
    //   },
    // ]);

    res.status(201).send(productData);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
