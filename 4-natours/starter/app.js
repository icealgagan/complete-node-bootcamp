const express = require('express');
const app = express();
const fs = require('fs');

//const jsonFile = fs.readFileSync('./test2.json', 'utf8');
app.get('/', async (req, res) => {
  try {
    const readable = await fs.createReadStream('./test.json');
    res.set('Content-Type', 'application/json');
    readable.pipe(res);
  } catch (err) {
    throw err;
  }
});

app.listen(3000, () => {
  console.log('App running');
});
