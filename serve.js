const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const sourcePath = process.argv[2];
if (!sourcePath) {
  console.error('Usage: node serve.js <source-path>');
  process.exit(0);
}

app.use(express.static(sourcePath));

let reqCountMap = {};

app.all('/error/504*', (req, res, next) => {
  const url = req.url;
  if (!reqCountMap[url]) {
    reqCountMap[url] = 1;
  } else {
    reqCountMap[url] += 1;
  }
  if (reqCountMap[url] >= 5) {
    let response = {
        'hello': 'there'
    }
    res.status(200).end(JSON.stringify(response));
  } else {
    res.status(504).end();
  }
});

app.all('/error/503*', (req, res, next) => {
  res.status(503).end();
});

app.listen(5000, () => {
  console.log('Server up and running on port 5000');
  console.log(`Serving files from: ${sourcePath}`);
});