const path = require('path');
const products = require('../models/products.model');

const getProducts = (req, res) => {
  res.sendFile(path.join(__dirname + '/../views/products/index.html'));
};

const saveProduct = (req, res) => {
  const name = req.body.name;
  const qty = Number(req.body.qty);
  const price = Number(req.body.price);
  const product = { name, qty, price };
  products.push(product);
  res.status(201).json({
    success: true,
    products,
  });
};

module.exports = { getProducts, saveProduct };
