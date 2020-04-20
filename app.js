const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersGet = require('./routes/users.js');
const cardsGet = require('./routes/cards.js');

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser());
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use((req, res, next) => {
  req.user = {
    _id: '5e9a19b0935bd15e549b0f7f',
  };
  next();
});
app.use(usersGet);
app.use(cardsGet);
app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
