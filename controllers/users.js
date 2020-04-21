const validator = require('validator');
const User = require('../models/user');

const findUser = (req, res) => {
  if (validator.isMongoId(req.params.userId)) {
    User.findById(req.params.userId)
      .then((user) => {
        if (user) res.status(200).send({ data: user });
        else {
          res.status(404).send({
            message: 'Нет пользователя с таким id',
          });
        }
      })
      .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
  } else {
    res.status(404).send({
      message: 'Нет пользователя с таким id',
    });
  }
};

const findAllUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  if (validator.isAlpha(name)) {
    res.status(400).send({ message: 'Некорректное имя' }); return;
  }
  if (validator.isAlpha(about)) {
    res.status(400).send({ message: 'Некорректное описание' }); return;
  }
  if (validator.isURL(avatar)) {
    res.status(400).send({ message: 'Некорректная ссылка на аватар' }); return;
  }
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

const updateUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id, {
    name: req.body.name, about: req.body.about, avatar: req.body.avatar,
  })
    .then((user) => (res.send({ data: user })))
    .catch((err) => { res.status(500).send({ message: `Произошла ошибка ${err}` }); });
};

const updateAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, {
    avatar: req.body.avatar,
  })
    .then((user) => (res.send({ data: user })))
    .catch((err) => { res.status(500).send({ message: `Произошла ошибка ${err}` }); });
};

module.exports = {
  findUser, findAllUsers, createUser, updateUser, updateAvatar,
};
