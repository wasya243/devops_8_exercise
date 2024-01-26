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

const whitelist = ['http://devops-exercise-11.s3-website-eu-west-1.amazonaws.com/']

const corsOptions = {
  origin: (origin, cb) => {
    if(whitelist.indexOf(origin) > -1) {
      cb(null, true);
    } else {
      cb(new Error('CORS forbidden'));
    }
  }
}

// serve react build
app.use(express.static('build'));
// mostly for local dev, since there is no reason to do this in prod, cause of same origin
app.use(cors(corsOptions));
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