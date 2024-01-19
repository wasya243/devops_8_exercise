const express = require('express');
const { uuid } = require('uuidv4');
const cors = require('cors');
const bodyParser = require('body-parser');
const { STATUS_CODES } = require('http');

const db = require('./db');
const api = require('./api');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

// serve react build
app.use(express.static('build'));
// mostly for local dev, since there is no reason to do this in prod, cause of same origin
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`Request id: ${uuid()}, method: ${req.method}, url: ${req.url}`);

  next();
});

app.get('/health', (req, res) => {
  res.send({
    status: 'ok'
  })
});

app.use(api);

app.get('*', function(req, res){
  res.status(404).send('not found');
});

db.connect()
  .then(() => app.listen(PORT, () => console.log(`Server is listening on ${PORT}`)));