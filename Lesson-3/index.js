// OS, path

// OS Module

// const { totalmem, freemem } = require('os');
// console.log(totalmem());
// console.log(freemem());

const os = require('os');
// console.log(os.userInfo());
// console.log(os.homedir());
// console.log(os.hostname());
// console.log(os.totalmem());
console.log(os.freemem());

// PATH Module
// console.log(__dirname);
// console.log(__filename);

const path = require('path');
// console.log(path);
// console.log(path.extname('index.html'));
// console.log(path.join(__dirname + '/views'));
// console.log(path.join(__dirname + '/../views'));
console.log(path.relative('/data/hello/test/aaa', '/data/hello1/impl/bbb'));
