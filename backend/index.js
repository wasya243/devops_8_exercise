const express = require('express');
const { uuid } = require('uuidv4');
const cors = require('cors');

const { USERS } = require('./users');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

// serve react build
app.use(express.static('build'));
app.use(cors());

app.use((req, res, next) => {
  console.log(`Request id: ${uuid()}, method: ${req.method}, url: ${req.url}`);

  next();
});

app.get('/api/health', (req, res) => {
  res.send({
    status: 'ok'
  })
});

app.get('/api/users', async (req, res) => {
  try {
    res.send(USERS);
  } catch (err) {
    console.log(err);

    res.status(500).send('internal server error')
  }
});

app.get('*', function(req, res){
  res.status(404).send('not found');
});

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));