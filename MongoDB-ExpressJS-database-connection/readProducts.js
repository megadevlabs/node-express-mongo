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

// CRUD -> CREATE, READ, UPDATE, DELETE

// GET: /products -> Return all the products
// GET: /products/:id -> Return a specific product
// POST: /products -> Create a products
// PUT: /products/:id -> Update a product based on id
// DELETE: /products/:id -> Delete a product based on id

// Read Data -> GET All of the Products
app.get('/products', async (req, res) => {
  try {
    // const getProducts = await Product.find().limit(2);
    const getProducts = await Product.find();
    if (getProducts) {
      res.status(200).send({
        success: true,
        message: 'Return All Products',
        data: getProducts,
      });
    } else {
      res.status(404).send({
        success: false,
        message: 'Products not found!',
      });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Read Data -> GET Specific Products
app.get('/products/:id', async (req, res) => {
  try {
    const pId = req.params.id;
    // Select Method 1
    const getProducts = await Product.find({ _id: pId });

    // Select Method 2
    // const getProducts = await Product.find({ _id: pId }).select({
    //   title: 1, // Meaning of 1, it will be show
    //   price: 1,
    //   _id: 0, // Meaning of 0, it will be hide
    // });

    // Select Method 3
    // const getProducts = await Product.find({ _id: pId }, {title: 1, _id: 0});

    if (getProducts) {
      res.status(200).send({
        success: true,
        message: 'Return Single Product',
        data: getProducts,
      });
    } else {
      res.status(404).send({
        success: false,
        message: 'Product not found!',
      });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Post Routes for Create New Product
app.post('/products', async (req, res) => {
  try {
    // GetData From Request Body Or Form
    const { title, price, description } = req.body;

    // Store Data into Model
    const newProduct = new Product({
      title: title,
      price: price,
      description: description,
    });

    // Save (Single/ One) Data Into Database
    const productData = await newProduct.save();

    res.status(201).send(productData);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
