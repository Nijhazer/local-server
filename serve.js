const express = require('express');
const app = express();

const sourcePath = process.argv[2];
if (!sourcePath) {
  console.error('Usage: node serve.js <source-path>');
  process.exit(0);
}

app.use(express.static(sourcePath));

app.listen(5000, () => {
  console.log('Server up and running on port 5000');
  console.log(`Serving files from: ${sourcePath}`);
});