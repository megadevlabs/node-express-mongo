const express = require('express');
const app = express();
const PORT = 3001;

// Import Router
const userRouter = require('./routes/users.route');
const getProducts = require('./routes/products.route');

// Built in Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(userRouter);
app.use(getProducts);

app.use((req, res) => {
  res.status(404).json({
    message: 'Resource Not Found!',
  });
});

app.listen(PORT, () => {
  console.log(`Express Server is Running at http://localhost:${PORT}`);
});
