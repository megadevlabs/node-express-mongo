const config = require('./config/config');
const app = require('./app');

const PORT = config.app.port;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
