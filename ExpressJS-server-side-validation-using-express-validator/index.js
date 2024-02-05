const express = require('express');
const { body, validationResult } = require('express-validator'); // Express Validator Package Import
const userRouter = require('./routes/user.route');
const app = express();
const PORT = 4001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', userRouter);

app.get('/', (req, res) => {
  res.send('<h1>Server-side Validation using express-validator</h1>');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost${PORT}`);
});
