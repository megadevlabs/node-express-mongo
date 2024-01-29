const fs = require('fs');
// FS Modules

// File Create and Write Text
// fs.writeFile('demo.txt', 'This is demo tex.', err => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('Success');
//   }
// });

// Add New Text into Existing file
// fs.appendFile(
//   'demo.txt',
//   'This is demo tex. My Name is Md Salahuddin Khan',
//   err => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('Success');
//     }
//   }
// );

// Read file
// fs.readFile('demo.txt', 'utf-8', (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('Success');
//     console.log(data);
//   }
// });

// Rename file
// fs.rename('demos.txt', 'demo.txt', err => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('Success');
//   }
// });

// Remove file
// fs.unlink('demo2.txt', err => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('Success');
//   }
// });

// Exist file
// fs.exists('demo.txt', res => {
//   if (res) {
//     console.log('File Exists!');
//   } else {
//     console.log('File Not Exists!');
//   }
// });

// Read file Sync
const f = fs.readFileSync('demo.txt', 'utf-8');
if (f) {
  console.log(f);
} else {
  console.log('File Not Read!');
}
