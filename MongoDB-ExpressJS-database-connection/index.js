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
    required: [true, 'Title is required'],
    minlength: [3, 'minimum length of the product title should be 3'],
    maxlength: [100, 'maximum length of the product title should be 100'],
    // uppercase: true,
    trim: true,
    enum: {
      values: ['iphone 18', 'samsung'],
      message: '{VALUE} is not supported',
    },
  },
  price: {
    type: Number,
    min: [200, 'minimum product price should be 200'],
    max: [2000, 'maximum product price should be 2000'],
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  // email: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
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

/* find data using logical operator */
// {$and: [{price: {$gt: price}}, {rating: {$gt: 4}}]}
// {$or: [{ price: { $gt: price } }, { rating: { $gt: 4 } }]}
// {$nor: [{ price: { $gt: price } }, { rating: { $gt: 4 } }]}

// Read Data -> GET All of the Products
app.get('/products', async (req, res) => {
  try {
    const price = req.query.price; // Get User Request Data
    let products;
    if (price) {
      getProducts = await Product.find({
        $or: [{ price: { $gt: price } }, { rating: { $gt: 3 } }],
      })
        .sort({ price: -1 })
        .select({ title: 1, price: 1, _id: 1 });
    } else {
      // getProducts = await Product.find().countDocuments();// Counting
      getProducts = await Product.find()
        .sort({ price: -1 })
        .select({ title: 1, price: 1, rating: 1, _id: 1 }); // Sorting, 1 = Ascending, -1 = Descending
    }

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
        message: 'Product not found with this id!',
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
    const { title, price, rating, description } = req.body;

    // Store Data into Model
    const newProduct = new Product({
      title: title,
      price: price,
      rating: rating,
      description: description,
    });

    // Save (Single/ One) Data Into Database
    const productData = await newProduct.save();

    if (productData) {
      res.status(201).send({
        success: true,
        message: 'New Product Added',
        data: productData,
      });
    } else {
      res.status(404).send({
        success: false,
        message: 'Product was not added!',
      });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Update Product
app.put('/products/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const rating = req.body.rating;

    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          title: title,
          description: description,
          price: price,
          rating: rating,
        },
      },
      { new: true }
    );
    if (updatedProduct) {
      res.status(200).send({
        success: true,
        message: 'Updated Product',
        data: updatedProduct,
      });
    } else {
      res.status(404).send({
        success: false,
        message: 'Product was not updated with this id!',
      });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Delete Products
app.delete('/products/:id', async (req, res) => {
  try {
    const getId = req.params.id;
    // const productDeleteStatus = await Product.deleteOne({ _id: getId });// Only for Delete
    const productDeleteStatus = await Product.findByIdAndDelete({ _id: getId }); // Find and Delete Both
    if (productDeleteStatus) {
      res.status(200).send({
        success: true,
        message: 'Deleted Single Product',
        data: productDeleteStatus,
      });
    } else {
      res.status(404).send({
        success: false,
        message: 'Product was not deleted with this id!',
      });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
