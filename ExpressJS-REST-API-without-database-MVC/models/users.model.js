const { v4: uuidv4 } = require('uuid');

const users = [
  {
    id: uuidv4(),
    username: 'salahuddin',
    email: 'cisrony@gmail.com',
  },
  {
    id: uuidv4(),
    username: 'rakibul islam',
    email: 'rakibulislam@gmail.com',
  },
];

module.exports = users;
