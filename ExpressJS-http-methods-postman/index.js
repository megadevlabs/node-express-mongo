const app = require('./app');
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Express Server is Running at http://localhost:${PORT}`);
});
