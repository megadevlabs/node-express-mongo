const express = require('express');
const app = express();
const PORT = 3001;

// CORS
const cors = require('cors');

const userRouter = require('./routes/users.route');
const productsRouter = require('./routes/products.route');

app.use(express.urlencoded({ extended: true })); // Built-in Body Parser
app.use(cors()); // CORS Use
app.use(userRouter);
app.use('/api/users', userRouter); // API Call
app.use(productsRouter);

app.use((req, res) => {
  res.status(404).json({
    message: 'Resource Not Found!',
  });
});

app.listen(PORT, () => {
  console.log(`Express Server is Running At http://localhost:${PORT}`);
});
