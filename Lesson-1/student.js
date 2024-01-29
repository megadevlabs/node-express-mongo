const getName = () => {
  return 'Md Salahuddin Khan';
};

const getMobile = () => {
  return '01707073341';
};

const getAge = '36';

// Exports Methods 1
// exports.getName = getName;
// exports.getMobile = getMobile;
// exports.getAge = getAge;

// Exports Methods 2
module.exports = {
  getName,
  getMobile,
  getAge,
};
